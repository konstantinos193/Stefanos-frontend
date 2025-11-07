interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null

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
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="text-header-text hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            onClick={onClose}
          >
            {item.label.en}
          </a>
        ))}
      </div>
    </div>
  )
}
