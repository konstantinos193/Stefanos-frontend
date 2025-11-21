'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { useLanguage } from '@/lib/contexts/LanguageContext'

export const LanguageSwitcher = () => {
  const { language: currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: Array<{ code: 'en' | 'el'; name: string; flagClass: string }> = [
    { code: 'en', name: 'English', flagClass: 'fi fi-us' },
    { code: 'el', name: 'Ελληνικά', flagClass: 'fi fi-gr' }
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (langCode: 'en' | 'el') => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center space-x-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black',
          isOpen
            ? 'bg-accent-blue shadow-lg text-white'
            : 'bg-gray-800 hover:bg-gray-700 shadow-md hover:shadow-lg border border-gray-700 text-white'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className={`${currentLang.flagClass} text-xl`}></span>
        <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
        <svg
          className={clsx(
            'w-5 h-5 transition-transform duration-200',
            isOpen && 'rotate-180',
            isOpen ? 'text-white' : 'text-gray-300'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl py-2 z-[110] min-w-[160px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={clsx(
                  'w-full text-left px-4 py-2.5 text-sm flex items-center space-x-3 transition-colors duration-200 rounded-md mx-1',
                  currentLanguage === lang.code
                    ? 'bg-accent-blue text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <span className={`${lang.flagClass} text-xl`}></span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
