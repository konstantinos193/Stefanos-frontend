'use client'

import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useMemo, useState, useEffect } from 'react'

type Messages = typeof import('@/messages/en.json')

let messagesCache: { en?: Messages; el?: Messages } = {}

// Preload messages synchronously if possible
const loadMessages = async (lang: 'en' | 'el'): Promise<Messages> => {
  if (messagesCache[lang]) {
    return messagesCache[lang]!
  }
  
  const module = await import(`@/messages/${lang}.json`)
  messagesCache[lang] = module.default
  return module.default
}

export const useTranslation = () => {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Messages | null>(null)

  useEffect(() => {
    const load = async () => {
      // Always reload messages when language changes to ensure correct language
      const loaded = await loadMessages(language as 'en' | 'el')
      setMessages(loaded)
    }
    load()
  }, [language])

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      // Hardcoded fallbacks for critical translations
      const fallbacks: Record<string, Record<string, string>> = {
        'features.subtitle': {
          en: 'Reliable services with modern technology',
          el: 'Αξιόπιστες υπηρεσίες με σύγχρονη τεχνολογία'
        },
        'features.title': {
          en: 'Why Choose Us?',
          el: 'Γιατί να μας επιλέξετε;'
        }
      }

      if (!messages) {
        // Use fallback if available
        if (fallbacks[key] && fallbacks[key][language]) {
          return fallbacks[key][language]
        }
        return key
      }

      const keys = key.split('.')
      let value: any = messages

      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) {
          // Use fallback if available
          if (fallbacks[key] && fallbacks[key][language]) {
            return fallbacks[key][language]
          }
          return key
        }
      }

      // Replace params if provided
      if (params && typeof value === 'string') {
        return Object.entries(params).reduce(
          (str, [paramKey, paramValue]) =>
            str.replace(`{${paramKey}}`, String(paramValue)),
          value
        )
      }

      return value || (fallbacks[key] && fallbacks[key][language]) || key
    }
  }, [messages, language])

  return t
}

