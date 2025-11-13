'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
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
  isNew?: boolean
}

type RecentAdditionsSectionProps = {
  properties?: Property[]
}

export const RecentAdditionsSection = ({ properties }: RecentAdditionsSectionProps) => {
  const t = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const defaultProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Apartment in Athens',
      location: 'Athens, Greece',
      price: 120,
      rating: 4.8,
      image: 'https://placehold.co/400x300/3b82f6/FFFFFF?text=Modern+Apartment',
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Pool'],
      type: 'Apartment',
      isNew: true
    },
    {
      id: '2',
      title: 'Luxury Villa in Mykonos',
      location: 'Mykonos, Greece',
      price: 350,
      rating: 4.9,
      image: 'https://placehold.co/400x300/10b981/FFFFFF?text=Luxury+Villa',
      amenities: ['WiFi', 'Kitchen', 'Beach Access', 'Pool'],
      type: 'Villa',
      isNew: true
    },
    {
      id: '3',
      title: 'Cozy Studio in Thessaloniki',
      location: 'Thessaloniki, Greece',
      price: 80,
      rating: 4.7,
      image: 'https://placehold.co/400x300/f59e0b/FFFFFF?text=Cozy+Studio',
      amenities: ['WiFi', 'Kitchen', 'City Center'],
      type: 'Studio',
      isNew: true
    },
    {
      id: '4',
      title: 'Beachfront Condo in Santorini',
      location: 'Santorini, Greece',
      price: 280,
      rating: 4.9,
      image: 'https://placehold.co/400x300/ef4444/FFFFFF?text=Beachfront+Condo',
      amenities: ['WiFi', 'Kitchen', 'Beach Access', 'Balcony'],
      type: 'Condo',
      isNew: true
    }
  ]

  const displayProperties = properties || defaultProperties

  return (
    <section 
      className="py-12 lg:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" 
      aria-labelledby="recent-additions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 
            id="recent-additions-heading"
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Recent Additions
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Νέα ακίνητα που προστέθηκαν πρόσφατα στην πλατφόρμα μας
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProperties.map((property, index) => (
            <div
              key={property.id}
              className={clsx(
                'transition-all duration-700 ease-out',
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              )}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="group relative h-full">
                {/* Card container with modern dark styling */}
                <div className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  {/* Base background layer */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800/60 via-gray-800/50 to-gray-900/60 group-hover:from-gray-800/80 group-hover:via-gray-800/70 group-hover:to-gray-900/80 transition-all duration-300" />
                  
                  {/* Backdrop blur layer */}
                  <div className="absolute inset-0 rounded-2xl backdrop-blur-xl bg-black/20" />
                  
                  {/* Border with gold accent */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-gray-700/60 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300" />
                  
                  {/* Inner depth shadow */}
                  <div className="absolute inset-0 rounded-2xl bg-black/30 pointer-events-none" />
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
                  
                  {/* Image container */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* New badge */}
                    {property.isNew && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse">
                          New
                        </div>
                      </div>
                    )}
                    
                    {/* Type badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg border border-gray-700/50">
                        {property.type}
                      </div>
                    </div>
                    
                    {/* Rating badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-gray-900/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg border border-gray-700/50 flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold">{property.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col p-5 lg:p-6">
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-200 mb-2 group-hover:text-white transition-colors duration-300 line-clamp-2">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 flex items-center gap-1.5 group-hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {property.location}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-2xl lg:text-3xl font-bold text-white">
                          €{property.price}
                          <span className="text-sm lg:text-base font-normal text-gray-400 ml-1">/night</span>
                        </span>
                      </div>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-gray-800/60 text-gray-300 text-xs font-medium rounded-full border border-gray-700/50 group-hover:bg-gray-800/80 group-hover:border-[#d4af37]/40 group-hover:text-gray-200 transition-colors duration-300"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="px-2.5 py-1 bg-gray-800/60 text-gray-300 text-xs font-medium rounded-full border border-gray-700/50 group-hover:bg-gray-800/80 group-hover:border-[#d4af37]/40 group-hover:text-gray-200 transition-colors duration-300">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#b8941f] hover:to-[#d4af37] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#d4af37]/30 group-hover:scale-[1.02] active:scale-[0.98]">
                      View Details
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-8 rounded-xl hover:from-[#b8941f] hover:to-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/30 hover:scale-105 active:scale-95">
            <span>View All Recent Properties</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
