'use client'

import { useState } from 'react'

export const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' }
  ]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // TODO: Implement language switching logic
  }

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-transparent text-header-text border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
