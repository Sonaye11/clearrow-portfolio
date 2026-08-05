import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'
import CompetenceCard from '../components/skills/CompetenceCard'
import { competences } from '../data/skills'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <Section id="competence" className="scroll-mt-8 bg-black py-16 text-white md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h2 className="skills-title text-center font-display text-[clamp(1.375rem,4.5vw,1.75rem)] leading-none md:text-left md:text-[clamp(2rem,4.5vw,3rem)] xl:text-[4.5rem]">
          {t('skills.title')}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-14 md:mt-14 md:grid-cols-2 md:gap-x-6 md:gap-y-20 lg:mt-16 lg:gap-y-24 xl:gap-y-28">
          {competences.map((competence, index) => (
            <div
              key={competence.id}
              className={`flex w-full ${
                index % 2 === 0
                  ? 'justify-center md:justify-start'
                  : 'justify-center md:justify-end'
              }`}
            >
              <CompetenceCard
                cardKey={competence.cardKey}
                image={competence.image}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
