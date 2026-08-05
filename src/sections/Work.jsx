import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import WorkCarousel from '../components/work/WorkCarousel'
import { workCategories } from '../data/projects'

export default function Work() {
  const { t } = useTranslation()

  return (
    <Section id="work" className="scroll-mt-8 overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-6 md:justify-end md:px-12 lg:px-16">
        <h2 className="work-title font-display text-[clamp(2.5rem,8vw,6rem)] leading-none whitespace-normal text-center md:whitespace-nowrap md:text-right">
          {t('work.title')}
        </h2>
      </div>

      <div className="mt-12 flex flex-col gap-16 md:mt-16 md:gap-20 lg:gap-24">
        {workCategories.map((category) => (
          <WorkCarousel
            key={category.id}
            categoryId={category.id}
            items={category.items}
            scrollRight={category.scrollRight}
          />
        ))}
      </div>
    </Section>
  )
}
