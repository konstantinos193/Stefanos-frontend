'use client'

import { useState, useMemo } from 'react'
import { SearchForm } from '@/components/forms/SearchForm'
import { RealEstateSearchForm } from '@/components/forms/RealEstateSearchForm'
import { SearchModeTabs, type SearchModeOption } from '@/components/ui/SearchModeTabs'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const HeroSection = () => {
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
    <section className="relative bg-white min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 will-change-transform"
        style={{
          backgroundImage: 'url(/homepage/hero1.png)',
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 hero-bg-pattern" />
      
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 pointer-events-none hero-radial-gradient" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="flex flex-col items-center text-center w-full">
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight px-2 sm:px-0">
              {t('hero.title')}
              <span className="block text-[#d4af37] mt-1 sm:mt-2">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              {t('hero.description')}
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-5 px-2 sm:px-0 flex justify-center">
            <SearchModeTabs
              options={searchModeOptions}
              activeValue={searchMode}
              onChange={setSearchMode}
            />
          </div>
          
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
            {searchMode === 'real-estate' ? (
              <RealEstateSearchForm />
            ) : (
              <SearchForm />
            )}
          </div>
          
          <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  )
}
