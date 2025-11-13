'use client'

import { memo, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/types/property'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface PropertyCardProps {
  property: Property
  lang?: string
}

const formatPropertyType = (type: string): string => {
  const typeMap: Record<string, string> = {
    APARTMENT: 'Apartment',
    HOUSE: 'House',
    ROOM: 'Room',
    COMMERCIAL: 'Commercial',
    STORAGE: 'Storage',
    VACATION_RENTAL: 'Vacation Rental',
    LUXURY: 'Luxury',
    INVESTMENT: 'Investment'
  }
  return typeMap[type] || type
}

const PropertyCardComponent = ({ property, lang = 'en' }: PropertyCardProps) => {
  const t = useTranslation()
  
  const { title, location, imageUrl, hasImage, rating, reviewCount, amenities, propertyType } = useMemo(() => {
    const title = lang === 'el' ? property.titleGr : property.titleEn
    const location = `${property.city}, ${property.country}`
    const hasImage = property.images && property.images.length > 0
    const imageUrl = hasImage ? property.images[0] : ''
    const rating = property.averageRating || 0
    const reviewCount = property.reviewCount || 0
    const amenities = property.amenities.slice(0, 3).map(a => 
      lang === 'el' ? a.amenity.nameGr : a.amenity.nameEn
    )
    const propertyType = formatPropertyType(property.type)
    
    return { title, location, imageUrl, hasImage, rating, reviewCount, amenities, propertyType }
  }, [property, lang])

  return (
    <Link href={`/${lang}/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-200">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
            {propertyType}
          </div>
          {rating > 0 && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
              {reviewCount > 0 && (
                <span className="text-gray-600 text-xs">({reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#d4af37]">
                €{property.basePrice.toFixed(0)}
              </span>
              <span className="text-sm text-gray-600">/night</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {property.bedrooms}
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {property.bathrooms}
                </span>
              )}
              {property.maxGuests > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {property.maxGuests}
                </span>
              )}
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
              {amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export const PropertyCard = memo(PropertyCardComponent)

