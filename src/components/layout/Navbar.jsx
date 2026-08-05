import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const navLinkKeys = [
  { key: 'about', href: '#about' },
  { key: 'work', href: '#work' },
  { key: 'competence', href: '#competence' },
  { key: 'services', href: '#services' },
]

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}

function DesktopNavbar() {
  const { t } = useTranslation()

  return (
    <header className="hidden px-6 pt-[29px] md:block lg:px-[63px]">
      <nav
        className="desktop-nav grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[20px] leading-normal font-normal lg:gap-4"
        aria-label={t('nav.mainNav')}
      >
        <div className="flex min-w-0 items-baseline gap-3 justify-self-start lg:gap-6">
          <a href="#hero" className="shrink-0 whitespace-nowrap text-white">
            {t('nav.brand')}
          </a>
          <span className="nav-tagline hidden truncate text-muted xl:inline">
            {t('nav.tagline')}
          </span>
        </div>

        <ul className="flex items-center gap-4 justify-self-center lg:gap-8 xl:gap-10">
          {navLinkKeys.slice(0, 3).map(({ key, href }) => (
            <li key={href}>
              <a
                href={href}
                className="whitespace-nowrap text-white transition-opacity hover:opacity-80"
              >
                {t(`nav.${key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 justify-self-end lg:gap-4">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="shrink-0 whitespace-nowrap text-accent transition-opacity hover:opacity-80"
          >
            {t('nav.contact')}
          </a>
        </div>
      </nav>
    </header>
  )
}

function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const closeMenu = () => setOpen(false)

  return (
    <header className="px-6 pt-[29px] md:hidden">
      <nav
        className="flex items-center justify-between text-[20px] leading-normal"
        aria-label={t('nav.mainNav')}
      >
        <a href="#hero" className="whitespace-nowrap text-white">
          {t('nav.brand')}
        </a>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t('nav.openMenu')}
          onClick={() => setOpen(true)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </nav>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40"
            aria-label={t('nav.closeMenu')}
            onClick={closeMenu}
          />

          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg"
          >
            <div className="flex justify-end px-6 py-5">
              <button
                type="button"
                className="relative flex h-8 w-8 items-center justify-center"
                aria-label={t('nav.closeMenu')}
                onClick={closeMenu}
              >
                <span className="absolute block h-0.5 w-6 rotate-45 bg-black" />
                <span className="absolute block h-0.5 w-6 -rotate-45 bg-black" />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-6 px-6 pb-6 text-[22px] text-black">
              {navLinkKeys.map(({ key, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block whitespace-nowrap"
                    onClick={closeMenu}
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="block whitespace-nowrap text-accent"
                  onClick={closeMenu}
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>

            <div className="flex justify-center px-6 pb-10">
              <LanguageSwitcher variant="light" onSelect={closeMenu} />
            </div>
          </div>
        </>
      )}
    </header>
  )
}
