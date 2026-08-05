import { useTranslation } from 'react-i18next'

export default function CompetenceCard({ cardKey, image }) {
  const { t } = useTranslation()

  const title = t(`skills.cards.${cardKey}.title`)
  const description = t(`skills.cards.${cardKey}.description`, {
    returnObjects: true,
  })
  const alt = t(`skills.cards.${cardKey}.alt`)
  const lines = Array.isArray(description) ? description : [description]

  return (
    <article className="flex w-full max-w-[300px] flex-col items-center text-center md:max-w-[360px] md:items-start md:text-left lg:max-w-[440px] xl:max-w-[520px]">
      <div className="flex h-[120px] w-full items-end justify-center md:h-[150px] md:justify-start lg:h-[260px] xl:h-[320px]">
        <img
          src={image}
          alt={alt}
          className="h-full w-full max-w-[280px] object-contain object-center md:max-w-none md:object-left"
        />
      </div>

      <h3 className="mt-4 text-base leading-normal font-normal text-white md:mt-5 md:text-xl lg:mt-6 lg:text-[1.75rem] xl:mt-8 xl:text-[2rem]">
        {title}
      </h3>

      <div className="mt-1 text-sm leading-normal text-muted md:mt-2 md:text-base lg:text-lg xl:mt-3 xl:text-[1.75rem]">
        <p>{lines.join(' ')}</p>
      </div>
    </article>
  )
}
