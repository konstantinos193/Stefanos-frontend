'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/layout/Navigation'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { UserMenu } from '@/components/layout/UserMenu'
import { MobileHeader } from '@/components/layout/MobileHeader'
import styles from './IncantoHeader.module.css'

/**
 * Modern, minimal header for the Incanto page
 */
export const IncantoHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className={`hidden md:flex ${styles.header}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/logoetc.png"
              alt="SMH Real Estate"
              width={140}
              height={56}
              className={styles.logoImage}
              priority
              unoptimized
            />
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Navigation />
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <LanguageSwitcher />
            <div className={styles.userMenu}>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </>
  )
}
