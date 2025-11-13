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
      VACATION_RENTAL: { gr: 'Διακοπές', en: 'Vacation Rental' },
      LUXURY: { gr: 'Πολυτελές', en: 'Luxury' },
      INVESTMENT: { gr: 'Επένδυση', en: 'Investment' },
    }
    return types[type]?.[lang as 'gr' | 'en'] || type
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {property.averageRating && property.averageRating > 0 && (
            <div className="flex items-center gap-1 text-lg">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{property.averageRating.toFixed(1)}</span>
              {property.reviewCount && property.reviewCount > 0 && (
                <span className="text-gray-500 text-sm">
                  ({property.reviewCount} {lang === 'gr' ? 'αξιολογήσεις' : 'reviews'})
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <span className="text-sm">{formatPropertyType(property.type)}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm">{address}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
        <div>
          <div className="text-2xl font-bold text-gray-900">{property.maxGuests}</div>
          <div className="text-sm text-gray-600">{lang === 'gr' ? 'Επισκέπτες' : 'Guests'}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
          <div className="text-sm text-gray-600">{lang === 'gr' ? 'Υπνοδωμάτια' : 'Bedrooms'}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
          <div className="text-sm text-gray-600">{lang === 'gr' ? 'Μπάνια' : 'Bathrooms'}</div>
        </div>
        {property.area && (
          <div>
            <div className="text-2xl font-bold text-gray-900">{property.area}</div>
            <div className="text-sm text-gray-600">m²</div>
          </div>
        )}
      </div>

      {description && (
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {lang === 'gr' ? 'Περιγραφή' : 'Description'}
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}

