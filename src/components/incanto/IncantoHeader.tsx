'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/layout/Navigation'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { UserMenu } from '@/components/layout/UserMenu'
import { MobileHeader } from '@/components/layout/MobileHeader'

/**
 * Premium themed header used only on the Incanto page.
 * Keeps the same navigation logic but with a more minimal,
 * luxury style that blends with the dark hero.
 */
export const IncantoHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header - translucent, premium styling */}
      <header className="hidden md:block fixed inset-x-0 top-0 z-40 bg-black/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo + brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 group hover:opacity-90 transition-opacity duration-200"
          >
            <div className="relative h-10 w-auto flex-shrink-0">
              <Image
                src="/logoetc.png"
                alt="STEFANOS MALESKOS Real Estate"
                width={160}
                height={64}
                className="h-full w-auto object-contain drop-shadow-lg"
                priority
                unoptimized
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
                L'INCANTO
              </span>
              <span className="text-sm text-gray-400">
                Luxury Apartments
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-10 text-sm font-medium">
            <Navigation />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header – re-use existing behavior for consistency */}
      <MobileHeader
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </>
  )
}


