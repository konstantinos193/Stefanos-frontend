'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RentalSearchForm } from '@/components/forms/RentalSearchForm'
import { HeroStats } from './HeroStats'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const MobileHeroSection = () => {
  const t = useTranslation()

  return (
    <section className="relative bg-white min-h-[100vh] min-h-[100dvh] flex items-start justify-center overflow-hidden pt-16">
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

      <div className="relative w-full px-4 pt-6 pb-8">
        <div className="flex flex-col items-center text-center w-full space-y-3">
          <div className="w-full max-w-sm mx-auto mb-2 px-2">
            <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">
              {t('hero.parts.rent.description')}
            </p>
            <RentalSearchForm />
          </div>

          <div className="w-full max-w-sm mx-auto px-2">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  )
}
