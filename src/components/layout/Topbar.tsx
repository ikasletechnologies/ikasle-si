import { ArrowRight, Bell, House, Menu, MoreHorizontal, Settings, Workflow } from 'lucide-react'
import { pagePaths } from '@/data/routes'
import type { PageName } from '@/types'

interface TopbarProps {
  activePage: string
  onOpenMenu: () => void
  onNavigate?: (page: PageName) => void
}

export function Topbar({ activePage, onOpenMenu, onNavigate }: TopbarProps) {
  const isHome = activePage === 'Home'

  const handlePillClick = () => {
    if (!onNavigate) return
    const targetPage = (activePage in pagePaths ? activePage : 'AI Solutions') as PageName
    onNavigate(targetPage)
  }

  return (
    <header className="topbar">
      <button className="menu-button" onClick={onOpenMenu} aria-label="Open menu">
        <Menu />
      </button>
      <button
        type="button"
        className="section-pill"
        onClick={handlePillClick}
        aria-label={`Navigate to ${activePage}`}
      >
        {isHome ? <House /> : <Workflow />}
        <span>{activePage}</span>
        <ArrowRight />
      </button>
      <div className="header-actions">
        <button aria-label="More options"><MoreHorizontal /></button>
        <button aria-label="Notifications"><Bell /></button>
        <button aria-label="Settings"><Settings /></button>
      </div>
    </header>
  )
}
