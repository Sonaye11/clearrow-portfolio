import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import Navbar from '../components/layout/Navbar'
import butterflyImg from '../assets/hero/butterfly.webp'
import helmetImg from '../assets/hero/helmet.webp'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <Section id="hero" className="scroll-mt-0 bg-black text-white">
      <div className="relative mx-auto w-full max-w-[1440px]">
        <Navbar />

        <div className="relative min-h-[480px] md:min-h-[560px] lg:min-h-[680px]">
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            aria-hidden="true"
          >
            <img
              src={helmetImg}
              alt=""
              className="absolute top-[48px] right-[64px] z-0 h-[280px] w-[268px] object-cover"
            />
            <img
              src={butterflyImg}
              alt=""
              className="absolute bottom-4 left-[63px] z-0 h-[240px] w-[305px] object-cover"
            />
          </div>

          <img
            src={helmetImg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 hidden h-[280px] w-[268px] -translate-x-1/2 -translate-y-1/2 object-cover opacity-85 md:block lg:hidden"
          />

          <div className="relative z-10 flex flex-col items-center px-6 pt-10 pb-6 text-center md:absolute md:inset-0 md:justify-center md:px-16 md:pt-0 md:pb-0 lg:px-[63px]">
            <h1 className="hero-headline relative z-10 w-full max-w-[1130px] text-[clamp(1.125rem,4.2vw,6rem)] leading-normal font-normal whitespace-normal md:whitespace-nowrap">
              {t('hero.headline')}
            </h1>

            <p className="relative z-10 mt-4 max-w-[717px] text-[clamp(1rem,2vw,2rem)] leading-normal text-muted md:mt-6">
              {t('hero.subheadline')}
            </p>

            <a
              href="#contact"
              className="relative z-10 mt-6 inline-flex h-[61px] min-w-[238px] items-center justify-center border-2 border-transparent bg-white px-8 text-[clamp(1.125rem,2vw,2rem)] text-accent transition-colors hover:border-secondary hover:bg-transparent hover:text-secondary md:mt-8"
            >
              {t('hero.cta')}
            </a>

            <img
              src={helmetImg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none relative z-10 mt-12 h-[158px] w-[151px] object-cover md:hidden"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-2 md:py-3 lg:py-4">
        <p className="text-center font-display text-[clamp(1.125rem,4.8vw,1.75rem)] leading-none whitespace-nowrap sm:text-[clamp(1.5rem,5.5vw,2.25rem)] md:text-[clamp(2rem,6vw,3.5rem)] lg:text-[clamp(2.5rem,7vw,4rem)] xl:text-[112px]">
          {t('hero.brandMark')}
        </p>
      </div>
    </Section>
  )
}
