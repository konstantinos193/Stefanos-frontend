import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroWrapper } from '@/components/sections/HeroWrapper'

// Dynamically import sections for optimal performance - matching requirements structure
const RecentAdditionsSection = dynamic(() => import('@/components/sections/RecentAdditionsSection').then(mod => ({ default: mod.RecentAdditionsSection })), { ssr: true })
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), { ssr: true })
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection').then(mod => ({ default: mod.FeaturesSection })), { ssr: true })
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
        {/* Landing Page Structure - Matching Requirements Exactly */}
        {/* 1. Hero Section (Introduction) - with dual search mode and Preveza focus */}
        <HeroWrapper />
        
        {/* 2. Recent Additions Section - Preveza properties */}
        <RecentAdditionsSection />
        
        {/* 3. Services Section - Property Management, Booking Platform, etc. */}
        <ServicesSection />
        
        {/* 4. Features Section - Key platform features and trust indicators */}
        <FeaturesSection />
        
        {/* 5. Personalized Recommendations - Based on user preferences */}
        <PersonalizedRecommendationsSection />
      </main>
      <Footer />
    </>
  )
}

