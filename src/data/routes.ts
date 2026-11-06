import type { PageName } from '@/types'

// Every URL in the app comes from this table. A path not listed here shows the 404 page.
export const pagePaths: Record<PageName, string> = {
  Home: '/home',
  'About Us': '/about',
  'AI Solutions': '/ai-solutions',
  Automation: '/automation',
  'Intelligent Tools': '/intelligent-tools',
  'Business Innovation': '/business-innovation',
  Contact: '/contact',
  Industries: '/industries',
  Blogs: '/blogs',
  Services: '/services',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  FAQ: '/faq',
}

// The conversation screens are not pages: they have no footer and no entry in the table above.
export const LANDING_PATH = '/'
export const CHAT_PATH = '/chat'

const pageByPath = new Map(Object.entries(pagePaths).map(([page, path]) => [path, page as PageName]))

// So /Services and /services/ reach the same page as /services.
export const normalizePath = (pathname: string) => pathname.toLowerCase().replace(/\/+$/, '') || LANDING_PATH

export const pageFromPath = (path: string) => pageByPath.get(path)
