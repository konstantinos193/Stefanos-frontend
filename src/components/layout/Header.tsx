'use client'

import { useState } from 'react'
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
      {/* Desktop Header */}
      <header className="hidden md:block header border-b border-gray-900 shadow-lg bg-black/95 backdrop-blur-sm relative overflow-visible z-40 h-24">
        <div className="w-full h-full relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full relative">
              {/* Desktop Navigation */}
              <div className="hidden lg:block flex-1">
                <Navigation />
              </div>
            </div>
          </div>
          
          {/* Right side items - positioned absolutely at the right edge */}
          <div className="absolute right-4 sm:right-6 lg:right-8 top-0 h-full flex items-center space-x-2 z-50">
            <LanguageSwitcher />
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Logo - Fixed position, stays in front and gets left behind when scrolling */}
        <Link 
          href="/" 
          className="fixed top-0 left-0 flex items-center group transition-all duration-300 ease-in-out hover:opacity-90 p-4 sm:p-6 z-[100] h-24"
        >
          <div className="relative h-16 sm:h-20 md:h-24 flex-shrink-0" style={{ width: 'auto', minWidth: '64px' }}>
            <Image 
              src="/logoetc.png" 
              alt="SMH Real Estate" 
              width={200}
              height={96}
              className="h-full w-auto object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ width: 'auto', height: '100%' }}
              priority
              unoptimized
            />
          </div>
        </Link>
      </header>

      {/* Mobile Header */}
      <MobileHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </>
  )
}
