'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RealEstateSearchForm } from '@/components/forms/RealEstateSearchForm'
import { RentalSearchForm } from '@/components/forms/RentalSearchForm'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

type Tab = 'buy' | 'rent'

export const MobileHeroSection = () => {
  const t = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('buy')

  return (
    <section className="relative bg-white min-h-[100vh] min-h-[100dvh] flex items-start justify-center overflow-hidden pt-16">
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

      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/60 to-white/75" />
      <div className="absolute inset-0 hero-bg-pattern-mobile" />

      <div className="relative w-full px-4 pt-6 pb-8">
        <div className="flex flex-col items-center text-center w-full space-y-3">
          {/* Tabs: Buy | Rent */}
          <div className="w-full max-w-sm mx-auto">
            <div className="inline-flex rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 p-1 shadow-md">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
                  activeTab === 'buy' ? 'bg-[#d4af37] text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t('hero.parts.buy.tabLabel')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
                  activeTab === 'rent' ? 'bg-[#d4af37] text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t('hero.parts.rent.tabLabel')}
              </button>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto mb-2 px-2">
            {activeTab === 'buy' && (
              <>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">
                  {t('hero.parts.buy.description')}
                </p>
                <RealEstateSearchForm intention="buy" idPrefix="buy" />
              </>
            )}
            {activeTab === 'rent' && (
              <>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">
                  {t('hero.parts.rent.description')}
                </p>
                <RentalSearchForm />
              </>
            )}
          </div>

          <div className="w-full max-w-sm mx-auto px-2">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  )
}
