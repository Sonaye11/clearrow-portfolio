import { Navigate } from 'react-router-dom'
import { detectPreferredLanguage } from './index'

export default function LanguageRedirect() {
  return <Navigate to={`/${detectPreferredLanguage()}`} replace />
}
