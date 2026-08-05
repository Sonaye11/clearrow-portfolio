import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import es from '../locales/es.json'

export const supportedLanguages = ['en', 'fr', 'es']
export const defaultLanguage = 'en'

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

export function isSupportedLanguage(lang) {
  return supportedLanguages.includes(lang)
}

export function detectPreferredLanguage() {
  const stored = localStorage.getItem('preferredLanguage')
  if (stored && isSupportedLanguage(stored)) return stored

  const browserLang = navigator.language.split('-')[0]
  if (isSupportedLanguage(browserLang)) return browserLang

  return defaultLanguage
}

export function updateDocumentLanguage(lang) {
  document.documentElement.lang = lang
  document.title = i18n.t('meta.title')

  const description = i18n.t('meta.description')
  const imageUrl = `${window.location.origin}/og-image.jpg`

  setMetaContent('name', 'description', description)
  setMetaContent('property', 'og:title', i18n.t('meta.title'))
  setMetaContent('property', 'og:description', description)
  setMetaContent('property', 'og:image', imageUrl)
  setMetaContent('property', 'og:url', window.location.href)
  setMetaContent('name', 'twitter:title', i18n.t('meta.title'))
  setMetaContent('name', 'twitter:description', description)
  setMetaContent('name', 'twitter:image', imageUrl)
}

function setMetaContent(attrName, attrValue, content) {
  const selector = `meta[${attrName}="${attrValue}"]`
  const meta = document.querySelector(selector)
  if (meta) meta.setAttribute('content', content)
}
