import 'server-only'

export type Locale = 'en' | 'el'

const SUPPORTED_LOCALES: Locale[] = ['en', 'el']
const DEFAULT_LOCALE: Locale = 'en'

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  el: () => import('@/messages/el.json').then((module) => module.default),
}

const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale)
}

const normalizeLocale = (locale: string): Locale => {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE
}

export const getDictionary = async (locale: string): Promise<any> => {
  const normalizedLocale = normalizeLocale(locale)
  const dictionaryLoader = dictionaries[normalizedLocale]
  
  if (!dictionaryLoader) {
    console.error(`Dictionary loader not found for locale: ${locale}, falling back to ${DEFAULT_LOCALE}`)
    return dictionaries[DEFAULT_LOCALE]()
  }
  
  return dictionaryLoader()
}

// Optional: Fetch from backend API
export const getDictionaryFromBackend = async (locale: string): Promise<any> => {
  const normalizedLocale = normalizeLocale(locale)
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    const response = await fetch(`${apiUrl}/translations/${normalizedLocale}`, {
      cache: 'force-cache', // Cache translations
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      // Fallback to local JSON if API fails
      return getDictionary(normalizedLocale)
    }
    
    return await response.json()
  } catch (error) {
    // Fallback to local JSON if API fails
    console.error('Failed to fetch translations from backend:', error)
    return getDictionary(normalizedLocale)
  }
}

