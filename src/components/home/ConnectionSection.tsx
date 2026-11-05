interface ConnectionSectionProps {
  title?: string
  description?: string
}

export function ConnectionSection({
  title = 'Connecting Intelligence with Real Business Needs',
  description = 'We turn the power of AI into practical business outcomes through real-world AI solutions, connected automation and custom tools that fit your processes, people and goals.',
}: ConnectionSectionProps) {
  return <section className="connection-section">
    <div className="connection-title"><span /><h2>{title}</h2></div>
    <div className="connection-divider" />
    <p>{description}</p>
  </section>
}
