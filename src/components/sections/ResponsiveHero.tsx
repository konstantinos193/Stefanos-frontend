'use client'

import { useState, useEffect, useRef } from 'react'
import { HeroSection } from './HeroSection'
import { MobileHeroSection } from './MobileHeroSection'

export const ResponsiveHero = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(checkMobile, 150)
    }

    checkMobile()
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  if (isMobile === null) {
    return (
      <div className="relative bg-white min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return isMobile ? <MobileHeroSection /> : <HeroSection />
}

