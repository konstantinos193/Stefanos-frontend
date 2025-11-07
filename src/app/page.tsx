import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PropertiesSection } from '@/components/sections/PropertiesSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PropertiesSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  )
}
