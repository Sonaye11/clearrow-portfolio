import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import { services } from '../data/services'
import helmetImg from '../assets/hero/helmet.webp'
import butterflyImg from '../assets/hero/butterfly.webp'

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
            const description = t(`services.cards.${cardKey}.description`)
            const features = t(`services.cards.${cardKey}.features`, {
              returnObjects: true,
            })
            const titleLines = Array.isArray(title) ? title : [title]

            return (
              <article
                key={id}
                data-service={id}
                className={`relative flex h-full flex-col border-[3px] border-black ${
                  featured ? 'z-10 bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {featured && (
                  <>
                    <img
                      src={helmetImg}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-5 -right-4 z-20 w-[clamp(5rem,10vw,9rem)] sm:-top-7 sm:-right-6"
                    />
                    <img
                      src={butterflyImg}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-10 -left-4 z-20 w-[clamp(6rem,11vw,10rem)] sm:-bottom-14 sm:-left-6"
                    />
                  </>
                )}

                <div
                  className={`relative z-10 flex h-full flex-col px-6 pt-8 md:px-12 md:pt-12 lg:px-7 lg:pt-8 ${
                    featured ? 'pb-20' : 'pb-8 md:pb-12 lg:pb-8'
                  }`}
                >
                  <h3 className="service-card-title text-center text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.15] font-medium tracking-[0.08em] uppercase md:text-[2rem] lg:text-[clamp(1.25rem,2.2vw,2rem)]">
                    {titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  <p className="mt-3 text-center text-[clamp(2rem,3.4vw,3.25rem)] leading-none font-bold tracking-tight whitespace-nowrap md:text-[clamp(2.5rem,4.5vw,3.75rem)] lg:text-[clamp(2rem,3.4vw,3.25rem)]">
                    {price}
                  </p>

                  <p
                    className={`mt-4 text-center text-[clamp(0.875rem,1.05vw,1rem)] leading-relaxed text-balance italic md:text-base lg:text-[clamp(0.875rem,1.05vw,1rem)] ${
                      featured ? 'text-white/85' : 'text-black/80'
                    }`}
                  >
                    {description}
                  </p>

                  <ul
                    className={`mt-6 list-disc space-y-2.5 pl-5 text-left text-[clamp(0.875rem,1.05vw,1rem)] leading-snug md:text-base lg:text-[clamp(0.875rem,1.05vw,1rem)] ${
                      featured ? 'text-white' : 'text-black'
                    }`}
                  >
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-12 text-center text-[clamp(1rem,1.5vw,1.5rem)] text-black/70">
          {t('services.footnote')}
        </p>
      </div>
    </Section>
  )
}
