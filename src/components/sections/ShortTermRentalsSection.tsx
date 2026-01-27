'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import Link from 'next/link'
import { PropertyCard } from '@/components/results/PropertyCard'
import { Property } from '@/types/property'
import { searchPropertiesServer } from '@/lib/api/properties'

export const ShortTermRentalsSection = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  const currentLang = language === 'el' ? 'el' : 'en'
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        // Fetch short-term rentals (minStay < 30 days)
        const response = await searchPropertiesServer({
          limit: '6',
          page: '1',
          sortBy: 'createdAt',
          sortOrder: 'desc'
        })
        
        // Filter for short-term rentals (minStay < 30 or not set)
        const shortTermProperties = response.data.properties.filter(
          (prop: Property) => !prop.minStay || prop.minStay < 30
        )
        
        setProperties(shortTermProperties.slice(0, 6))
      } catch (error) {
        console.error('Error fetching short-term rentals:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {currentLang === 'el' ? 'Βραχυπρόθεσμες Ενοικιάσεις' : 'Short-term Rentals'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentLang === 'el' 
              ? 'Ιδανικές επιλογές για σύντομες διαμονές. Βρείτε το τέλειο κατάλυμα για τις διακοπές σας.'
              : 'Perfect options for short stays. Find the ideal accommodation for your vacation.'}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} lang={language} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href={`/${language}/properties?intention=rent`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-8 rounded-xl hover:from-[#b8941f] hover:to-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>{currentLang === 'el' ? 'Δείτε Όλες τις Βραχυπρόθεσμες Ενοικιάσεις' : 'View All Short-term Rentals'}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {currentLang === 'el' 
                ? 'Δεν βρέθηκαν βραχυπρόθεσμες ενοικιάσεις αυτή τη στιγμή.'
                : 'No short-term rentals found at the moment.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
