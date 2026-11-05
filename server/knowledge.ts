// What the agent is allowed to say about Ikasle. Add services, pricing, FAQs or
// contact details here and the agent can use them immediately.
export type KnowledgeEntry = { title: string; content: string }

export const knowledge: KnowledgeEntry[] = [
  {
    title: 'About Ikasle',
    content:
      'Ikasle Super Intelligence builds AI around your business: practical AI solutions that help your team access knowledge, simplify work and turn information into action.',
  },
  {
    title: 'AI Chatbots',
    content: 'AI chatbots answer questions and guide customer enquiries.',
  },
  {
    title: 'Knowledge Assistants',
    content: 'Knowledge assistants find answers across your business information.',
  },
  {
    title: 'Document Intelligence',
    content: 'Document intelligence extracts and organises information from documents.',
  },
  {
    title: 'AI Integration',
    content: 'AI integration connects AI with your existing tools and workflows.',
  },
  {
    title: 'Contact',
    content: 'Visitors can reach the team through the "Talk to our team" button or the Contact section of the site.',
  },
]

export function formatEntries(entries: KnowledgeEntry[]): string {
  return entries.map((entry) => `${entry.title}: ${entry.content}`).join('\n')
}

// Keyword search. With no match it returns everything, because broad questions
// like "what do you offer?" share no words with the entries but are still answerable.
export function searchKnowledge(query: string, limit = 3): KnowledgeEntry[] {
  const terms = query.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? []
  const matches = knowledge
    .map((entry) => {
      const text = `${entry.title} ${entry.content}`.toLowerCase()
      return { entry, score: terms.filter((term) => text.includes(term)).length }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry)
  return matches.length > 0 ? matches : knowledge
}
