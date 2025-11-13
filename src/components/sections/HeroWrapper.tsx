'use client'

import dynamic from 'next/dynamic'

const ResponsiveHero = dynamic(() => import('./ResponsiveHero').then(mod => ({ default: mod.ResponsiveHero })), { 
  ssr: false,
  loading: () => (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  )
})

export const HeroWrapper = () => {
  return <ResponsiveHero />
}

