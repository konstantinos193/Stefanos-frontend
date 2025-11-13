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
      <header className="hidden md:block header border-b border-gray-900 shadow-lg bg-black/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Desktop Navigation */}
            <div className="hidden lg:block flex-1">
              <Navigation />
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-3 md:space-x-4 ml-auto">
              <LanguageSwitcher />
              <div className="hidden sm:block">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Logo - Positioned top left with smooth transitions */}
        <Link 
          href="/" 
          className="absolute top-0 left-0 flex items-center space-x-3 group transition-all duration-300 ease-in-out hover:opacity-90 p-4 sm:p-6 z-10"
        >
          <div className="relative h-12 sm:h-16 md:h-20 flex-shrink-0" style={{ width: 'auto', minWidth: '48px' }}>
            <Image 
              src="/logo.png" 
              alt="Stefanos Spyros Real Estate | Στέφανος Σπύρος Real Estate" 
              width={200}
              height={200}
              className="h-full w-auto object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
              priority
              unoptimized
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm md:text-base font-bold text-header-text leading-tight transition-colors duration-300 group-hover:text-white">
              Stefanos Spyros Real Estate
            </span>
            <span className="text-xs md:text-sm text-gray-400 leading-tight transition-colors duration-300 group-hover:text-gray-300">
              Στέφανος Σπύρος Real Estate
            </span>
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
