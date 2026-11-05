import { useEffect, useRef, useState } from 'react'
import { ChatComposer, Conversation, HomeView, PageView, Sidebar, SiteFooter, SolutionsView, Topbar } from '@/components'
import { useAgent } from '@/hooks/useAgent'
import type { PageName } from '@/types'
import './App.css'

export function App() {
  const [activePage, setActivePage] = useState<PageName>('AI Solutions')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isNewConversation, setIsNewConversation] = useState(true)
  const { messages, busy, send, stop, reset } = useAgent()
  const isHome = activePage === 'Home'
  const isSolutions = activePage === 'AI Solutions'
  const mainRef = useRef<HTMLElement>(null)

  // The page area is shared, so without this a new page opens at the old page's scroll position.
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [activePage])

  const navigate = (page: PageName) => {
    setActivePage(page)
    // Also covers a footer link to the page already open, which would otherwise seem to do nothing.
    mainRef.current?.scrollTo(0, 0)
    setIsChatOpen(false)
    setIsNewConversation(false)
    setIsSidebarOpen(false)
  }

  const ask = (text: string) => {
    void send(text)
    setIsChatOpen(true)
    setIsNewConversation(true)
    setIsSidebarOpen(false)
  }

  const startNewConversation = () => {
    reset()
    navigate('AI Solutions')
    setIsNewConversation(true)
  }

  return <div className="app-shell">
    <Sidebar
      activePage={activePage}
      isConversationActive={isNewConversation || isChatOpen}
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      onNavigate={navigate}
      onNewConversation={startNewConversation}
      onSearch={ask}
      busy={busy}
    />

    {isSidebarOpen &&
      <button className="scrim" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} />
    }

    <main ref={mainRef} className={isChatOpen ? 'chatting' : isNewConversation ? '' : 'home-main'}>
      <Topbar activePage={activePage} onOpenMenu={() => setIsSidebarOpen(true)} />
      {isChatOpen ? <Conversation messages={messages} /> : isHome ? <HomeView onNavigate={navigate} /> : isSolutions ? <SolutionsView /> : <PageView page={activePage} onNavigate={navigate} />}
      {/* The chat box belongs to conversations: it stays off every other page. */}
      {(isChatOpen || isNewConversation)
        ? <ChatComposer busy={busy} onSend={ask} onStop={stop} />
        : <SiteFooter onNavigate={navigate} />}
    </main>
  </div>
}

export default App

