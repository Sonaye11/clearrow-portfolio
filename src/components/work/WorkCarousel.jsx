import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function WorkCarousel({
  categoryId,
  items,
  scrollRight = false,
}) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)
  const [paused, setPaused] = useState(false)

  const localizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        alt: t(`work.items.${item.itemId}.alt`),
      })),
    [items, t],
  )

  const duration = useMemo(
    () => `${Math.max(localizedItems.length * 12, 24)}s`,
    [localizedItems.length],
  )

  const trackItems = useMemo(
    () => [...localizedItems, ...localizedItems],
    [localizedItems],
  )

  const title = t(`work.categories.${categoryId}.title`)
  const meta = t(`work.categories.${categoryId}.meta`)

  const openLightbox = (item) => {
    setSelected(item)
    setPaused(true)
  }

  const closeLightbox = () => {
    setSelected(null)
    setPaused(false)
  }

  useEffect(() => {
    if (!selected) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelected(null)
        setPaused(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  if (localizedItems.length === 0) return null

  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <div
          className={`flex w-max gap-5 ${scrollRight ? 'carousel-track-right' : 'carousel-track-left'} ${paused ? 'carousel-paused' : ''}`}
          style={{ '--carousel-duration': duration }}
        >
          {trackItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              className="block shrink-0 cursor-zoom-in border-0 bg-transparent p-0"
              onClick={() => openLightbox(item)}
              aria-label={t('work.viewImage', { alt: item.alt })}
            >
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                className="h-[220px] w-[294px] object-cover sm:h-[300px] sm:w-[400px] md:h-[400px] md:w-[533px] lg:h-[525px] lg:w-[700px]"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 px-6 text-base sm:px-12 sm:text-lg md:px-12 md:text-xl lg:px-16 lg:text-[2rem]">
        <p className="max-w-[60%] text-left">{title}</p>
        <p className="shrink-0 text-right">{meta}</p>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={selected.alt}
          onClick={closeLightbox}
        >
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[90vh] max-w-[min(1200px,95vw)] scale-100 object-contain shadow-2xl transition-transform duration-300"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
