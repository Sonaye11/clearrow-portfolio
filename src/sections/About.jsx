import { useTranslation } from 'react-i18next'
import Section from '../components/layout/Section'

export default function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true })

  return (
    <Section id="about" className="scroll-mt-8 bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[1312px] space-y-8 text-left text-base leading-normal font-normal text-black sm:text-lg md:text-xl lg:text-[1.75rem] xl:text-[2rem]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  )
}
