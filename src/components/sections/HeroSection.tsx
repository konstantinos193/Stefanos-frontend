import { SearchForm } from '@/components/forms/SearchForm'
import { HeroStats } from './HeroStats'

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://placehold.co/1920x1080/1f2937/FFFFFF?text=Real+Estate+Platform)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-accent-blue">Property</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων
          </p>
          
          <div className="max-w-4xl mx-auto mb-12">
            <SearchForm />
          </div>
          
          <HeroStats />
        </div>
      </div>
    </section>
  )
}
