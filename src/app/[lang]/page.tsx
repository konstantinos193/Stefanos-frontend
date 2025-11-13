import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { MobileHeroSection } from '@/components/sections/MobileHeroSection'
import { IntentionsSection } from '@/components/sections/IntentionsSection'
import { RecentAdditionsSection } from '@/components/sections/RecentAdditionsSection'
import { PersonalizedRecommendationsSection } from '@/components/sections/PersonalizedRecommendationsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PropertiesSection } from '@/components/sections/PropertiesSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { SignInSection } from '@/components/sections/SignInSection'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  
  return (
    <>
      <Header />
      <main className="flex-1 relative">
        {/* Unified professional background for entire homepage */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Base gradient - clean white to subtle gray */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
          
          {/* Subtle texture pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, #000 1px, transparent 1px),
                linear-gradient(180deg, #000 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
          
          {/* Elegant radial gradient for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0, 0, 0, 0.01) 0%, transparent 50%)'
            }}
          />
        </div>
        
        {/* Hero sections with their own backgrounds */}
        <div className="relative">
          <MobileHeroSection />
          <HeroSection />
        </div>
        
        {/* Main content sections */}
        <div className="relative">
          <IntentionsSection />
          <RecentAdditionsSection />
          <PersonalizedRecommendationsSection />
          <ServicesSection />
          <PropertiesSection />
          <FeaturesSection />
          <SignInSection />
        </div>
      </main>
      <Footer />
    </>
  )
}

