import { useState, type FormEvent } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { navigation } from '@/data/content'
import type { PageName } from '@/types'

interface SidebarProps {
  activePage: PageName
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: PageName) => void
  onNewConversation: () => void
  onSearch: (query: string) => void
  busy: boolean
}

export function Sidebar({ activePage, isOpen, onClose, onNavigate, onNewConversation, onSearch, busy }: SidebarProps) {
  const [query, setQuery] = useState('')
  const submitSearch = (event: FormEvent) => { event.preventDefault(); if (busy || !query.trim()) return; onSearch(query); setQuery('') }
  return <aside className={'sidebar ' + (isOpen ? 'sidebar--open' : '')}>
    <div className="brand-row">
      <button className="brand-home" onClick={() => onNavigate('Home')} aria-label="Go to Home"><span className="brand-mark"><i /><i /></span><span><strong>IKASLE</strong><small>SUPER INTELLIGENCE</small></span></button>
      <button className="mobile-close" onClick={onClose} aria-label="Close menu"><X /></button>
    </div>
    <button className="new-chat" onClick={onNewConversation}><Plus />New Conversation</button>
    <form className="search-box" onSubmit={submitSearch}><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search" placeholder="Search" /><button type="submit" aria-label="Ask the agent"><Search /></button></form>
    <nav>{navigation.map(({ label, page, icon: Icon }) => <button key={page} className={activePage === page ? 'active' : ''} onClick={() => onNavigate(page)}><Icon /><span>{label}</span></button>)}</nav>
  </aside>
}
