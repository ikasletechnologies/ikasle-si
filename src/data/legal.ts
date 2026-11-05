import type { FaqItem } from '@/types'

// Written on 5 November 2026 from how this website actually works: no accounts, no cookies or
// browser storage, enquiries emailed to the team, assistant messages sent to an AI provider.
// If any of that changes, these pages must change with it. Needs a lawyer's review before launch.

export const legalLastUpdated = '5 November 2026'

// A string is a paragraph, and a list of strings is a bullet list.
export type LegalBlock = string | string[]

export interface LegalSection {
  id: string
  heading: string
  blocks: LegalBlock[]
  showContact?: boolean
}

export const privacyIntro = 'What information we collect through this website, why we collect it, and the choices you have.'

export const privacySections: LegalSection[] = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    blocks: ['IKASLE Super Intelligence (“we”, “us”) runs this website. Our office is at 1639/A, 2nd Floor, Hopes, Peelamedu, Coimbatore, Tamil Nadu, India – 641004.'],
  },
  {
    id: 'what-we-collect',
    heading: 'Information we collect',
    blocks: [
      'We only collect information in these situations:',
      [
        'When you send the contact form: your name, company name, email address, phone number, the service you are interested in and your project details.',
        'When you use the AI assistant or the website search: the messages you type during that conversation.',
        'When you visit: your network (IP) address, which is used briefly to limit repeated form submissions, and the basic technical records that web hosting normally keeps.',
      ],
      'You do not need an account to use this website. It does not use advertising or analytics cookies, and it does not store information in your browser.',
      'Please do not enter sensitive personal information, passwords or payment details into the contact form or the AI assistant.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use your information',
    blocks: [
      [
        'To reply to your enquiry and discuss what you need.',
        'To answer the questions you ask the AI assistant.',
        'To keep the website secure and prevent misuse.',
        'To meet our legal obligations.',
      ],
      'We do not sell your personal information, and we do not add you to marketing lists without your consent.',
    ],
  },
  {
    id: 'consent',
    heading: 'Your consent',
    blocks: ['By ticking the box on the contact form, you agree to us using your details as described here. You can withdraw that consent at any time by emailing us. This will not affect anything we did before you withdrew it.'],
  },
  {
    id: 'sharing',
    heading: 'Who we share it with',
    blocks: [
      'We share information only with the services that help us run this website, and where the law requires it:',
      [
        'Our email service, which delivers contact form enquiries to our team.',
        'A third-party AI service provider, which receives assistant messages in order to generate a reply. Its own terms and privacy policy apply to how it handles them.',
        'Our website hosting provider.',
        'Government or legal authorities, when we are legally required to.',
      ],
      'Some of these providers may process information outside India.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    blocks: [
      'We keep enquiries only for as long as we need them to respond to you, carry out any work that follows, and meet our legal and accounting obligations. We then delete them.',
      'This website does not save your assistant conversations. A conversation ends when you start a new one or close or refresh the page, although our AI provider may keep messages for a period under its own terms.',
    ],
  },
  {
    id: 'security',
    heading: 'Keeping it secure',
    blocks: ['We take reasonable steps to protect your information, but no website or internet service can be guaranteed to be completely secure.'],
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    blocks: [
      'Subject to applicable law, including India’s Digital Personal Data Protection Act, 2023, you can ask us to:',
      [
        'Tell you what personal information we hold about you and how it is used.',
        'Correct or update it.',
        'Delete it.',
        'Stop using it, by withdrawing your consent.',
        'Deal with someone you have nominated to act for you.',
      ],
      'To do any of this, or to raise a complaint, email us using the details below. If we cannot resolve your complaint, you may approach the Data Protection Board of India.',
    ],
  },
  {
    id: 'children',
    heading: 'Children',
    blocks: ['This website is intended for businesses and is not directed at anyone under 18. If you believe a child has sent us personal information, please contact us and we will delete it.'],
  },
  {
    id: 'other-websites',
    heading: 'Other websites',
    blocks: ['Links on this website, such as to maps or social media, lead to services we do not control. Their own privacy policies apply.'],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    blocks: ['We may update this policy from time to time. The date at the top of this page shows when it last changed.'],
  },
  {
    id: 'contact',
    heading: 'Contact us',
    blocks: ['For any question about this policy or your information:'],
    showContact: true,
  },
]

export const termsIntro = 'The terms that apply when you use this website. Please read them before using it.'

