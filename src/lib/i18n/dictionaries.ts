import 'server-only'

type Locale = 'en' | 'el'

const dictionaries = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  el: () => import('@/messages/el.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}

// Optional: Fetch from backend API
export const getDictionaryFromBackend = async (locale: Locale) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const response = await fetch(`${apiUrl}/api/translations/${locale}`, {
      cache: 'force-cache', // Cache translations
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      // Fallback to local JSON if API fails
      return dictionaries[locale]()
    }
    
    return await response.json()
  } catch (error) {
    // Fallback to local JSON if API fails
    console.error('Failed to fetch translations from backend:', error)
    return dictionaries[locale]()
  }
}

