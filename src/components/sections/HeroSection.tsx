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

  const searchModeOptions: SearchModeOption[] = useMemo(() => [
    {
      value: 'real-estate',
      label: t('searchModes.realEstate.label'),
      description: t('searchModes.realEstate.description')
    },
    {
      value: 'booking',
      label: t('searchModes.booking.label'),
      description: t('searchModes.booking.description')
    }
  ], [t])

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 md:h-screen flex items-center justify-center overflow-hidden hidden md:flex">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/homepage/hero1.png)'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, white 1px, transparent 1px),
            linear-gradient(180deg, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Subtle radial gradient for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20">
        <div className="flex flex-col items-center text-center w-full">
          <div className="w-full max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight px-2 sm:px-0">
              {t('hero.title')}
              <span className="block text-[#d4af37] mt-1 sm:mt-2">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              {t('hero.description')}
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 px-2 sm:px-0 flex justify-center">
            <SearchModeTabs
              options={searchModeOptions}
              activeValue={searchMode}
              onChange={setSearchMode}
            />
          </div>
          
          <div className="w-full max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 px-2 sm:px-0">
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
