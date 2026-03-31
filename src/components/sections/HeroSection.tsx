'use client'

import Image from 'next/image'
import { RentalSearchForm } from '@/components/forms/RentalSearchForm'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const HeroSection = () => {
  const t = useTranslation()

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
          {/* Content: rental only */}
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-4 sm:mb-5 leading-relaxed">
              {t('hero.parts.rent.description')}
            </p>
            <RentalSearchForm />
          </div>

          <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  )
}
