import { AppWindow, BookOpen, Bot, Box, Boxes, Building2, CodeXml, Coins, ConciergeBell, Crosshair, Database, FileText, FlaskConical, Globe, Handshake, Headset, House, Info, Layers, Link2, Mail, MapPin, MessageCircle, Monitor, Newspaper, Pencil, Phone, Puzzle, RefreshCw, Search, Sprout, SquareCheckBig, TrendingUp, UserRound, Users, Workflow } from 'lucide-react'
import { ApproveArt, AssignArt, CaptureArt, CoinsArt, CubeArt, HandshakeArt, HeadsetArt, NotifyArt } from '@/components/automation/AutomationArt'
import { BulbArt, ChatArt, LaptopArt, TurningGearArt } from '@/components/services/ServiceArt'
import { BagArt, CapArt, CaseArt, FactoryArt, GrowthBarsIcon, TowerArt, TruckArt } from '@/components/industries/SectorArt'
import { InstagramIcon, LinkedInIcon } from '@/components/contact/SocialIcons'
import { BriefcaseIcon, CapIcon, CartIcon, FactoryIcon, TowerIcon, TruckIcon } from '@/components/home/IndustryIcons'
import { LayersGrowIcon, PeopleIcon, TargetIcon } from '@/components/home/WhyIcons'
import { ApprovalIcon, CalendarIcon, EnquiryIcon, InventoryIcon, QuotationIcon, ReportsIcon } from '@/components/home/ToolsIcons'
import { ChartArt, ChipArt, GearArt, GrowthChartArt } from '@/components/home/GrowthArt'
import { ChatIcon, DocumentIcon, LayersIcon, LinkIcon, SearchIcon, SparkleIcon } from '@/components/home/TeamIcons'
import type { ArtTile, AutomateItem, ConnectedSystem, ContactDetail, FaqItem, ServiceGroup, GrowthCard, IconCard, NavigationItem, PageName, ProcessStep, SocialLink, Solution, TeamCard, ToolCard } from '@/types'

export const automationHero = {
  eyebrow: 'BUSINESS AUTOMATION',
  lines: 'Less routine.',
  accent: 'More possibility.',
  text: 'Connect your tools. Simplify your workflows.',
  action: 'Automate Your Business',
}

export const automationAreas: ArtTile[] = [
  { label: 'Sales & CRM', art: HandshakeArt },
  { label: 'Customer Support', art: HeadsetArt },
  { label: 'Finance & Approvals', art: CoinsArt },
  { label: 'Operations', art: CubeArt },
]

export const automationFlow: { heading: string; stages: ArtTile[] } = {
  heading: 'One connected workflow.',
  stages: [
    { label: 'Capture', art: CaptureArt },
    { label: 'Assign', art: AssignArt },
    { label: 'Approve', art: ApproveArt },
    { label: 'Notify', art: NotifyArt },
  ],
}

export const automationTools: { heading: string; systems: ConnectedSystem[] } = {
  heading: 'Works with your business tools',
  systems: [
    { label: 'CRM', icon: Users },
    { label: 'ERP', icon: Layers },
    { label: 'Email', icon: Mail },
    { label: 'APIs', icon: CodeXml },
  ],
}

export const automationContact = {
  heading: 'What would you like to automate?',
  action: 'Let\u2019s Talk',
}

