'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'
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
  intention?: 'buy' | 'rent'
  idPrefix?: string
  onSubmit?: (data: RealEstateSearchData) => void
}

const getPropertyTypeOptions = (t: (key: string) => string) => [
  { value: '', label: t('search.allTypes') },
  { value: 'APARTMENT', label: t('propertyTypes.apartment') },
  { value: 'HOUSE', label: t('propertyTypes.house') },
  { value: 'ROOM', label: t('propertyTypes.room') },
  { value: 'COMMERCIAL', label: t('propertyTypes.commercial') },
  { value: 'STORAGE', label: t('propertyTypes.storage') },
  { value: 'PLOT', label: t('propertyTypes.plot') },
  { value: 'GARAGE', label: t('propertyTypes.garage') },
  { value: 'LUXURY', label: t('propertyTypes.luxury') },
  { value: 'INVESTMENT', label: t('propertyTypes.investment') }
]

const getBedroomOptions = (t: (key: string) => string) => [
  { value: '', label: t('search.any') },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' }
]

const getBathroomOptions = (t: (key: string) => string) => [
  { value: '', label: t('search.any') },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' }
]

const makeId = (prefix: string | undefined, id: string) => (prefix ? `${prefix}-${id}` : id)

export const RealEstateSearchForm = ({ intention, idPrefix, onSubmit }: RealEstateSearchFormProps) => {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const [searchData, setSearchData] = useState<RealEstateSearchData>({
    location: 'Arta, Greece', // Default to Arta as per requirements
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
    if (intention) params.set('intention', intention)
    if (searchData.location) params.set('location', searchData.location)
    if (searchData.propertyType) {
      params.set('type', searchData.propertyType)
    }
    if (searchData.minPrice) params.set('minPrice', searchData.minPrice)
    if (searchData.maxPrice) params.set('maxPrice', searchData.maxPrice)
    if (searchData.bedrooms) params.set('guests', searchData.bedrooms)

    const route = intention ? 'properties' : 'results'
    router.push(`/${lang}/${route}?${params.toString()}`)
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
            id={makeId(idPrefix, 'location')}
            label={t('search.location')}
            placeholder={t('search.locationPlaceholder')}
            value={searchData.location}
            onChange={(value) => handleInputChange('location', value)}
          />
        </div>
        
        <div>
          <CustomSelect
            id={makeId(idPrefix, 'propertyType')}
            label={t('search.propertyType')}
            value={searchData.propertyType}
            onChange={(value) => handleInputChange('propertyType', value)}
            options={getPropertyTypeOptions(t)}
            placeholder={t('search.allTypes')}
          />
        </div>
        
        <div>
          <CustomSelect
            id={makeId(idPrefix, 'bedrooms')}
            label={t('search.bedrooms')}
            value={searchData.bedrooms}
            onChange={(value) => handleInputChange('bedrooms', value)}
            options={getBedroomOptions(t)}
            placeholder={t('search.any')}
          />
        </div>
        
        <div>
          <CustomSelect
            id={makeId(idPrefix, 'bathrooms')}
            label={t('search.bathrooms')}
            value={searchData.bathrooms}
            onChange={(value) => handleInputChange('bathrooms', value)}
            options={getBathroomOptions(t)}
            placeholder={t('search.any')}
          />
        </div>
        
        <div>
          <CustomInput
            id={makeId(idPrefix, 'minPrice')}
            label={t('search.minPrice')}
            placeholder={t('search.minPricePlaceholder')}
            value={searchData.minPrice}
            onChange={(value) => handleInputChange('minPrice', value)}
            type="number"
          />
        </div>
        
        <div>
          <CustomInput
            id={makeId(idPrefix, 'maxPrice')}
            label={t('search.maxPrice')}
            placeholder={t('search.maxPricePlaceholder')}
            value={searchData.maxPrice}
            onChange={(value) => handleInputChange('maxPrice', value)}
            type="number"
          />
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center">
        <button
          type="submit"
          id={idPrefix ? `search-properties-button-${idPrefix}` : 'search-properties-button-real-estate'}
          className="w-full sm:w-auto px-8 py-3 bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 transform hover:scale-105 active:scale-95"
        >
          {t('search.searchProperties')}
        </button>
      </div>
    </form>
  )
}

