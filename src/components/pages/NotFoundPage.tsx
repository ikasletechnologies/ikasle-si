import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import type { PageName } from '@/types'

// Shares the framed card design of the Blogs page.
export function NotFoundPage({ onNavigate }: { onNavigate: (page: PageName) => void }) {
  return <section className="blogs-view">
    {/* The server answers 200 for every path so the app can load, so this keeps missing pages out of search results. */}
    <meta name="robots" content="noindex" />
    <div className="blogs-coming-soon">
      <div className="blogs-orbit" aria-hidden="true"><Compass /><span><Sparkles /></span></div>
      <span className="blogs-badge"><i /> Error 404</span>
      <h1 className="not-found-title">Page not found.</h1>
      <p className="blogs-intro">The page you’re looking for doesn’t exist or may have moved.</p>
      <div className="not-found-actions">
        <button type="button" onClick={() => onNavigate('Home')}>Back to Home <ArrowRight /></button>
        <button type="button" className="not-found-secondary" onClick={() => onNavigate('Services')}>View Our Services</button>
      </div>
    </div>
  </section>
}