export const serviceGroups: ServiceGroup[] = [
  {
    title: 'AI Solutions',
    description: 'Make information more useful. Give people better support.',
    page: 'AI Solutions',
    art: ChatArt,
    features: [
      { title: 'AI Chatbots & Assistants', description: 'Guide enquiries and answer questions from approved content.', icon: Bot },
      { title: 'Knowledge Assistants', description: 'Search your company information in one place.', icon: BookOpen },
      { title: 'Document Intelligence', description: 'Extract and organise information for review.', icon: FileText },
      { title: 'AI Integration', description: 'Connect AI features to existing business systems.', icon: Puzzle },
    ],
  },
  {
    title: 'Business Automation',
    description: 'Reduce repetitive steps and keep work moving.',
    page: 'Automation',
    art: TurningGearArt,
    features: [
      { title: 'Sales & CRM Automation', description: 'Automate lead handling, follow-ups and CRM updates.', icon: Handshake },
      { title: 'Customer Support Workflows', description: 'Streamline enquiries, ticket handling and resolutions.', icon: Headset },
      { title: 'Finance & Approval Workflows', description: 'Simplify requests, approvals and finance operations.', icon: Coins },
      { title: 'HR & Operations Automation', description: 'Automate routine HR and operations tasks for faster, smoother workflows.', icon: Users },
    ],
  },
  {
    title: 'Intelligent Business Tools',
    description: 'Bring your information and everyday work together.',
    page: 'Intelligent Tools',
    art: LaptopArt,
    features: [
      { title: 'Business Dashboards', description: 'Get a clear, real-time view of your key business information.', icon: GrowthBarsIcon },
      { title: 'Custom Reporting', description: 'Create the reports you need from your business data.', icon: FileText },
      { title: 'Internal & Customer Portals', description: 'Give your team and customers a simple, secure way to access information and services.', icon: Monitor },
      { title: 'Quotation & Approval Tools', description: 'Create, share and approve quotations and requests in a structured, traceable flow.', icon: SquareCheckBig },
    ],
  },
  {
    title: 'Business Innovation',
    description: 'Turn your next idea into a working solution.',
    page: 'Business Innovation',
    art: BulbArt,
    features: [
      { title: 'AI Readiness Assessment', description: 'Understand your opportunities, check feasibility and plan next steps.', icon: Layers },
      { title: 'Process Improvement', description: 'Identify bottlenecks and redesign processes for better efficiency.', icon: TrendingUp },
      { title: 'Proof of Concept', description: 'Test and validate an idea with a focused, working solution.', icon: FlaskConical },
      { title: 'Custom AI Product Development', description: 'Design and build a solution tailored to your specific business need.', icon: CodeXml },
    ],
  },
]

export const serviceConnect: { heading: string; text: string; systems: ConnectedSystem[] } = {
  heading: 'Built to connect with your business',
  text: 'Work with your existing systems and tools for a unified, practical solution.',
  systems: [
    { label: 'Websites', icon: Globe },
    { label: 'CRM', icon: Users },
    { label: 'ERP', icon: Layers },
    { label: 'Email', icon: Mail },
    { label: 'Databases', icon: Database },
    { label: 'Business APIs', icon: CodeXml },
  ],
}

export const servicePath: { heading: string; text: string; steps: IconCard[] } = {
  heading: 'A clear path from idea to implementation',
  text: 'A simple, collaborative process to turn your business need into a working solution.',
  steps: [
    { title: 'Discover', description: 'Understand your goals, challenges and requirements.', icon: Search },
    { title: 'Design', description: 'Define the right solution and a practical plan.', icon: Pencil },
    { title: 'Develop', description: 'Build, integrate and get it ready for use.', icon: CodeXml },
    { title: 'Improve', description: 'Review, refine and help you get ongoing value.', icon: RefreshCw },
  ],
}

export const serviceContact = {
  heading: 'Not sure where to start?',
  text: 'Tell us about your challenge. We’ll help you identify a practical first step.',
  action: 'Talk to Our Team',
}

export const sectorIntro = {
  heading: 'Different industries. One practical approach.',
  text: 'We start with your workflows, information and goals to identify where intelligent technology can make a useful difference.',
}

export const sectorsHeading = 'Explore solutions for your sector'

