export default function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-16 ${className}`}>
      {children}
    </div>
  )
}
