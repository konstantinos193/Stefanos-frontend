'use client'

import { clsx } from 'clsx'
import { BriefcaseIcon, ClockIcon } from '@/components/icons'

type IncantoFacilitiesProps = {
  lang: string
}

// Icon components for facilities
const BedIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 7v10M2 7h20M2 17h20M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
    <path d="M22 17v-3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3" />
  </svg>
)

const BathIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="7" width="16" height="12" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
)

const WindowIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M12 4v16M2 12h20" />
  </svg>
)

const BalconyIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="10" width="18" height="12" />
    <path d="M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
    <path d="M7 14h2M15 14h2" />
  </svg>
)

const PoolIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="6" />
    <path d="M2 12h20" />
    <path d="M7 8a4 4 0 0 1 4 4M13 8a4 4 0 0 0-4 4" />
  </svg>
)

const RestaurantIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3v0" />
    <path d="M21 15v7" />
  </svg>
)

const BarIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 21h8" />
    <path d="M12 21v-8" />
    <path d="M8 13V8a4 4 0 0 1 8 0v5" />
    <path d="M6 4h12" />
  </svg>
)

const ParkingIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h4M7 12h4M7 16h4" />
    <path d="M15 8h2M15 12h2M15 16h2" />
  </svg>
)

const FitnessIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v10" />
    <path d="M8 17l4-4 4 4" />
    <path d="M8 7l4 4 4-4" />
  </svg>
)

const CleaningIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4" />
    <path d="M4 12h4M16 12h4" />
    <path d="M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83" />
    <path d="M17.66 6.34l-2.83 2.83M9.17 14.83l-2.83 2.83" />
  </svg>
)

const WifiIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
)

const ConciergeIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const Service24Icon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const AirportIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const LaundryIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h12M6 12h12M6 16h8" />
  </svg>
)

const facilities = [
  {
    category: 'accommodation',
    items: [
      { Icon: BedIcon, name: { el: 'Ανετα Δωμάτια', en: 'Comfortable Rooms' } },
      { Icon: BathIcon, name: { el: 'Πλήρως Εξοπλισμένα Μπάνια', en: 'Fully Equipped Bathrooms' } },
      { Icon: WindowIcon, name: { el: 'Θέα στη Θάλασσα', en: 'Sea View' } },
      { Icon: BalconyIcon, name: { el: 'Μπαλκόνια', en: 'Balconies' } }
    ]
  },
  {
    category: 'amenities',
    items: [
      { Icon: PoolIcon, name: { el: 'Πισίνα', en: 'Swimming Pool' } },
      { Icon: RestaurantIcon, name: { el: 'Εστιατόριο', en: 'Restaurant' } },
      { Icon: BarIcon, name: { el: 'Μπαρ', en: 'Bar' } },
      { Icon: ParkingIcon, name: { el: 'Χώρος Στάθμευσης', en: 'Parking' } },
      { Icon: BriefcaseIcon, name: { el: 'Business Center', en: 'Business Center' } },
      { Icon: FitnessIcon, name: { el: 'Γυμναστήριο', en: 'Fitness Center' } }
    ]
  },
  {
    category: 'services',
    items: [
      { Icon: CleaningIcon, name: { el: 'Καθημερινός Καθαρισμός', en: 'Daily Housekeeping' } },
      { Icon: WifiIcon, name: { el: 'Δωρεάν WiFi', en: 'Free WiFi' } },
      { Icon: ConciergeIcon, name: { el: 'Υπηρεσία Concierge', en: 'Concierge Service' } },
      { Icon: Service24Icon, name: { el: '24/7 Υπηρεσία', en: '24/7 Service' } },
      { Icon: AirportIcon, name: { el: 'Μεταφορά Αεροδρομίου', en: 'Airport Transfer' } },
      { Icon: LaundryIcon, name: { el: 'Υπηρεσία Πλυντηρίου', en: 'Laundry Service' } }
    ]
  }
]

export function IncantoFacilities({ lang }: IncantoFacilitiesProps) {
  const getCategoryTitle = (category: string) => {
    if (lang === 'el') {
      return category === 'accommodation' ? 'Διαμονή' : category === 'amenities' ? 'Παροχές' : 'Υπηρεσίες'
    }
    return category === 'accommodation' ? 'Accommodation' : category === 'amenities' ? 'Amenities' : 'Services'
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#d4af37] to-[#b8941f] mx-auto rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {lang === 'el' ? 'Παροχές & Εγκαταστάσεις' : 'Facilities & Amenities'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {lang === 'el'
              ? 'Απολαύστε μια πλήρη εμπειρία πολυτέλειας με τις παροχές μας'
              : 'Enjoy a complete luxury experience with our facilities'}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="space-y-16 md:space-y-20">
          {facilities.map((category, categoryIndex) => (
            <div key={categoryIndex} className="group">
              {/* Category Header */}
              <div className="mb-8 md:mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {getCategoryTitle(category.category)}
                </h3>
                <div className="h-0.5 w-24 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={clsx(
                      'group/item relative p-6 bg-white rounded-2xl',
                      'border-2 border-gray-100',
                      'shadow-sm hover:shadow-xl',
                      'transition-all duration-300',
                      'hover:scale-[1.02] hover:-translate-y-1',
                      'hover:border-[#d4af37]/40',
                      'overflow-hidden'
                    )}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover glow effect */}
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-5">
                      {/* Icon Container */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-[#b8941f]/5 flex items-center justify-center text-[#d4af37] group-hover/item:scale-110 group-hover/item:bg-gradient-to-br group-hover/item:from-[#d4af37]/20 group-hover/item:to-[#b8941f]/10 transition-all duration-300">
                        <item.Icon className="w-7 h-7" size={28} />
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-semibold text-base md:text-lg leading-tight group-hover/item:text-[#d4af37] transition-colors duration-300">
                          {lang === 'el' ? item.name.el : item.name.en}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

