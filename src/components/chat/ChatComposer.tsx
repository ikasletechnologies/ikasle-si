import { useState, type FormEvent } from 'react'
import { Paperclip, Send, Square } from 'lucide-react'

interface ChatComposerProps {
  busy: boolean
  onSend: (message: string) => void
  onStop: () => void
}

export function ChatComposer({ busy, onSend, onStop }: ChatComposerProps) {
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (busy || !message.trim()) return
    onSend(message)
    setMessage('')
  }

  return <form className="composer" onSubmit={submit}>
    <div className="composer-input">
      <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about our solutions..." aria-label="Ask about our solutions" />
      <button type="button" aria-label="Attach a file"><Paperclip /></button>
    </div>
    {busy
      ? <button key="stop" className="send-button" type="button" onClick={onStop} aria-label="Stop response"><Square /></button>
      : <button key="send" className="send-button" type="submit" aria-label="Send message"><Send /></button>}
  </form>
}
