export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`w-full ${className}`}>
      {children}
    </section>
  )
}
