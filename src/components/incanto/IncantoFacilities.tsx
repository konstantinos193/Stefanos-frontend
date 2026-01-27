'use client'

import { clsx } from 'clsx'
import { BriefcaseIcon, ClockIcon } from '@/components/icons'
import styles from './IncantoFacilities.module.css'

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

const KitchenIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 12h20" />
    <path d="M8 4v4M16 4v4" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="12" cy="16" r="1" />
    <circle cx="17" cy="16" r="1" />
    <path d="M6 8h2M10 8h2M14 8h2" />
  </svg>
)

const facilities = [
  {
    category: 'accommodation',
    items: [
      { Icon: BedIcon, name: { el: 'Ανετα Δωμάτια', en: 'Comfortable Rooms' } },
      { Icon: BathIcon, name: { el: 'Πλήρως Εξοπλισμένα Μπάνια', en: 'Fully Equipped Bathrooms' } },
      { Icon: KitchenIcon, name: { el: 'Πλήρως Εξοπλισμένα Δωμάτια με Κουζίνα', en: 'Fully Furnished Rooms with Kitchen' } },
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
    <section className={styles.section}>
      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.backgroundOrb1} />
        <div className={styles.backgroundOrb2} />
        <div className={styles.backgroundOrb3} />
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeText}>
              {lang === 'el' ? 'Πολυτέλεια' : 'Luxury'}
            </span>
          </div>
          <div className={styles.decorativeLine}>
            <div className={styles.line} />
            <div className={styles.lineAccent} />
          </div>
          <h2 className={styles.title}>
            <span className={styles.titleMain}>
              {lang === 'el' ? 'Παροχές & Εγκαταστάσεις' : 'Facilities & Amenities'}
            </span>
          </h2>
          <p className={styles.description}>
            {lang === 'el'
              ? 'Απολαύστε μια πλήρη εμπειρία πολυτέλειας με τις παροχές μας'
              : 'Enjoy a complete luxury experience with our facilities'}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className={styles.categoriesContainer}>
          {facilities.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.category}>
              {/* Category Header */}
              <div className={styles.categoryHeader}>
                <div className={styles.categoryBadge}>
                  <span className={styles.categoryNumber}>
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.categoryTitleWrapper}>
                  <h3 className={styles.categoryTitle}>
                    {getCategoryTitle(category.category)}
                  </h3>
                  <div className={styles.categoryLine} />
                </div>
              </div>

              {/* Items Grid */}
              <div className={styles.itemsGrid}>
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={styles.facilityCard}
                    style={{ animationDelay: `${itemIndex * 0.05}s` }}
                  >
                    {/* Animated border gradient */}
                    <div className={styles.cardBorder} />
                    
                    {/* Glassmorphism background */}
                    <div className={styles.cardBackground} />
                    
                    {/* Hover gradient overlay */}
                    <div className={styles.hoverOverlay} />
                    
                    {/* Hover glow effect */}
                    <div className={styles.hoverGlow} />

                    {/* Shine effect */}
                    <div className={styles.shineEffect} />

                    {/* Content */}
                    <div className={styles.cardContent}>
                      {/* Icon Container */}
                      <div className={styles.iconContainer}>
                        <div className={styles.iconBackground} />
                        <div className={styles.iconGlow} />
                        <item.Icon className={styles.icon} size={32} />
                      </div>
                      
                      {/* Text */}
                      <div className={styles.textContainer}>
                        <p className={styles.facilityName}>
                          {lang === 'el' ? item.name.el : item.name.en}
                        </p>
                        <div className={styles.facilityUnderline} />
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