export const sectorCards: GrowthCard[] = [
  { title: 'Manufacturing', description: 'Connect production information and simplify operational workflows.', features: ['Production Reporting', 'Inventory Alerts', 'Purchase Approvals'], art: FactoryArt },
  { title: 'Retail & E-Commerce', description: 'Support shoppers and connect everyday sales operations.', features: ['Product Enquiry Assistants', 'Order Updates', 'Sales Dashboards'], art: BagArt },
  { title: 'Education & Training', description: 'Organise enquiries, admissions and student requests.', features: ['Course Enquiry Assistants', 'Admission Follow-ups', 'Student Support Workflows'], art: CapArt },
  { title: 'Real Estate', description: 'Keep property enquiries and sales follow-ups organised.', features: ['Lead Capture & Assignment', 'Viewing Reminders', 'Document Collection'], art: TowerArt },
  { title: 'Professional Services', description: 'Make client coordination and business knowledge easier to manage.', features: ['Client Onboarding', 'Proposal Workflows', 'Internal Knowledge Search'], art: CaseArt },
  { title: 'Logistics & Distribution', description: 'Keep teams informed as orders and deliveries move.', features: ['Delivery Updates', 'Exception Alerts', 'Partner Portals'], art: TruckArt },
]

export const sectorSupport: { text: string; sectors: ConnectedSystem[] } = {
  text: 'Also supporting Hospitality & Events and Growing Enterprises',
  sectors: [
    { label: 'Hospitality & Events', icon: ConciergeBell },
    { label: 'Growing Enterprises', icon: Sprout },
  ],
}

export const sectorStepsHeading = 'From industry challenge to working solution'

export const sectorSteps: IconCard[] = [
  { title: 'Understand Your Workflow', description: 'Learn how your business currently works, your goals and key challenges.', icon: Search },
  { title: 'Identify Opportunities', description: 'Find practical use cases where AI and automation can add real value.', icon: Crosshair },
  { title: 'Build & Connect', description: 'Design and set up the right solution, connected with your existing systems.', icon: Layers },
  { title: 'Review & Improve', description: 'See it in action, gather feedback and refine so it keeps working better for you.', icon: RefreshCw },
]

export const sectorTrustHeading = 'Designed around your business'

export const sectorTrust: IconCard[] = [
  { title: 'Existing System Integration', description: 'Work with your current systems and data, so you get more value without a major change.', icon: Puzzle },
  { title: 'Human Review & Control', description: 'Keep the right oversight, with people in control of key decisions and important interactions.', icon: UserRound },
  { title: 'Room to Grow', description: 'Start with what you need today and expand over time as your business goals evolve.', icon: GrowthBarsIcon },
]

export const sectorContact = {
  heading: 'Don’t see your industry here?',
  text: 'Tell us how your business works. We’ll explore a solution around your needs.',
  action: 'Talk to Our Team',
}

export const footerTagline = ['Practical AI. Connected automation.', 'Smarter business.']
export const footerPhone = '+91 78451 32962'
export const footerAddress = ['Coimbatore', 'Tamil Nadu']

export const footerSolutions: { label: string; page: PageName }[] = [
  { label: 'AI Solutions', page: 'AI Solutions' },
  { label: 'Business Automation', page: 'Automation' },
  { label: 'Intelligent Tools', page: 'Intelligent Tools' },
  { label: 'Business Innovation', page: 'Business Innovation' },
]

export const contactEmail = 'business@ikasle.in'

const OFFICE_ADDRESS = ['1639/A, 2nd Floor, Hopes,', 'Peelamedu, Coimbatore,', 'Tamil Nadu, India – 641004']