export const termsSections: LegalSection[] = [
  {
    id: 'accepting',
    heading: 'Accepting these terms',
    blocks: ['This website is run by IKASLE Super Intelligence (“we”, “us”). By using it, you agree to these terms. If you do not agree, please do not use the website.'],
  },
  {
    id: 'information',
    heading: 'Information on this website',
    blocks: ['The content here is general information about our services. It is not professional advice or a binding offer, and what we can deliver for you will depend on your needs. We try to keep it accurate and up to date, but we cannot promise that it always will be.'],
  },
  {
    id: 'enquiries',
    heading: 'Enquiries and projects',
    blocks: ['Sending us an enquiry does not create a contract or oblige either of us to go ahead. Any project is governed by a separate written agreement between you and us, and that agreement takes priority over these terms.'],
  },
  {
    id: 'assistant',
    heading: 'The AI assistant',
    blocks: [
      'The assistant on this website generates automated answers, and those answers can be wrong or incomplete. In particular:',
      [
        'Do not rely on it for legal, financial, medical or other professional advice.',
        'Nothing it says is a quotation, a commitment or a statement of our official position. Please confirm anything important with our team.',
        'Do not enter sensitive personal information, passwords or payment details.',
      ],
    ],
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable use',
    blocks: [
      'When using this website, you agree not to:',
      [
        'Break any law or infringe anyone else’s rights.',
        'Send false information or impersonate someone else.',
        'Send spam, or flood the contact form or the assistant with automated requests.',
        'Try to disrupt the website, gain unauthorised access to it or get around its security or limits.',
        'Scrape or copy the website’s content by automated means without our permission.',
      ],
    ],
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual property',
    blocks: ['The content, design, artwork and branding on this website belong to us or to those who license them to us. You may view them and share links to this website, but you may not copy or reuse them for commercial purposes without our written permission.'],
  },
  {
    id: 'third-parties',
    heading: 'Third-party links and services',
    blocks: ['This website links to, and relies on, services run by others. We are not responsible for their content or for how they operate.'],
  },
  {
    id: 'no-warranty',
    heading: 'No guarantee',
    blocks: ['This website is provided “as is”. We do not guarantee that it will always be available, uninterrupted or free from errors.'],
  },
  {
    id: 'liability',
    heading: 'Limit of our liability',
    blocks: ['To the fullest extent the law allows, we are not liable for any indirect or consequential loss, or for loss of profit, business or data, arising from your use of this website or your reliance on its content, including the assistant’s answers. Nothing here limits any liability that cannot legally be limited.'],
  },
  {
    id: 'privacy',
    heading: 'Your privacy',
    blocks: ['Our Privacy Policy explains how we handle your information. You can open it from the bottom of any page.'],
  },
  {
    id: 'changes',
    heading: 'Changes to these terms',
    blocks: ['We may update these terms from time to time. The date at the top of this page shows when they last changed, and continuing to use the website means you accept the updated terms.'],
  },
  {
    id: 'law',
    heading: 'Governing law',
    blocks: ['These terms are governed by the laws of India. Any dispute relating to them or to this website is subject to the jurisdiction of the courts at Coimbatore, Tamil Nadu.'],
  },
  {
    id: 'contact',
    heading: 'Contact us',
    blocks: ['For any question about these terms:'],
    showContact: true,
  },
]

export const faqIntro = 'Clear answers about what we do and how we work. If yours isn’t here, our team is happy to help.'

export const faqGroups: { lines: string[]; items: FaqItem[] }[] = [
  {
    lines: ['Getting', 'Started'],
    items: [
      { question: 'What can we automate?', answer: 'You can automate repetitive and time-consuming tasks such as enquiry handling, follow-ups, approvals, document processing, reporting and other routine business workflows.' },
      { question: 'Where should a small business start?', answer: 'Start by understanding your business, processes and the outcomes you want. From there, identify the high-impact opportunities and define a clear plan for what to do first.' },
      { question: 'What does the process look like?', answer: 'It follows four steps: Discover your goals, challenges and requirements. Design the right solution and a practical plan. Develop, integrate and get it ready for use. Then Improve it through review and refinement, so you get ongoing value.' },
      { question: 'How is project scope decided?', answer: 'Scope comes from the first stages of the work: understanding your processes and goals, identifying the high-impact opportunities and defining a clear plan. The solution, workflows and integrations are then shaped around your needs.' },
      { question: 'How much does a project cost?', answer: 'Every solution is shaped around the business it is for, so we don’t list fixed prices on this website. Tell us what you would like to improve and we can talk through it with you.' },
    ],
  },
  {
    lines: ['Our', 'Services'],
    items: [
      { question: 'What services do you offer?', answer: 'We work in four areas: AI Solutions, Business Automation, Intelligent Business Tools and Business Innovation. The Services page lists what each one includes.' },
      { question: 'Which industries do you work with?', answer: 'Manufacturing, Retail & E-Commerce, Education & Training, Real Estate, Professional Services and Logistics & Distribution, and we also support Hospitality & Events and Growing Enterprises. If your industry isn’t listed, tell us how your business works and we’ll explore a solution around your needs.' },
      { question: 'Can you build custom tools for our business?', answer: 'Yes. That includes business dashboards, custom reporting, internal and customer portals, and quotation and approval tools.' },
      { question: 'Can we test an idea before a full build?', answer: 'Yes. A proof of concept lets you test and validate an idea with a focused, working solution. We can also assess your AI readiness first, to understand your opportunities, check feasibility and plan next steps.' },
    ],
  },
  {
    lines: ['Systems', '& People'],
    items: [
      { question: 'Can AI connect to our existing systems?', answer: 'Yes. AI and automation can connect with the systems you already use, including websites, CRM, ERP, email, databases and business APIs, so they fit into your existing workflows.' },
      { question: 'Will AI replace our team?', answer: 'No. We build AI and automation that support your team, not replace them, with people staying in control of key decisions and important interactions.' },
      { question: 'Where do AI assistants get their answers?', answer: 'The chatbots and assistants we build guide enquiries and answer questions from approved content, so what they say comes from information you have chosen.' },
      { question: 'Can a solution grow with our business?', answer: 'Yes. You can start with what you need today and expand over time as your business goals evolve.' },
    ],
  },
  {
    lines: ['Your', 'Information'],
    items: [
      { question: 'What happens to the details I send through the contact form?', answer: 'They are emailed to our team so we can reply to your enquiry. The Privacy Policy explains this in full, including how to ask us to correct or delete them.' },
      { question: 'Is the AI assistant on this website a real person?', answer: 'No. It generates automated answers, which can be wrong or incomplete, so please confirm anything important with our team.' },
      { question: 'Are my assistant conversations private?', answer: 'Your messages are sent to a third-party AI provider to generate a reply, and this website does not save the conversation. Please don’t enter sensitive personal information, passwords or payment details.' },
      { question: 'How can I contact you?', answer: 'Use the form on the Contact page, email business@ikasle.in or call +91 78451 32962.' },
    ],
  },
]
