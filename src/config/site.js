export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL
  if (configured) return configured.replace(/\/$/, '')

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return ''
}

export function absoluteUrl(path) {
  const base = getSiteUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath
}
