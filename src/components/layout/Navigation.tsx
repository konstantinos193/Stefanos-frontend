'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { useLanguage } from '@/lib/contexts/LanguageContext'

interface NavigationProps {
  className?: string
}

export const Navigation = ({ className = '' }: NavigationProps) => {
  const pathname = usePathname()
  const { language } = useLanguage()
  
  const navigationItems = [
    {
      id: 'editions',
      label: { el: '20 Εκδόσεις', en: '20 Editions' },
      path: '/editions'
    },
    {
      id: 'services',
      label: { el: 'Εξυπηρετήσεις', en: 'Services' },
      path: '/services'
    },
    {
      id: 'properties',
      label: { el: 'Ακίνητα', en: 'Properties' },
      path: '/properties'
    },
    {
      id: 'booking',
      label: { el: 'Κράτηση', en: 'Booking' },
      path: '/booking'
    },
    {
      id: 'about',
      label: { el: 'Σχετικά', en: 'About' },
      path: '/about'
    }
  ]

  return (
    <nav className={clsx('flex items-center justify-center space-x-2', className)}>
      {navigationItems.map((item) => {
        const href = `/${language}${item.path}`
        const isActive = pathname === href || 
          (item.path !== '/' && pathname?.startsWith(`/${language}${item.path}`))
        
        return (
          <Link
            key={item.id}
            href={href}
            className={clsx(
              'relative px-4 py-2 text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black',
              isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {item.label[language]}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
