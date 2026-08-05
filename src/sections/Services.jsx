import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import { services } from '../data/services'

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="services" className="scroll-mt-8 bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h2 className="services-title text-center font-display text-[clamp(2rem,7vw,3rem)] leading-none md:text-[clamp(2.5rem,6vw,4rem)] lg:text-[clamp(3rem,7vw,4.5rem)] xl:text-[6rem]">
          {t('services.title')}
        </h2>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {services.map(({ id, cardKey, price, featured }) => {
            const title = t(`services.cards.${cardKey}.title`, {
              returnObjects: true,
            })
            const features = t(`services.cards.${cardKey}.features`, {
              returnObjects: true,
            })
            const titleLines = Array.isArray(title) ? title : [title]

            return (
              <article
                key={id}
                data-service={id}
                className={`flex min-h-[368px] flex-col border border-black p-6 md:min-h-0 lg:min-h-[368px] ${
                  featured ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                <h3 className="service-card-title text-[clamp(1.75rem,3vw,3rem)] leading-tight font-bold">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <p className="mt-4 text-[clamp(1.125rem,2vw,2rem)]">{price}</p>

                <ul
                  className={`mt-4 list-disc pl-6 text-[clamp(1.125rem,2vw,2rem)] ${
                    featured ? 'text-muted' : 'text-black'
                  }`}
                >
                  {features.map((feature) => (
                    <li key={feature} className="leading-normal">
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <p className="mt-12 text-center text-[clamp(1.125rem,2vw,2rem)] text-muted">
          {t('services.footnote')}
        </p>
      </div>
    </Section>
  )
}
