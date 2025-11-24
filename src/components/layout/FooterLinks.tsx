import Image from 'next/image'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const FooterLinks = () => {
  const t = useTranslation()
  const linkSections = [
    {
      titleKey: 'footer.sections.company',
      links: [
        { labelKey: 'footer.links.aboutUs', href: '/about' },
        { labelKey: 'footer.links.ourTeam', href: '/team' },
        { labelKey: 'footer.links.careers', href: '/careers' },
        { labelKey: 'footer.links.contact', href: '/contact' }
      ]
    },
    {
      titleKey: 'footer.sections.services',
      links: [
        { labelKey: 'footer.links.propertyManagement', href: '/services/property-management' },
        { labelKey: 'footer.links.bookingPlatform', href: '/services/booking' },
        { labelKey: 'footer.links.realEstate', href: '/services/real-estate' },
        { labelKey: 'footer.links.maintenance', href: '/services/maintenance' }
      ]
    },
    {
      titleKey: 'footer.sections.support',
      links: [
        { labelKey: 'footer.links.helpCenter', href: '/help' },
        { labelKey: 'footer.links.faq', href: '/faq' },
        { labelKey: 'footer.links.termsOfService', href: '/terms' },
        { labelKey: 'footer.links.privacyPolicy', href: '/privacy' }
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
            {t(section.titleKey)}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-accent-blue transition-colors duration-200"
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
