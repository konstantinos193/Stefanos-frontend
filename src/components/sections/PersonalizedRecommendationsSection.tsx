'use client'

import { useEffect, useState } from 'react'
import { PropertyCard } from '@/components/ui/PropertyCard'
import { useTranslation } from '@/lib/hooks/useTranslation'

type Property = {
  id: string
  title: string
  location: string
  price: number
  rating: number
  image: string
  amenities: string[]
  type: string
}

type PersonalizedRecommendationsSectionProps = {
  properties?: Property[]
  userId?: string
}

export const PersonalizedRecommendationsSection = ({ 
  properties,
  userId 
}: PersonalizedRecommendationsSectionProps) => {
  const t = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const displayProperties = properties || []

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('personalizedRecommendations.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('personalizedRecommendations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProperties.map((property, index) => (
            <div
              key={property.id}
              className={`
                transition-all duration-700 ease-out
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-primary">
            {t('personalizedRecommendations.viewAll')}
          </button>
        </div>
      </div>
    </section>
  )
}

