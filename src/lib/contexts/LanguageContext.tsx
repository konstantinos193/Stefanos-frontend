'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Language = 'en' | 'el'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ 
  children, 
  initialLanguage 
}: { 
  children: ReactNode
  initialLanguage?: Language
}) => {
  // Prioritize initialLanguage from URL over localStorage
  const getInitialLanguage = (): Language => {
    if (initialLanguage) {
      return initialLanguage
    }
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'el')) {
      return savedLanguage
    }
    return 'en'
  }
  
  const [language, setLanguageState] = useState<Language>(getInitialLanguage())

  useEffect(() => {
    if (initialLanguage) {
      setLanguageState(initialLanguage)
      localStorage.setItem('language', initialLanguage)
    }
  }, [initialLanguage])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update URL to reflect language change using Next.js router (no full page reload)
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const pathWithoutLang = currentPath.replace(/^\/(en|el)/, '') || '/'
      window.history.pushState({}, '', `/${lang}${pathWithoutLang}`)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

