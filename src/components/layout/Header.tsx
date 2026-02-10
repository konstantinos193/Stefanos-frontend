'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { UserMenu } from './UserMenu'
import { MobileHeader } from './MobileHeader'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header - sticky so header + logo stay at top when scrolling */}
      <header className="site-header hidden md:block sticky top-0 overflow-visible z-40 h-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - attached to header, sized to fit with padding */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 group transition-all duration-300 ease-in-out hover:opacity-90 h-full py-3"
            >
              <div className="relative h-14 sm:h-16 md:h-20 flex-shrink-0" style={{ width: 'auto', minWidth: '64px' }}>
                <Image
                  src="/logoetc.png"
                  alt="SMH Real Estate"
                  width={200}
                  height={96}
                  className="h-full w-auto object-contain object-center drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ width: 'auto', height: '100%' }}
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation - centered (Suspense required for useSearchParams) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Suspense fallback={<nav className="flex items-center justify-center space-x-2" aria-hidden="true" />}>
                <Navigation />
              </Suspense>
            </div>

            {/* Incanto Hotel link */}
            <a
              href="https://incanto-hotel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/50 transition-all duration-200 group flex-shrink-0"
            >
              <Image
                src="/incanto-logo.png"
                alt="Incanto Hotel"
                width={24}
                height={24}
                className="rounded-sm object-contain transition-transform duration-200 group-hover:scale-110"
                unoptimized
              />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                Incanto Hotel
              </span>
            </a>

            {/* Right side items */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <LanguageSwitcher />
              <div className="hidden sm:block">
                <UserMenu />
              </div>
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
