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
      id: 'home',
      label: { el: 'Αρχική', en: 'Home' },
      path: '/'
    },
    {
      id: 'properties',
      label: { el: 'Ακίνητα', en: 'Properties' },
      path: '/properties'
    },
    {
      id: 'bookings',
      label: { el: 'Κρατήσεις', en: 'Bookings' },
      path: '/bookings'
    },
    {
      id: 'incanto',
      label: { el: "L' INCANTO", en: "L' INCANTO" },
      path: '/incanto'
    },
    {
      id: 'services',
      label: { el: 'Υπηρεσίες', en: 'Services' },
      path: '/services'
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
              'focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-black',
              isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-accent-gold'
            )}
          >
            {item.label[language]}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
