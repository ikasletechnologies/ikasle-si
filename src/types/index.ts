import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface GrowthCard {
  title: string
  description: string
  features: string[]
  art: ComponentType
}

export type AutomateNode = 'people' | 'check' | 'data' | 'chart'

export interface AutomateItem {
  label: string
  node: AutomateNode
}

export interface ToolCard {
  title: string
  description: string
  icon: ComponentType
}

export interface IconCard {
  title: string
  description: string
  icon: ComponentType
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ContactDetail {
  label: string
  lines: string[]
  href: string
  external?: boolean
  icon: LucideIcon
}

export interface SocialLink {
  label: string
  href: string
  icon: ComponentType
}

export interface ServiceGroup {
  title: string
  description: string
  page: PageName
  art: ComponentType
  features: IconCard[]
}

export interface ArtTile {
  label: string
  art: ComponentType
}

export interface ConnectedSystem {
  label: string
  icon: LucideIcon
}

export interface TeamCard {
  title: string
  description: string
  icon: ComponentType
}

export type PageName =
  | 'Home'
  | 'About Us'
  | 'AI Solutions'
  | 'Automation'
  | 'Intelligent Tools'
  | 'Business Innovation'
  | 'Contact'
  | 'Industries'
  | 'Blogs'
  | 'Services'
  | 'Privacy Policy'
  | 'Terms & Conditions'
  | 'FAQ'

export interface NavigationItem {
  label: string
  page: PageName
  icon: LucideIcon
}

export interface Solution {
  title: string
  description: string
  icon: LucideIcon
}


