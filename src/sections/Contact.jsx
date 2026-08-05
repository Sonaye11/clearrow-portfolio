import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import UtcClock from '../components/layout/UtcClock'
import { contactLinks, footerMeta } from '../data/contact'

function ContactLine({ label, value, href }) {
  const content = (
    <>
      {label} : {value}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block leading-normal transition-opacity hover:opacity-70"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return <p className="leading-normal">{content}</p>
}

export default function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contact" className="scroll-mt-8 bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 md:px-12 lg:px-16">
        <h2 className="contact-title text-center font-display text-[clamp(2rem,8vw,3.5rem)] leading-none whitespace-normal md:text-left md:text-[clamp(2.5rem,7vw,4rem)] lg:whitespace-nowrap lg:text-[3.25rem] xl:text-[6rem]">
          {t('contact.title')}
        </h2>

        <div className="mt-8 space-y-1 text-base leading-normal text-black sm:text-lg md:mt-10 md:text-xl lg:mt-12 lg:text-[2rem]">
          {contactLinks.map(({ id, labelKey, value, href }) => (
            <ContactLine
              key={id}
              label={t(`contact.labels.${labelKey}`)}
              value={value}
              href={href}
            />
          ))}
        </div>

        <footer className="mt-16 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:mt-20 md:text-base lg:mt-24 lg:text-[20px]">
          <p>{t('contact.copyright')}</p>
          {footerMeta.showUtcClock && <UtcClock />}
        </footer>
      </div>
    </Section>
  )
}
