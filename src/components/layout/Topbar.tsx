import { ArrowRight, Bell, House, Menu, MoreHorizontal, Settings, Workflow } from 'lucide-react'
import type { PageName } from '@/types'

interface TopbarProps {
  activePage: PageName
  onOpenMenu: () => void
}

export function Topbar({ activePage, onOpenMenu }: TopbarProps) {
  const isHome = activePage === 'Home'
  return <header className="topbar">
    <button className="menu-button" onClick={onOpenMenu} aria-label="Open menu"><Menu /></button>
    <button className="section-pill">
      {isHome ? <House /> : <Workflow />}<span>{activePage}</span><ArrowRight />
    </button>
    <div className="header-actions">
      <button aria-label="More options"><MoreHorizontal /></button>
      <button aria-label="Notifications"><Bell /></button>
      <button aria-label="Settings"><Settings /></button>
    </div>
  </header>
}
