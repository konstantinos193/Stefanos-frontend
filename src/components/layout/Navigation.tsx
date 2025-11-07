interface NavigationProps {
  className?: string
}

export const Navigation = ({ className = '' }: NavigationProps) => {
  const navigationItems = [
    {
      id: 'home',
      label: { gr: 'Αρχική', en: 'Home' },
      href: '/'
    },
    {
      id: 'editions',
      label: { gr: '20 Εκδόσεις', en: '20 Editions' },
      href: '/editions'
    },
    {
      id: 'services',
      label: { gr: 'Εξυπηρετήσεις', en: 'Services' },
      href: '/services'
    },
    {
      id: 'properties',
      label: { gr: 'Ακίνητα', en: 'Properties' },
      href: '/properties'
    },
    {
      id: 'booking',
      label: { gr: 'Κράτηση', en: 'Booking' },
      href: '/booking'
    },
    {
      id: 'about',
      label: { gr: 'Σχετικά', en: 'About' },
      href: '/about'
    }
  ]

  return (
    <nav className={`flex space-x-8 ${className}`}>
      {navigationItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="text-header-text hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          {item.label.en}
        </a>
      ))}
    </nav>
  )
}
