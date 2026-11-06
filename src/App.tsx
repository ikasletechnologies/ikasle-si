import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ChatComposer, Conversation, HomeView, NotFoundPage, PageView, Sidebar, SiteFooter, SolutionsView, Topbar } from '@/components'
import { CHAT_PATH, LANDING_PATH, normalizePath, pageFromPath, pagePaths } from '@/data/routes'
import { useAgent } from '@/hooks/useAgent'
import type { PageName } from '@/types'
import './App.css'

const SITE_NAME = 'Ikasle Super Intelligence'
const NOT_FOUND_LABEL = 'Page Not Found'

export function App() {
  const { pathname } = useLocation()
  const routerNavigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { messages, busy, send, stop, reset } = useAgent()
  const mainRef = useRef<HTMLElement>(null)

  const path = normalizePath(pathname)
  const isLanding = path === LANDING_PATH
  const isChat = path === CHAT_PATH
  const isConversation = isLanding || isChat
  const page = pageFromPath(path)
  const label = page ?? (isConversation ? 'AI Solutions' : NOT_FOUND_LABEL)

  // The page area is shared, so without this a new page opens at the old page's scroll position.
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.title = `${label} | ${SITE_NAME}`
  }, [label])

  const goTo = (target: string) => {
    // Clicking a link to the open page shouldn't add a step for the back button to undo.
    routerNavigate(target, { replace: target === pathname })
    // Also covers a footer link to the page already open, which would otherwise seem to do nothing.
    mainRef.current?.scrollTo(0, 0)
    setIsSidebarOpen(false)
  }

  const navigate = (target: PageName) => goTo(pagePaths[target])

  const ask = (text: string) => {
    void send(text)
    goTo(CHAT_PATH)
  }

  const startNewConversation = () => {
    reset()
    goTo(LANDING_PATH)
  }

  const renderView = () => {
    // Messages live in memory, so a refresh or a shared /chat link has nothing to show.
    if (isChat) return messages.length ? <Conversation messages={messages} /> : <Navigate to={LANDING_PATH} replace />
    if (isLanding) return <SolutionsView onNavigate={navigate} />
    if (page === 'Home') return <HomeView onNavigate={navigate} />
    if (page) return <PageView page={page} onNavigate={navigate} />
    return <NotFoundPage onNavigate={navigate} />
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={page}
        isConversationActive={isConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={navigate}
        onNewConversation={startNewConversation}
      />

      {isSidebarOpen && (
        <button className="scrim" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main ref={mainRef} className={isChat ? 'chatting' : isLanding ? '' : 'home-main'}>
        <Topbar activePage={label} onOpenMenu={() => setIsSidebarOpen(true)} onNavigate={navigate} />
        {renderView()}
        {/* The chat box belongs to conversations: it stays off every other page. */}
        {isConversation ? (
          <ChatComposer busy={busy} onSend={ask} onStop={stop} />
        ) : (
          <SiteFooter onNavigate={navigate} />
        )}
      </main>
    </div>
  )
}

export default App
