'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'

interface SortDropdownProps {
  lang?: string
}

export const SortDropdown = ({ lang = 'en' }: SortDropdownProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslation()

  const sortOptions = [
    { value: 'createdAt_desc', label: t('results.sort.newest') },
    { value: 'createdAt_asc', label: t('results.sort.oldest') },
    { value: 'basePrice_asc', label: t('results.sort.priceLow') },
    { value: 'basePrice_desc', label: t('results.sort.priceHigh') },
    { value: 'averageRating_desc', label: t('results.sort.rating') }
  ]

  const currentSort = searchParams.get('sortBy') || 'createdAt'
  const currentOrder = searchParams.get('sortOrder') || 'desc'
  const currentValue = `${currentSort}_${currentOrder}`

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('_')
    const params = new URLSearchParams(searchParams.toString())
    params.set('sortBy', sortBy)
    params.set('sortOrder', sortOrder)
    params.set('page', '1')
    router.push(`/${lang}/results?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {t('results.sort.label')}
      </label>
      <select
        id="sort"
        value={currentValue}
        onChange={(e) => handleSortChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

