'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { clsx } from 'clsx'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface NavigationProps {
  className?: string
}

export const Navigation = ({ className = '' }: NavigationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = useTranslation()
  const [rentOpen, setRentOpen] = useState(false)
  const rentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rentRef.current && !rentRef.current.contains(e.target as Node)) {
        setRentOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const mode = searchParams?.get('mode')
  const isRentActive = pathname?.includes('/results') && mode === 'rent'

  const linkClass = (isActive: boolean) =>
    clsx(
      'relative px-4 py-2 text-sm font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-black',
      isActive ? 'text-white' : 'text-gray-400 hover:text-accent-gold'
    )

  const buttonClass = (isActive: boolean) =>
    clsx(
      'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-black',
      isActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-accent-gold hover:bg-gray-800/70'
    )

  return (
    <nav className={clsx('flex items-center justify-center space-x-2', className)}>
      {/* Ενοικίαση ακινήτων – button with dropdown (Short-term / Long-term) */}
      <div className="relative" ref={rentRef}>
        <button
          type="button"
          onClick={() => setRentOpen(!rentOpen)}
          className={clsx(
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-black',
            isRentActive ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-accent-gold hover:bg-gray-800/70'
          )}
          aria-expanded={rentOpen}
          aria-haspopup="true"
        >
          {t('navigation.rent')}
          <svg
            className={clsx('w-4 h-4 transition-transform', rentOpen && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isRentActive && !rentOpen && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full" />
        )}
        {rentOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              aria-hidden="true"
              onClick={() => setRentOpen(false)}
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 pt-1 z-20 min-w-[180px]">
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2">
                <Link
                  href={`/${language}/results?mode=rent&rentalType=short-term`}
                  onClick={() => setRentOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors first:rounded-t-lg"
                >
                  {t('navigation.rentShortTerm')}
                </Link>
                <Link
                  href={`/${language}/results?mode=rent&rentalType=long-term`}
                  onClick={() => setRentOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors last:rounded-b-lg"
                >
                  {t('navigation.rentLongTerm')}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Services */}
      <Link
        href={`/${language}/services`}
        className={linkClass(pathname?.startsWith(`/${language}/services`) ?? false)}
      >
        {t('navigation.services')}
        {pathname?.startsWith(`/${language}/services`) && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full" />
        )}
      </Link>
    </nav>
  )
}
