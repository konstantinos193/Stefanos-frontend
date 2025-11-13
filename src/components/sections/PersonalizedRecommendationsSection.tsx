'use client'

import { useEffect, useState } from 'react'
import { PropertyCard } from '@/components/ui/PropertyCard'

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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const defaultRecommendations: Property[] = [
    {
      id: 'rec-1',
      title: 'Seaside Villa in Paros',
      location: 'Paros, Greece',
      price: 420,
      rating: 4.9,
      image: 'https://placehold.co/400x300/3b82f6/FFFFFF?text=Seaside+Villa',
      amenities: ['WiFi', 'Kitchen', 'Beach Access', 'Pool', 'Garden'],
      type: 'Villa'
    },
    {
      id: 'rec-2',
      title: 'Mountain Retreat in Zagori',
      location: 'Zagori, Greece',
      price: 180,
      rating: 4.8,
      image: 'https://placehold.co/400x300/10b981/FFFFFF?text=Mountain+Retreat',
      amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Hiking Trails'],
      type: 'Cottage'
    },
    {
      id: 'rec-3',
      title: 'Historic Apartment in Plaka',
      location: 'Athens, Greece',
      price: 150,
      rating: 4.7,
      image: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Historic+Apartment',
      amenities: ['WiFi', 'Kitchen', 'Historic Area', 'City Center'],
      type: 'Apartment'
    },
    {
      id: 'rec-4',
      title: 'Luxury Penthouse in Glyfada',
      location: 'Glyfada, Greece',
      price: 550,
      rating: 5.0,
      image: 'https://placehold.co/400x300/ef4444/FFFFFF?text=Luxury+Penthouse',
      amenities: ['WiFi', 'Kitchen', 'Sea View', 'Pool', 'Rooftop Terrace'],
      type: 'Penthouse'
    }
  ]

  const displayProperties = properties || defaultRecommendations

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Personalized Recommendations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Προσωποποιημένες προτάσεις - Ακίνητα που ταιριάζουν στις προτιμήσεις σας
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
            View All Recommendations
          </button>
        </div>
      </div>
    </section>
  )
}

