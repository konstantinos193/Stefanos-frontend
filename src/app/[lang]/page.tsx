import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroWrapper } from '@/components/sections/HeroWrapper'

// Dynamically import sections for optimal performance - matching requirements structure
const IntentionsSection = dynamic(() => import('@/components/sections/IntentionsSection').then(mod => ({ default: mod.IntentionsSection })), { ssr: true })
const RecentAdditionsSection = dynamic(() => import('@/components/sections/RecentAdditionsSection').then(mod => ({ default: mod.RecentAdditionsSection })), { ssr: true })
const ShortTermRentalsSection = dynamic(() => import('@/components/sections/ShortTermRentalsSection').then(mod => ({ default: mod.ShortTermRentalsSection })), { ssr: true })
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), { ssr: true })
const PersonalizedRecommendationsSection = dynamic(() => import('@/components/sections/PersonalizedRecommendationsSection').then(mod => ({ default: mod.PersonalizedRecommendationsSection })), { ssr: true })

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  
  return (
    <>
      <Header />
      <main className="flex-1 relative bg-white">
        {/* Landing Page Structure - Optimized for Real Estate Platform */}
        {/* 1. Hero Section - Real estate search form */}
        <HeroWrapper />
        
        {/* 2. Intentions Section - Rent - Core real estate actions */}
        <IntentionsSection />
        
        {/* 3. Recent Additions Section - New properties */}
        <RecentAdditionsSection />
        
        {/* 4. Short-term Rentals Section - Vacation rentals and short stays */}
        <ShortTermRentalsSection />
        
        {/* 5. Services Section - Property Management, Investment Consulting, etc. */}
        <ServicesSection />
        
        {/* 6. Personalized Recommendations - Based on user preferences */}
        <PersonalizedRecommendationsSection />
      </main>
      <Footer />
    </>
  )
}

