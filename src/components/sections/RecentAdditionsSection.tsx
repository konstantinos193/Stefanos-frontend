'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import Link from 'next/link'
import { Property } from '@/types/property'
import { searchPropertiesServer } from '@/lib/api/properties'

type RecentAdditionsSectionProps = {
  properties?: Property[]
}

export const RecentAdditionsSection = ({ properties: initialProperties }: RecentAdditionsSectionProps) => {
  const t = useTranslation()
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [properties, setProperties] = useState<Property[]>(initialProperties || [])
  const [loading, setLoading] = useState(!initialProperties)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const fetchProperties = async () => {
      if (initialProperties && initialProperties.length > 0) {
        setProperties(initialProperties)
        return
      }

      try {
        setLoading(true)
        const response = await searchPropertiesServer({
          limit: '8',
          page: '1',
          sortBy: 'createdAt',
          sortOrder: 'desc'
        })
        setProperties(response.data.properties.slice(0, 8))
      } catch (error) {
        console.error('Error fetching properties:', error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [initialProperties])

  const displayProperties = properties || []

  return (
    <section 
      className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" 
      aria-labelledby="recent-additions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 
            id="recent-additions-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('recentAdditions.title')}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('recentAdditions.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayProperties.map((property, index) => {
              const title = language === 'el' ? property.titleGr : property.titleEn
              const location = `${property.city}, ${property.country}`
              const imageUrl = property.images && property.images.length > 0 ? property.images[0] : ''
              const rating = property.averageRating || 0
              const amenities = property.amenities.slice(0, 3).map(a => 
                language === 'el' ? a.amenity.nameGr : a.amenity.nameEn
              )
              const propertyType = language === 'el' 
                ? (property.type === 'APARTMENT' ? 'Διαμέρισμα' 
                  : property.type === 'HOUSE' ? 'Σπίτι'
                  : property.type === 'COMMERCIAL' ? 'Κατάστημα'
                  : property.type === 'ROOM' ? 'Δωμάτιο'
                  : property.type)
                : property.type
              
              return (
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
                {/* Card container with bright modern styling */}
                <div className="relative h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Border with gold accent */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-gray-200 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300" />
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
                  
                  {/* Image container */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* New badge - show for recently added properties (within last 7 days) */}
                    {property.createdAt && new Date(property.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse">
                          {t('recentAdditions.new')}
                        </div>
                      </div>
                    )}
                    
                    {/* Type badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900 shadow-lg border border-gray-200">
                        {propertyType}
                      </div>
                    </div>
                    
                    {/* Rating badge */}
                    {rating > 0 && (
                      <div className="absolute bottom-4 left-4 z-10">
                        <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-xs font-semibold text-gray-900 shadow-lg border border-gray-200 flex items-center gap-1">
                          <svg className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-bold">{rating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col p-5 lg:p-6">
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex items-center gap-1.5 group-hover:text-gray-700 transition-colors duration-300">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {location}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                          €{property.basePrice.toFixed(0)}
                          {/* Hide daily rate for long-term rentals - check if property has minStay >= 30 */}
                          {(!property.minStay || property.minStay < 30) && (
                            <span className="text-sm lg:text-base font-normal text-gray-600 ml-1">/night</span>
                          )}
                          {property.minStay && property.minStay >= 30 && (
                            <span className="text-sm lg:text-base font-normal text-gray-600 ml-1">/month</span>
                          )}
                        </span>
                      </div>
                      
                      {/* Amenities */}
                      {amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 group-hover:bg-gray-50 group-hover:border-[#d4af37]/40 group-hover:text-gray-900 transition-colors duration-300"
                            >
                              {amenity}
                            </span>
                          ))}
                          {property.amenities.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 group-hover:bg-blue-50 group-hover:border-[#d4af37]/40 group-hover:text-gray-900 transition-colors duration-300">
                              +{property.amenities.length - 3} {t('recentAdditions.more')}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <Link
                      href={`/${language}/properties/${property.id}`}
                      className="w-full mt-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#b8941f] hover:to-[#d4af37] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#d4af37]/30 group-hover:scale-[1.02] active:scale-[0.98] text-center"
                    >
                      {t('recentAdditions.viewDetails')}
                    </Link>
                  </div>
                  
                </div>
              </div>
            </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {language === 'el' 
                ? 'Δεν βρέθηκαν ακίνητα αυτή τη στιγμή.'
                : 'No properties found at the moment.'}
            </p>
          </div>
        )}

        {!loading && displayProperties.length > 0 && (
          <div className="text-center mt-8 lg:mt-12">
            <Link
              href={`/${language}/properties`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold py-3 px-8 rounded-xl hover:from-[#b8941f] hover:to-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/30 hover:scale-105 active:scale-95"
            >
              <span>{t('recentAdditions.viewAllProperties')}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
