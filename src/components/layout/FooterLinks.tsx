import Image from 'next/image'

export const FooterLinks = () => {
  const linkSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Property Management', href: '/services/property-management' },
        { label: 'Booking Platform', href: '/services/booking' },
        { label: 'Real Estate', href: '/services/real-estate' },
        { label: 'Maintenance', href: '/services/maintenance' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* STEFANOS MALESKOS Real Estate Logo */}
      <div className="mb-6">
        <Image
          src="/logoetc.png"
          alt="STEFANOS MALESKOS Real Estate"
          width={200}
          height={80}
          className="h-auto w-auto max-w-[180px] object-contain"
          unoptimized
        />
      </div>
      
      {linkSections.map((section, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-accent-blue transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
