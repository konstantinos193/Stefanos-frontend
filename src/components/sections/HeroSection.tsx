'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RealEstateSearchForm } from '@/components/forms/RealEstateSearchForm'
import { RentalSearchForm } from '@/components/forms/RentalSearchForm'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

type Tab = 'buy' | 'rent'

export const HeroSection = () => {
  const t = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('buy')

  return (
    <section className="relative bg-white min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 hero-bg-image" aria-hidden />
      {/* Logo background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          <Image
            src="/logoetc.png"
            alt="SMH Real Estate"
            width={800}
            height={320}
            className="w-full h-full object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70" />
      <div className="absolute inset-0 hero-bg-pattern" />
      <div className="absolute inset-0 pointer-events-none hero-radial-gradient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="flex flex-col items-center text-center w-full">
          {/* Tab bar: Αγορά ακινήτων | Ενοικίαση ακινήτων */}
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
            <div className="inline-flex rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`rounded-full px-5 sm:px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
                  activeTab === 'buy'
                    ? 'bg-[#d4af37] text-gray-900 shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {t('hero.parts.buy.tabLabel')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`rounded-full px-5 sm:px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
                  activeTab === 'rent'
                    ? 'bg-[#d4af37] text-gray-900 shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {t('hero.parts.rent.tabLabel')}
              </button>
            </div>
          </div>

          {/* Content: switch by active tab */}
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
            {activeTab === 'buy' && (
              <>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-4 sm:mb-5 leading-relaxed">
                  {t('hero.parts.buy.description')}
                </p>
                <RealEstateSearchForm intention="buy" idPrefix="buy" />
              </>
            )}
            {activeTab === 'rent' && (
              <>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-4 sm:mb-5 leading-relaxed">
                  {t('hero.parts.rent.description')}
                </p>
                <RentalSearchForm />
              </>
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
