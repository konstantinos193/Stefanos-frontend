'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

type MobileHeaderProps = {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export const MobileHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileHeaderProps) => {
  return (
    <header className="md:hidden header border-b border-gray-900 shadow-lg bg-black/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Left side */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group transition-all duration-300 ease-in-out hover:opacity-90 flex-shrink-0 z-10"
          >
            <div className="relative h-10 flex-shrink-0" style={{ width: 'auto', minWidth: '40px' }}>
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
          </Link>

          {/* Right side items */}
          <div className="flex items-center space-x-2 ml-auto">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-lg text-header-text hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

