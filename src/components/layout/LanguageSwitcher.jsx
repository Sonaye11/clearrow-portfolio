import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { supportedLanguages } from '../../i18n'

export default function LanguageSwitcher({
  onSelect,
  variant = 'dark',
  className = '',
}) {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const activeClass = variant === 'dark' ? 'text-accent' : 'text-accent'
  const inactiveClass =
    variant === 'dark'
      ? 'text-white hover:opacity-80'
      : 'text-black hover:opacity-70'
  const separatorClass = variant === 'dark' ? 'text-muted' : 'text-muted'

  const switchLanguage = (code) => {
    localStorage.setItem('preferredLanguage', code)
    navigate(`/${code}${location.hash}`)
    onSelect?.()
  }

  return (
    <div
      className={`flex items-center text-[16px] leading-normal md:text-[18px] ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {supportedLanguages.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && (
            <span className={`px-1.5 ${separatorClass}`} aria-hidden="true">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => switchLanguage(code)}
            className={`border-0 bg-transparent p-0 uppercase ${
              code === lang ? activeClass : inactiveClass
            }`}
            aria-current={code === lang ? 'true' : undefined}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  )
}
