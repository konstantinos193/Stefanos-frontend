import { PropertyAmenityRelation } from '@/types/property'
import * as Icons from '@/components/icons'

type PropertyAmenitiesProps = {
  amenities: PropertyAmenityRelation[]
  lang: string
}

// Icon mapping for amenities - using actual icon components
const getAmenityIcon = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    wifi: Icons.WifiIcon,
    car: Icons.CarIcon,
    parking: Icons.CarIcon,
    'swimming-pool': Icons.PoolIcon,
    dumbbell: Icons.DumbbellIcon,
    snowflake: Icons.SnowflakeIcon,
    utensils: Icons.UtensilsIcon,
    home: Icons.HouseIcon,
    'arrow-up': Icons.ElevatorIcon,
    water: Icons.WaterIcon,
    'washing-machine': Icons.WashingMachineIcon,
    tv: Icons.TVIcon,
    wheelchair: Icons.WheelchairIcon,
    thermometer: Icons.ThermometerIcon,
    heart: Icons.HeartIcon,
    kitchen: Icons.KitchenIcon,
    pool: Icons.PoolIcon,
    beach: Icons.BeachIcon,
    balcony: Icons.BalconyIcon,
    garden: Icons.GardenIcon,
    fireplace: Icons.FireplaceIcon,
    terrace: Icons.TerraceIcon,
  }
  return iconMap[iconName] || Icons.CheckIcon
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    essentials: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    comfort: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    outdoor: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    recreation: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    transportation: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
    accessibility: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    wellness: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    entertainment: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    kitchen: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    climate: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
    parking: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
    view: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  }
  return colors[category.toLowerCase()] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
}

const formatCategoryName = (category: string) => {
  const categoryNames: Record<string, { gr: string; en: string }> = {
    essentials: { gr: 'Βασικές Παροχές', en: 'Essentials' },
    comfort: { gr: 'Άνεση', en: 'Comfort' },
    outdoor: { gr: 'Εξωτερικοί Χώροι', en: 'Outdoor' },
    recreation: { gr: 'Ψυχαγωγία', en: 'Recreation' },
    transportation: { gr: 'Μεταφορές', en: 'Transportation' },
    accessibility: { gr: 'Προσβασιμότητα', en: 'Accessibility' },
    wellness: { gr: 'Ευεξία', en: 'Wellness' },
    entertainment: { gr: 'Διασκέδαση', en: 'Entertainment' },
    kitchen: { gr: 'Κουζίνα', en: 'Kitchen' },
    climate: { gr: 'Κλιματισμός', en: 'Climate Control' },
    parking: { gr: 'Στάθμευση', en: 'Parking' },
    view: { gr: 'Θέα', en: 'View' },
  }
  return categoryNames[category.toLowerCase()] || { gr: category, en: category.replace('_', ' ') }
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
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-2 h-8 bg-white rounded-full opacity-80"></div>
          {lang === 'gr' ? 'Παροχές & Ανέσεις' : 'Amenities & Facilities'}
        </h2>
        <p className="text-blue-100 text-sm mt-2">
          {lang === 'gr' 
            ? 'Όλες οι παροχές που θα κάνουν τη διαμονή σας άνετη'
            : 'All the amenities to make your stay comfortable'}
        </p>
      </div>
      
      {/* Amenities */}
      <div className="p-8 space-y-8">
        {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => {
          const colors = getCategoryColor(category)
          const categoryNames = formatCategoryName(category)
          
          return (
            <div key={category} className={`${colors.bg} rounded-2xl p-6 border ${colors.border}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className={`w-3 h-3 ${colors.text.replace('text', 'bg')} rounded-full`}></div>
                {lang === 'gr' ? categoryNames.gr : categoryNames.en}
                <span className={`text-sm ${colors.text} font-normal bg-white px-2 py-1 rounded-full border ${colors.border}`}>
                  {categoryAmenities.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryAmenities.map((amenity) => (
                  <div 
                    key={amenity.id} 
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      {(() => {
                        const IconComponent = getAmenityIcon(amenity.icon || '')
                        return <IconComponent className="w-5 h-5" />
                      })()}
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium text-sm leading-tight">
                        {lang === 'gr' ? amenity.nameGr : amenity.nameEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

