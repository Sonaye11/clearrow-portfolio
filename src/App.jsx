import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import i18n, {
  defaultLanguage,
  isSupportedLanguage,
  updateDocumentLanguage,
} from './i18n'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Contact from './sections/Contact'

function App() {
  const { lang } = useParams()

  useEffect(() => {
    if (!isSupportedLanguage(lang)) return

    const syncLanguage = async () => {
      await i18n.changeLanguage(lang)
      updateDocumentLanguage(lang)
    }

    syncLanguage()
  }, [lang])

  if (!isSupportedLanguage(lang)) {
    return <Navigate to={`/${defaultLanguage}`} replace />
  }

  return (
    <main className="w-full">
      <Hero />
      <About />
      <Work />
      <Skills />
      <Services />
      <Contact />
    </main>
  )
}

export default App
