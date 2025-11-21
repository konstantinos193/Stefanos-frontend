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
    location: 'Preveza, Greece', // Default to Preveza as per requirements
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
    <form onSubmit={handleSubmit} className="bg-transparent backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4">
        <div className="lg:col-span-1">
          <LocationAutocomplete
            id="location"
            label="Location"
            placeholder="Preveza, Greece"
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
      
      <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center">
        <button
          type="submit"
          id="search-properties-button-real-estate"
          className="search-properties-button px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 focus:outline-none cursor-pointer"
          style={{ 
            background: 'transparent',
            backgroundImage: 'none',
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#111827'
          }}
        >
          Search Properties
        </button>
      </div>
    </form>
  )
}

