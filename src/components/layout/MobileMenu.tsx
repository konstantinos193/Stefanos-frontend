'use client'

import Link from 'next/link'
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

  const navigationItems = [
    {
      id: 'editions',
      label: { el: '20 Εκδόσεις', en: '20 Editions' },
      href: '/editions'
    },
    {
      id: 'services',
      label: { el: 'Εξυπηρετήσεις', en: 'Services' },
      href: '/services'
    },
    {
      id: 'properties',
      label: { el: 'Ακίνητα', en: 'Properties' },
      href: '/properties'
    },
    {
      id: 'booking',
      label: { el: 'Κράτηση', en: 'Booking' },
      href: '/booking'
    },
    {
      id: 'incanto',
      label: { el: "L' INCANTO", en: "L' INCANTO" },
      href: '/incanto'
    },
    {
      id: 'about',
      label: { el: 'Σχετικά', en: 'About' },
      href: '/about'
    }
  ]

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet Menu */}
      <div
        className={clsx(
          'lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-black border-t border-gray-800 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          maxHeight: '90vh'
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing" onClick={onClose}>
          <div className="w-12 h-1 bg-gray-700 rounded-full" />
        </div>

        <div className="px-4 pt-2 pb-6 space-y-1 max-h-[calc(90vh-60px)] overflow-y-auto overscroll-contain">
          {navigationItems.map((item) => {
            const href = `/${language}${item.href}`
            const isActive = pathname === href || 
              (item.href !== '/' && pathname?.startsWith(`/${language}${item.href}`))
            
            return (
              <Link
                key={item.id}
                href={href}
                onClick={onClose}
                className={clsx(
                  'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 active:scale-[0.98]',
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 active:bg-gray-900 active:text-white'
                )}
              >
                {item.label[language]}
              </Link>
            )
          })}
          
          <div className="pt-4 mt-2 border-t border-gray-800">
            <div className="sm:hidden space-y-2">
              <Link
                href={`/${language}/auth/login`}
                onClick={onClose}
                className="block w-full px-4 py-3.5 rounded-lg text-base font-medium text-header-text active:text-white active:bg-gray-900 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black min-h-[44px] flex items-center justify-center active:scale-[0.98]"
              >
                {t('auth.login')}
              </Link>
              <Link
                href={`/${language}/auth/register`}
                onClick={onClose}
                className="block w-full px-4 py-3.5 rounded-lg text-base font-medium bg-accent-blue active:bg-blue-600 text-white transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black shadow-md active:shadow-lg min-h-[44px] flex items-center justify-center active:scale-[0.98]"
              >
                {t('auth.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
