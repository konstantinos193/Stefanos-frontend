'use client'

import styles from './IncantoFacilities.module.css'

type IncantoFacilitiesProps = {
  lang: string
}

// Icon components for facilities
const WifiIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
)

const ParkingIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </svg>
)

const BeachIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.5 8c0 4.694-2.5 9-5.5 9S6.5 12.694 6.5 8a5.5 5.5 0 0 1 11 0z" />
    <path d="M2 20h20" />
    <path d="M7 20c0-3 2.5-5 5-5s5 2 5 5" />
  </svg>
)

const SatelliteIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="15" rx="2" />
    <path d="M17 2l-5 5-5-5" />
    <path d="M2 12h20" />
  </svg>
)

const AcIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M7 14h10" />
    <path d="M7 10h10" />
    <path d="M12 14v3M9 17l3-3 3 3" />
  </svg>
)

const LaundryIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <circle cx="12" cy="13" r="4" />
    <path d="M6 6h.01M10 6h4" />
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

const BathIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="7" width="16" height="12" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
)

const facilities = [
  {
    category: 'room',
    items: [
      { Icon: KitchenIcon, name: { el: 'Πλήρως Εξοπλισμένη Κουζίνα', en: 'Fully Equipped Kitchen' } },
      { Icon: BathIcon, name: { el: 'Πλήρως Εξοπλισμένο Μπάνιο', en: 'Fully Equipped Bathroom' } },
      { Icon: AcIcon, name: { el: 'Δωρεάν Κλιματισμός', en: 'Free Air Conditioning' } },
      { Icon: SatelliteIcon, name: { el: 'Δορυφορικά Κανάλια', en: 'Satellite Channels' } },
    ]
  },
  {
    category: 'facilities',
    items: [
      { Icon: WifiIcon, name: { el: 'Δωρεάν WiFi', en: 'Free WiFi' } },
      { Icon: ParkingIcon, name: { el: 'Δωρεάν Parking', en: 'Free Parking' } },
      { Icon: BeachIcon, name: { el: 'Πρόσβαση στην Παραλία', en: 'Beach Access' } },
      { Icon: LaundryIcon, name: { el: 'Δωρεάν Πλυντήριο', en: 'Free Laundry' } },
    ]
  }
]

export function IncantoFacilities({ lang }: IncantoFacilitiesProps) {
  const getCategoryTitle = (category: string) => {
    if (lang === 'el') {
      return category === 'room' ? 'Διαμέρισμα' : 'Παροχές'
    }
    return category === 'room' ? 'Apartment' : 'Facilities'
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

