import { Property } from '@/types/property'
import { StarIcon } from '@/components/icons'

type PropertyInfoProps = {
  property: Property
  lang: string
}

export function PropertyInfo({ property, lang }: PropertyInfoProps) {
  const title = lang === 'gr' ? property.titleGr : property.titleEn
  const description = lang === 'gr' ? property.descriptionGr : property.descriptionEn
  const address = `${property.address}, ${property.city}, ${property.country}`

  const formatPropertyType = (type: string) => {
    const types: Record<string, { gr: string; en: string }> = {
      APARTMENT: { gr: 'Διαμέρισμα', en: 'Apartment' },
      HOUSE: { gr: 'Σπίτι', en: 'House' },
      ROOM: { gr: 'Δωμάτιο', en: 'Room' },
      COMMERCIAL: { gr: 'Επαγγελματικός Χώρος', en: 'Commercial Space' },
      STORAGE: { gr: 'Αποθήκη', en: 'Storage' },
      PLOT: { gr: 'Οικόπεδο', en: 'Plot' },
      GARAGE: { gr: 'Γκαράζ', en: 'Garage' },
      LUXURY: { gr: 'Πολυτελές', en: 'Luxury' },
      INVESTMENT: { gr: 'Επένδυση', en: 'Investment' },
    }
    return types[type]?.[lang as 'gr' | 'en'] || type
  }

  return (
    <div className="space-y-8">
      {/* Title and Rating Section */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                  {formatPropertyType(property.type)}
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {address}
                </div>
              </div>
            </div>
            
            {property.averageRating && property.averageRating > 0 && (
              <div className="flex flex-col items-center lg:items-end bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 rounded-2xl border border-yellow-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  <span className="text-3xl font-bold text-gray-900">{property.averageRating.toFixed(1)}</span>
                </div>
                {property.reviewCount && property.reviewCount > 0 && (
                  <span className="text-gray-600 text-sm font-medium mt-1">
                    {property.reviewCount} {lang === 'gr' ? 'αξιολογήσεις' : 'reviews'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Stats */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          {lang === 'gr' ? 'Βασικά Χαρακτηριστικά' : 'Property Details'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{property.bedrooms}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {lang === 'gr' ? 'Υπνοδωμάτια' : 'Bedrooms'}
            </div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{property.bathrooms}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {lang === 'gr' ? 'Μπάνια' : 'Bathrooms'}
            </div>
          </div>
          
          {property.area && (
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{property.area}</div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">m²</div>
            </div>
          )}
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{property.maxGuests}</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {lang === 'gr' ? 'Επισκέπτες' : 'Guests'}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-white rounded-full opacity-80"></div>
              {lang === 'gr' ? 'Περιγραφή' : 'Description'}
            </h2>
          </div>
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

