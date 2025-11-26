'use client'

import { ReactNode } from 'react'

type IncantoHeroProps = {
  lang: string
  children?: ReactNode
}

export function IncantoHero({ lang, children }: IncantoHeroProps) {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black pt-28 pb-16">
      {/* Background with exact L'incanto logo image */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: 'url(/incanto-logo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000',
        }}
      />

      {/* Overlay content (e.g. booking card) with soft, fading blur behind */}
      <div className="relative z-10 w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl flex justify-center">
          {/* Soft blurred halo fully covering the booking card */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-6 md:-inset-x-10 md:-inset-y-8
                       bg-gradient-to-b from-black/65 via-black/40 to-black/10
                       backdrop-blur-md rounded-[999px]"
          />
          <div className="relative w-full max-w-3xl">{children}</div>
        </div>
      </div>
    </section>
  )
}


