'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { CustomInput } from '@/components/ui/CustomInput'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { LocationAutocomplete } from '@/components/ui/LocationAutocomplete'

type RealEstateSearchData = {
  location: string
  propertyType: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
}

type RealEstateSearchFormProps = {
  onSubmit?: (data: RealEstateSearchData) => void
}

const propertyTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'studio', label: 'Studio' },
  { value: 'commercial', label: 'Commercial' }
]

const bedroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
]

const bathroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' }
]

export const RealEstateSearchForm = ({ onSubmit }: RealEstateSearchFormProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const [searchData, setSearchData] = useState<RealEstateSearchData>({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (onSubmit) {
      onSubmit(searchData)
      return
    }

    const params = new URLSearchParams()
    if (searchData.location) params.set('location', searchData.location)
    if (searchData.propertyType) {
      const typeMap: Record<string, string> = {
        'apartment': 'APARTMENT',
        'house': 'HOUSE',
        'villa': 'VILLA',
        'studio': 'ROOM',
        'commercial': 'COMMERCIAL'
      }
      params.set('type', typeMap[searchData.propertyType] || searchData.propertyType.toUpperCase())
    }
    if (searchData.minPrice) params.set('minPrice', searchData.minPrice)
    if (searchData.maxPrice) params.set('maxPrice', searchData.maxPrice)
    if (searchData.bedrooms) {
      params.set('guests', searchData.bedrooms)
    }

    router.push(`/${lang}/results?${params.toString()}`)
  }

  const handleInputChange = (field: keyof RealEstateSearchData, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#d4af37]/30 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4">
        <div className="lg:col-span-1">
          <LocationAutocomplete
            id="location"
            label="Location"
            placeholder="City, Neighborhood, or Address"
            value={searchData.location}
            onChange={(value) => handleInputChange('location', value)}
          />
        </div>
        
        <div>
          <CustomSelect
            id="propertyType"
            label="Property Type"
            value={searchData.propertyType}
            onChange={(value) => handleInputChange('propertyType', value)}
            options={propertyTypeOptions}
            placeholder="All Types"
          />
        </div>
        
        <div>
          <CustomSelect
            id="bedrooms"
            label="Bedrooms"
            value={searchData.bedrooms}
            onChange={(value) => handleInputChange('bedrooms', value)}
            options={bedroomOptions}
            placeholder="Any"
          />
        </div>
        
        <div>
          <CustomSelect
            id="bathrooms"
            label="Bathrooms"
            value={searchData.bathrooms}
            onChange={(value) => handleInputChange('bathrooms', value)}
            options={bathroomOptions}
            placeholder="Any"
          />
        </div>
        
        <div>
          <CustomInput
            id="minPrice"
            label="Min Price"
            placeholder="€0"
            value={searchData.minPrice}
            onChange={(value) => handleInputChange('minPrice', value)}
            type="number"
          />
        </div>
        
        <div>
          <CustomInput
            id="maxPrice"
            label="Max Price"
            placeholder="No limit"
            value={searchData.maxPrice}
            onChange={(value) => handleInputChange('maxPrice', value)}
            type="number"
          />
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 md:mt-6">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#9a7d17] text-black font-medium text-sm sm:text-base py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 rounded-lg transition-all duration-200 shadow-lg shadow-[#d4af37]/20"
        >
          Search Properties
        </button>
      </div>
    </form>
  )
}

