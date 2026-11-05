import { useEffect, useRef } from 'react'
import Markdown from 'react-markdown'
import { UserRound } from 'lucide-react'
import type { ChatMessage } from '@/hooks/useAgent'

const NEAR_BOTTOM_PX = 80

export function Conversation({ messages }: { messages: ChatMessage[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const followStream = useRef(true)
  const messageCount = useRef(0)

  // Follow the answer as it streams unless the reader has scrolled up;
  // sending a new question always brings the reply back into view.
  useEffect(() => {
    if (messages.length !== messageCount.current) {
      messageCount.current = messages.length
      followStream.current = true
    }
    if (followStream.current && scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages])

  return (
    <div
      className="conversation"
      ref={scroller}
      role="log"
      aria-live="polite"
      onScroll={({ currentTarget: el }) => {
        followStream.current = el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_PX
      }}
    >
      <div className="conversation-inner">
        {messages.map((message) =>
          message.role === 'user' ? (
            <div key={message.id} className="question-pill user-message">
              <UserRound />
              <span>{message.content}</span>
            </div>
          ) : (
            <div key={message.id} className="agent-message">
              <div className="agent-mark" aria-hidden="true">✦</div>
              <div className="agent-body">
                {message.content && <Markdown>{message.content}</Markdown>}
                {message.status && <p className="agent-status">{message.status}…</p>}
                {message.error && <p className="agent-error" role="alert">{message.error}</p>}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
