'use client'

import { useState } from 'react'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/logo_nobg.png" 
                alt="Στέφανος Σπύρος" 
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-header-text">
                  Real Estate Platform
                </span>
                <span className="text-xs text-gray-300">
                  Στέφανος Σπύρος
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <Navigation className="hidden md:block" />

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <UserMenu />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-header-text hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  )
}
