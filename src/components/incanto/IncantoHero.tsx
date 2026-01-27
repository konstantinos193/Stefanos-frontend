'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import styles from './IncantoHero.module.css'

type IncantoHeroProps = {
  lang: string
  children?: ReactNode
}

export function IncantoHero({ lang, children }: IncantoHeroProps) {
  return (
    <section className={styles.hero}>
      {/* Background with parallax effect */}
      <div className={styles.backgroundWrapper}>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: 'url(/incanto-logo.png)',
          }}
        />
        <div className={styles.overlay} />
        <div className={styles.gradientMesh} />
      </div>

      {/* Content Container */}
      <div className={styles.content}>
        <div className={styles.heroContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logoWrapper}>
              <Image
                src="/incanto-logo.png"
                alt="L'Incanto"
                width={280}
                height={112}
                className={styles.logoImage}
                priority
                unoptimized
              />
            </div>
            <div className={styles.tagline}>
              <span className={styles.taglineText}>
                {lang === 'el' 
                  ? 'Ανακαλύψτε την Πολυτέλεια' 
                  : 'Discover Luxury'}
              </span>
            </div>
          </div>

          {/* Booking Form Section */}
          {children && (
            <div className={styles.bookingSection}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollArrow}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  )
}
