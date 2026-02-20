'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = useTranslation()
  const [rentOpen, setRentOpen] = useState(false)

  const navigationItems = [
    { id: 'services', labelKey: 'navigation.services', href: '/services' },
    { id: 'about', labelKey: 'navigation.about', href: '/about' }
  ]

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          'lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-black border-t border-gray-800 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1 bg-gray-700 rounded-full" />
        </div>

        <div className="px-4 pt-2 pb-6 space-y-1 max-h-[calc(90vh-60px)] overflow-y-auto overscroll-contain">
          {/* Home */}
          <Link
            href={`/${language}/`}
            onClick={onClose}
            className={clsx(
              'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 active:scale-[0.98]',
              pathname === `/${language}` || pathname === `/${language}/`
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 active:bg-gray-900 active:text-white'
            )}
          >
            {t('navigation.home')}
          </Link>

          {/* Ενοικίαση ακινήτων – expandable (Short-term / Long-term) */}
          <div className="rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setRentOpen(!rentOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-300 active:bg-gray-900 active:text-white transition-all duration-200 text-left"
            >
              {t('navigation.rent')}
              <svg
                className={clsx('w-5 h-5 shrink-0 transition-transform', rentOpen && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {rentOpen && (
              <div className="pl-4 pb-2 border-l-2 border-gray-700 ml-2 space-y-0.5">
                <Link
                  href={`/${language}/results?mode=rent&rentalType=short-term`}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg active:bg-gray-800/50"
                >
                  {t('navigation.rentShortTerm')}
                </Link>
                <Link
                  href={`/${language}/results?mode=rent&rentalType=long-term`}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-sm text-gray-400 hover:text-white rounded-lg active:bg-gray-800/50"
                >
                  {t('navigation.rentLongTerm')}
                </Link>
              </div>
            )}
          </div>

          {navigationItems.map((item) => {
            const href = `/${language}${item.href}`
            const isActive = pathname === href || pathname?.startsWith(`/${language}${item.href}`)
            return (
              <Link
                key={item.id}
                href={href}
                onClick={onClose}
                className={clsx(
                  'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 active:scale-[0.98]',
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 active:bg-gray-900 active:text-white'
                )}
              >
                {t(item.labelKey)}
              </Link>
            )
          })}

          {/* Incanto Hotel link */}
          <a
            href="https://incanto-hotel.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-gray-900/90 border border-gray-600 text-white hover:bg-gray-800 hover:border-accent-gold hover:text-accent-gold transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            <Image
              src="/incanto-logo.png"
              alt="Incanto Hotel"
              width={22}
              height={22}
              className="rounded-sm object-contain"
              unoptimized
            />
            Incanto Hotel
          </a>

          <div className="pt-4 mt-2 border-t border-gray-800">
            {/* Mobile menu footer content can go here if needed */}
          </div>
        </div>
      </div>
    </>
  )
}
