'use client'

import { useState, useMemo } from 'react'
import { SearchForm } from '@/components/forms/SearchForm'
import { RealEstateSearchForm } from '@/components/forms/RealEstateSearchForm'
import { SearchModeTabs, type SearchModeOption } from '@/components/ui/SearchModeTabs'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const MobileHeroSection = () => {
  const t = useTranslation()
  const [searchMode, setSearchMode] = useState<string>('real-estate')

  const searchModeOptions: SearchModeOption[] = useMemo(() => {
    const realEstateLabel = t('searchModes.realEstate.label')
    const realEstateDesc = t('searchModes.realEstate.description')
    const bookingLabel = t('searchModes.booking.label')
    const bookingDesc = t('searchModes.booking.description')
    
    return [
      {
        value: 'real-estate',
        label: realEstateLabel,
        description: realEstateDesc
      },
      {
        value: 'booking',
        label: bookingLabel,
        description: bookingDesc
      }
    ]
  }, [t])

  return (
    <section className="relative bg-white min-h-[100vh] min-h-[100dvh] flex items-start justify-center overflow-hidden pt-16">
      {/* Background image overlay - more subtle on mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 will-change-transform"
        style={{
          backgroundImage: 'url(/homepage/hero1.png)',
          transform: 'translateZ(0)'
        }}
      />
      
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
          
          {/* Search Mode Tabs - compact for mobile */}
          <div className="w-full max-w-sm mx-auto mb-2 px-2">
            <SearchModeTabs
              options={searchModeOptions}
              activeValue={searchMode}
              onChange={setSearchMode}
            />
          </div>
          
          {/* Search Form - full width on mobile */}
          <div className="w-full max-w-sm mx-auto mb-3 px-2">
            {searchMode === 'real-estate' ? (
              <RealEstateSearchForm />
            ) : (
              <SearchForm />
            )}
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