export const contactDetails: ContactDetail[] = [
  { label: 'Phone', lines: ['+91 78451 32962'], href: 'tel:+917845132962', icon: Phone },
  { label: 'Email', lines: [contactEmail], href: `mailto:${contactEmail}`, icon: Mail },
  {
    label: 'Office',
    lines: OFFICE_ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS.join(' '))}`,
    external: true,
    icon: MapPin,
  },
]

// Add the profile addresses here and these icons become links.
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: '', icon: InstagramIcon },
  { label: 'LinkedIn', href: '', icon: LinkedInIcon },
]

export const contactServices = ['AI Solutions', 'Automation', 'Intelligent Tools', 'Business Innovation']

export const industriesHeading = 'Industries We Work With'

export const industries: IconCard[] = [
  { title: 'Manufacturing', description: 'Streamline operations, track information and improve efficiency.', icon: FactoryIcon },
  { title: 'Retail & E-Commerce', description: 'Automate customer interaction, orders and business processes.', icon: CartIcon },
  { title: 'Education', description: 'Simplify administration, information access and stakeholder support.', icon: CapIcon },
  { title: 'Real Estate', description: 'Manage enquiries, leads and operations more efficiently.', icon: TowerIcon },
  { title: 'Professional Services', description: 'Automate workflows, manage client information and improve productivity.', icon: BriefcaseIcon },
  { title: 'Logistics', description: 'Coordinate operations, track movements and stay on top of key updates.', icon: TruckIcon },
]

export const processHeading = 'From Business Need to Working Solution'

export const processSteps: ProcessStep[] = [
  { title: 'Discover', description: 'Understand your business, processes and the outcomes you want.' },
  { title: 'Prioritise', description: 'Identify high-impact opportunities and define a clear plan.' },
  { title: 'Design', description: 'Shape the right solution, workflows and integrations for your needs.' },
  { title: 'Build', description: 'Develop and configure the solution for your business environment.' },
  { title: 'Test', description: 'Validate with real use cases and make sure it works as expected.' },
  { title: 'Improve', description: 'Monitor, refine and scale based on usage and business impact.' },
]

export const whyHeading = 'Why Ikasle Super Intelligence?'
export const whyHeadingAccent = 'Super Intelligence?'

export const whyCards: IconCard[] = [
  { title: 'Built Around Your Business', description: 'Solutions designed for your processes, team and real business goals.', icon: TargetIcon },
  { title: 'People Stay in Control', description: 'AI and automation that support your team, not replace them.', icon: PeopleIcon },
  { title: 'Designed to Grow', description: 'A flexible, scalable approach that evolves with your business.', icon: LayersGrowIcon },
]

export const faqHeadingLines = ['Frequently', 'Asked', 'Questions']

// Only the first answer appears in the design. The other three are drafts built from
// what the rest of this page already says, so review them before launch.
export const faqs: FaqItem[] = [
  {
    question: 'What can we automate?',
    answer: 'You can automate repetitive and time-consuming tasks such as enquiry handling, follow-ups, approvals, document processing, reporting and other routine business workflows.',
  },
  {
    question: 'Can AI connect to our existing systems?',
    answer: 'Yes. AI and automation can connect with the systems you already use, including websites, CRM, ERP, email, databases and business APIs, so they fit into your existing workflows.',
  },
  {
    question: 'Where should a small business start?',
    answer: 'Start by understanding your business, processes and the outcomes you want. From there, identify the high-impact opportunities and define a clear plan for what to do first.',
  },
  {
    question: 'How is project scope decided?',
    answer: 'Scope comes from the first stages of the work: understanding your processes and goals, identifying the high-impact opportunities and defining a clear plan. The solution, workflows and integrations are then shaped around your needs.',
  },
]

export const toolsHeading = 'Practical Automation Tools'

export const toolCards: ToolCard[] = [
  {
    title: 'AI Enquiry Assistant',
    description: 'Answer common queries, collect details and keep leads moving.',
    icon: EnquiryIcon,
  },
  {
    title: 'Quotation Builder',
    description: 'Create accurate, consistent quotations in less time.',
    icon: QuotationIcon,
  },
  {
    title: 'Approval Tracker',
    description: 'Manage requests, approvals and status updates in one place.',
    icon: ApprovalIcon,
  },
  {
    title: 'Payment Reminders',
    description: 'Send timely, friendly reminders and reduce payment delays.',
    icon: CalendarIcon,
  },
  {
    title: 'Inventory Alerts',
    description: 'Get notified on low stock, reorders and key inventory changes.',
    icon: InventoryIcon,
  },
  {
    title: 'Management Reports',
    description: 'Generate clear, ready-to-use reports for better decisions.',
    icon: ReportsIcon,
  },
]

export const connectHeadingLines = ['Connect the Systems', 'You Already Use']

export const connectedSystems: ConnectedSystem[] = [
  { label: 'Websites', icon: AppWindow },
  { label: 'CRM', icon: Users },
  { label: 'ERP', icon: Layers },
  { label: 'Email', icon: Mail },
  { label: 'Databases', icon: Database },
  { label: 'Business APIs', icon: CodeXml },
]

export const automateLines = ['Automate the Routine.', 'Create Space for', 'Better Work.']

// `node` is the part of the workflow diagram that lights up with each item.
export const automateItems: AutomateItem[] = [
  { label: 'Lead Capture & Follow-ups', node: 'people' },
  { label: 'Customer Support', node: 'people' },
  { label: 'Sales & CRM', node: 'chart' },
  { label: 'Finance & Approvals', node: 'check' },
  { label: 'HR & Onboarding', node: 'check' },
  { label: 'Inventory & Operations', node: 'data' },
]

export const teamHeading = 'AI That Helps Your Team Get Work Done'

export const teamCards: TeamCard[] = [
  {
    title: 'AI Chatbots & Assistants',
    description: 'Get quick, accurate answers and support for your team and customers.',
    icon: ChatIcon,
  },
  {
    title: 'Internal Knowledge Search',
    description: 'Find the right information across your business, instantly.',
    icon: LayersIcon,
  },
  {
    title: 'Document Processing',
    description: 'Extract, organise and use information from business documents.',
    icon: DocumentIcon,
  },
  {
    title: 'Generative AI',
    description: 'Create drafts, summaries and business content faster.',
    icon: SparkleIcon,
  },
  {
    title: 'AI Search & Recommendations',
    description: 'Get relevant information, insights and next best actions.',
    icon: SearchIcon,
  },
  {
    title: 'AI Integration',
    description: 'Connect AI with your existing systems and workflows for greater impact.',
    icon: LinkIcon,
  },
]

export const growthHeading = 'Smarter Systems for Your Next Stage of Growth'

export const growthCards: GrowthCard[] = [
  {
    title: 'AI Solutions',
    description: 'Apply practical AI to handle information, answer questions and unlock business knowledge.',
    features: ['AI Chatbots', 'Knowledge Assistants', 'Document Intelligence'],
    art: ChipArt,
  },
  {
    title: 'Business Automation',
    description: 'Streamline repetitive work, reduce manual effort and keep your operations running smoothly.',
    features: ['Workflow Automation', 'CRM Automation', 'Approval Workflows'],
    art: GearArt,
  },
  {
    title: 'Intelligent Tools',
    description: 'Custom business tools that turn your data and processes into clear, actionable insights.',
    features: ['Dashboards', 'Reporting Tools', 'Internal Portals'],
    art: ChartArt,
  },
  {
    title: 'Business Innovation',
    description: 'Explore and build new, smarter ways of working with AI and digital automation.',
    features: ['AI Readiness', 'Process Improvement', 'Product Prototyping'],
    art: GrowthChartArt,
  },
]

export const navigation: NavigationItem[] = [
  { label: 'Home', page: 'Home', icon: House },
{ label: 'About', page: 'About Us', icon: Info },
  { label: 'Services', page: 'Services', icon: Workflow },
  { label: 'Automation', page: 'Automation', icon: Boxes },
  { label: 'Industries', page: 'Industries', icon: Building2 },

  { label: 'Blogs', page: 'Blogs', icon: Newspaper },
  { label: 'Contact', page: 'Contact', icon: MessageCircle },
]

export const solutions: Solution[] = [
  { title: 'AI Chatbots', description: 'Answer questions and guide customer enquiries.', icon: Bot },
  { title: 'Knowledge Assistants', description: 'Find answers across your business information.', icon: Box },
  { title: 'Document Intelligence', description: 'Extract and organise information from documents.', icon: FileText },
  { title: 'AI Integration', description: 'Connect AI with your existing tools and workflows.', icon: Link2 },
]


