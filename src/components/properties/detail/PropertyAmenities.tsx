import { PropertyAmenityRelation } from '@/types/property'

type PropertyAmenitiesProps = {
  amenities: PropertyAmenityRelation[]
  lang: string
}

export function PropertyAmenities({ amenities, lang }: PropertyAmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null
  }

  const groupedAmenities = amenities.reduce((acc, item) => {
    const category = item.amenity.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item.amenity)
    return acc
  }, {} as Record<string, typeof amenities[0]['amenity'][]>)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        {lang === 'gr' ? 'Παροχές' : 'Amenities'}
      </h2>
      
      <div className="space-y-6">
        {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-gray-800 mb-3 capitalize">
              {category.replace('_', ' ')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categoryAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-3">
                  {amenity.icon && (
                    <div className="flex-shrink-0 w-6 h-6 text-primary-blue">
                      <span className="text-2xl">{amenity.icon}</span>
                    </div>
                  )}
                  <span className="text-gray-700">
                    {lang === 'gr' ? amenity.nameGr : amenity.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

