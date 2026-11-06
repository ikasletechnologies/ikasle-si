import { Plus, X } from 'lucide-react'
import { navigation } from '@/data/content'
import type { PageName } from '@/types'

interface SidebarProps {
  activePage?: PageName
  isConversationActive: boolean
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: PageName) => void
  onNewConversation: () => void
  onSearch?: (query: string) => void
  busy?: boolean
}

export function Sidebar({ activePage, isConversationActive, isOpen, onClose, onNavigate, onNewConversation }: SidebarProps) {
  return (
    <aside className={'sidebar ' + (isOpen ? 'sidebar--open' : '')}>
      <div className="brand-row">
        <button className="brand-home" onClick={() => onNavigate('Home')} aria-label="Go to Home">
          <span className="brand-mark"><i /><i /></span>
          <span><strong>IKASLE</strong><small>SUPER INTELLIGENCE</small></span>
        </button>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu"><X /></button>
      </div>
      <button
        className={`new-chat${isConversationActive ? ' active' : ''}`}
        aria-current={isConversationActive ? 'page' : undefined}
        onClick={onNewConversation}
      >
        <Plus />New Conversation
      </button>
      <nav>
        {navigation.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            className={!isConversationActive && activePage === page ? 'active' : ''}
            onClick={() => onNavigate(page)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
