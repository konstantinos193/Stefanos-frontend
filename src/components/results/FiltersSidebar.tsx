'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface FiltersSidebarProps {
  lang?: string
  intention?: string
}

const propertyTypes = [
  { value: '', labelKey: 'allTypes' },
  { value: 'APARTMENT', labelKey: 'apartment' },
  { value: 'HOUSE', labelKey: 'house' },
  { value: 'ROOM', labelKey: 'room' },
  { value: 'COMMERCIAL', labelKey: 'commercial' },
  { value: 'STORAGE', labelKey: 'storage' },
  { value: 'PLOT', labelKey: 'plot' },
  { value: 'GARAGE', labelKey: 'garage' },
  { value: 'LUXURY', labelKey: 'luxury' },
  { value: 'INVESTMENT', labelKey: 'investment' }
]

export const FiltersSidebar = ({ lang = 'en', intention }: FiltersSidebarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentType = searchParams.get('type') || ''
  const currentMinPrice = searchParams.get('minPrice') || ''
  const currentMaxPrice = searchParams.get('maxPrice') || ''
  const currentGuests = searchParams.get('guests') || ''

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Preserve intention if it exists
    if (intention) {
      params.set('intention', intention)
    }
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    params.set('page', '1')
    const route = intention ? 'properties' : 'results'
    router.push(`/${lang}/${route}?${params.toString()}`)
  }

  const handleTypeChange = (value: string) => {
    updateFilters({ type: value })
  }

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    updateFilters({ [field]: value })
  }

  const handleGuestsChange = (value: string) => {
    updateFilters({ guests: value })
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('type')
    params.delete('minPrice')
    params.delete('maxPrice')
    params.delete('guests')
    params.set('page', '1')
    // Preserve intention if it exists
    if (intention) {
      params.set('intention', intention)
    }
    const route = intention ? 'properties' : 'results'
    router.push(`/${lang}/${route}?${params.toString()}`)
  }

  const hasActiveFilters = currentType || currentMinPrice || currentMaxPrice || currentGuests

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden mb-4 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-between"
      >
        <span>{t('results.filters.title')}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block bg-white rounded-lg shadow-md p-6 space-y-6`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{t('results.filters.title')}</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#d4af37] hover:text-[#b8941f] font-medium"
            >
              {t('results.filters.clearAll')}
            </button>
          )}
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            {t('results.filters.propertyType')}
          </label>
          <select
            id="propertyType"
            value={currentType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.labelKey === 'allTypes' 
                  ? (lang === 'el' ? 'Όλοι οι Τύποι' : 'All Types') 
                  : t(`propertyTypes.${type.labelKey}`) || type.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('results.filters.priceRange')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder={t('results.filters.minPrice')}
              value={currentMinPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <input
              type="number"
              placeholder={t('results.filters.maxPrice')}
              value={currentMaxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
            {currentType === 'APARTMENT' 
              ? t('results.filters.apartmentCapacity') 
              : t('results.filters.guests')}
          </label>
          <input
            id="guests"
            type="number"
            min="1"
            placeholder={currentType === 'APARTMENT' 
              ? (lang === 'el' ? 'Πόσα άτομα' : 'How many people') 
              : t('results.filters.guests')}
            value={currentGuests}
            onChange={(e) => handleGuestsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>
      </div>
    </>
  )
}

