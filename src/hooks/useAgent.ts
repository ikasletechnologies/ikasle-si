import { useCallback, useRef, useState } from 'react'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  status?: string
  error?: string
}

type AgentEvent = { type: 'status' | 'text' | 'error'; text: string }

// Sends only completed exchanges: a failed turn is dropped along with its question,
// so the model never sees two user messages in a row.
function toHistory(messages: ChatMessage[]) {
  const history: { role: ChatMessage['role']; content: string }[] = []
  for (const { role, content } of messages) {
    if (role === 'assistant' && !content.trim()) history.pop()
    else history.push({ role, content })
  }
  return history
}

export function useAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)

  const send = useCallback(async (text: string) => {
    const content = text.trim()
    if (!content || controllerRef.current) return

    const replyId = crypto.randomUUID()
    const updateReply = (update: (reply: ChatMessage) => ChatMessage) =>
      setMessages((current) => current.map((m) => (m.id === replyId ? update(m) : m)))
    const history = [...toHistory(messages), { role: 'user' as const, content }]

    setMessages([
      ...messages,
      { id: crypto.randomUUID(), role: 'user', content },
      { id: replyId, role: 'assistant', content: '', status: 'Thinking' },
    ])
    setBusy(true)
    const controller = new AbortController()
    controllerRef.current = controller

    const handleEvent = (event: AgentEvent) => {
      if (event.type === 'text') updateReply((m) => ({ ...m, content: m.content + event.text, status: undefined }))
      else if (event.type === 'status') updateReply((m) => ({ ...m, status: event.text }))
      else updateReply((m) => ({ ...m, error: event.text }))
    }

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'The agent is unavailable. Please try again.')
      }

      const decoder = new TextDecoder()
      const reader = response.body.getReader()
      let pending = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        pending += decoder.decode(value, { stream: true })
        const lines = pending.split('\n')
        pending = lines.pop() ?? ''
        for (const line of lines) if (line) handleEvent(JSON.parse(line))
      }
    } catch (error) {
      if (controller.signal.aborted) {
        updateReply((m) => (m.content ? m : { ...m, error: 'Stopped.' }))
      } else {
        updateReply((m) => ({ ...m, error: error instanceof Error ? error.message : 'Something went wrong.' }))
      }
    } finally {
      updateReply((m) => ({ ...m, status: undefined }))
      // A newer conversation may have started if this one was reset mid-request.
      if (controllerRef.current === controller) {
        controllerRef.current = null
        setBusy(false)
      }
    }
  }, [messages])

  const stop = useCallback(() => controllerRef.current?.abort(), [])

  const reset = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setBusy(false)
    setMessages([])
  }, [])

  return { messages, busy, send, stop, reset }
}
