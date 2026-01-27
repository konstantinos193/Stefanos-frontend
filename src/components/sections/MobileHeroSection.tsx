'use client'

import Image from 'next/image'
import { RealEstateSearchForm } from '@/components/forms/RealEstateSearchForm'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const MobileHeroSection = () => {
  const t = useTranslation()

  return (
    <section className="relative bg-white min-h-[100vh] min-h-[100dvh] flex items-start justify-center overflow-hidden pt-16">
      {/* Logo background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
          <Image 
            src="/logoetc.png" 
            alt="SMH Real Estate" 
            width={600}
            height={240}
            className="w-full h-full object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
      
      {/* Light overlay for text readability - stronger on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/60 to-white/75" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 hero-bg-pattern-mobile" />
      
      {/* Content container - optimized for mobile scrolling with proper spacing */}
      <div className="relative w-full px-4 pt-6 pb-8">
        <div className="flex flex-col items-center text-center w-full space-y-3">
          {/* Title and Description - more compact */}
          <div className="w-full mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight px-2">
              {t('hero.title')}
              <span className="block text-[#d4af37] mt-1">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 max-w-xs mx-auto leading-relaxed px-2">
              {t('hero.description')}
            </p>
          </div>
          
          {/* Search Form - full width on mobile */}
          <div className="w-full max-w-sm mx-auto mb-3 px-2">
            <RealEstateSearchForm />
          </div>
          
          {/* Stats - compact horizontal layout for mobile */}
          <div className="w-full max-w-sm mx-auto px-2">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  )
}

