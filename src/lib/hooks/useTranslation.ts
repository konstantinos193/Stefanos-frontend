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
  const [messages, setMessages] = useState<Messages | null>(messagesCache[language] || null)

  useEffect(() => {
    if (!messagesCache[language]) {
      loadMessages(language as 'en' | 'el').then(setMessages)
    } else {
      setMessages(messagesCache[language]!)
    }
  }, [language])

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string | number>) => {
      if (!messages) {
        return key
      }

      const keys = key.split('.')
      let value: any = messages

      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) {
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

      return value || key
    }
  }, [messages])

  return t
}

