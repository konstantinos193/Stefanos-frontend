'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import ReactCountryFlag from 'react-country-flag'

export const LanguageSwitcher = () => {
  const { language: currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: Array<{ code: 'en' | 'el'; name: string; flagCode: string }> = [
    { code: 'en', name: 'English', flagCode: 'us' },
    { code: 'el', name: 'Ελληνικά', flagCode: 'gr' }
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
          'flex items-center justify-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black h-8',
          isOpen
            ? 'bg-accent-blue/90 text-white'
            : 'bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 text-gray-200 hover:text-white'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <ReactCountryFlag
          countryCode={currentLang.flagCode.toUpperCase()}
          svg
          style={{
            width: '16px',
            height: '12px',
          }}
          title={currentLang.name}
        />
        <span className="hidden sm:inline text-xs">{currentLang.code.toUpperCase()}</span>
        <svg
          className={clsx(
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180',
            isOpen ? 'text-white' : 'text-gray-400'
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
                <ReactCountryFlag
                  countryCode={lang.flagCode.toUpperCase()}
                  svg
                  style={{
                    width: '24px',
                    height: '18px',
                  }}
                  title={lang.name}
                />
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
