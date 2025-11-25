'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { CustomInput } from '@/components/ui/CustomInput'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { LocationAutocomplete } from '@/components/ui/LocationAutocomplete'

type BookingSearchData = {
  location: string
  checkIn: string
  checkOut: string
  guests: string
}

type SearchFormProps = {
  onSubmit?: (data: BookingSearchData) => void
}

const getGuestOptions = (t: (key: string) => string) => [
  { value: '1', label: t('search.oneGuest') },
  { value: '2', label: `2 ${t('booking.search.guestsPlural')}` },
  { value: '3', label: `3 ${t('booking.search.guestsPlural')}` },
  { value: '4', label: `4 ${t('booking.search.guestsPlural')}` },
  { value: '5', label: `5 ${t('booking.search.guestsPlural')}` },
  { value: '6', label: `6 ${t('booking.search.guestsPlural')}` },
  { value: '7', label: `7 ${t('booking.search.guestsPlural')}` },
  { value: '8', label: `8 ${t('booking.search.guestsPlural')}` }
]

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const [searchData, setSearchData] = useState<BookingSearchData>({
    location: 'Preveza, Greece', // Default to Preveza as per requirements
    checkIn: '',
    checkOut: '',
    guests: '1'
  })

  const minCheckInDate = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today.toISOString().split('T')[0]
  }, [])

  const minCheckOutDate = useMemo(() => {
    if (!searchData.checkIn) return minCheckInDate
    const checkInDate = new Date(searchData.checkIn)
    checkInDate.setDate(checkInDate.getDate() + 1)
    return checkInDate.toISOString().split('T')[0]
  }, [searchData.checkIn, minCheckInDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (onSubmit) {
      onSubmit(searchData)
      return
    }

    const params = new URLSearchParams()
    if (searchData.location) params.set('location', searchData.location)
    if (searchData.checkIn) {
      const checkInDate = new Date(searchData.checkIn)
      params.set('checkIn', checkInDate.toISOString())
    }
    if (searchData.checkOut) {
      const checkOutDate = new Date(searchData.checkOut)
      params.set('checkOut', checkOutDate.toISOString())
    }
    if (searchData.guests) params.set('guests', searchData.guests)

    router.push(`/${lang}/results?${params.toString()}`)
  }

  const handleInputChange = (field: keyof BookingSearchData, value: string) => {
    setSearchData(prev => {
      const updated = {
        ...prev,
        [field]: value
      }
      
      if (field === 'checkIn' && prev.checkOut && value) {
        const checkInDate = new Date(value)
        const checkOutDate = new Date(prev.checkOut)
        if (checkOutDate <= checkInDate) {
          updated.checkOut = ''
        }
      }
      
      return updated
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#d4af37]/30 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-4">
        <div className="lg:col-span-2">
          <LocationAutocomplete
            id="location"
            label={t('search.location')}
            placeholder={t('search.locationPlaceholder')}
            value={searchData.location}
            onChange={(value) => handleInputChange('location', value)}
          />
        </div>
        
        <div>
          <CustomDatePicker
            id="checkIn"
            label={t('search.checkIn')}
            value={searchData.checkIn}
            onChange={(value) => handleInputChange('checkIn', value)}
            placeholder={t('search.selectCheckInDate')}
            minDate={minCheckInDate}
          />
        </div>
        
        <div>
          <CustomDatePicker
            id="checkOut"
            label={t('search.checkOut')}
            value={searchData.checkOut}
            onChange={(value) => handleInputChange('checkOut', value)}
            placeholder={t('search.selectCheckOutDate')}
            minDate={minCheckOutDate}
          />
        </div>
        
        <div>
          <CustomSelect
            id="guests"
            label={t('search.guests')}
            value={searchData.guests}
            onChange={(value) => handleInputChange('guests', value)}
            options={getGuestOptions(t)}
            placeholder={t('search.oneGuest')}
          />
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center">
        <button
          type="submit"
          id="search-properties-button-booking"
          className="w-full sm:w-auto px-8 py-3 bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 transform hover:scale-105 active:scale-95"
        >
          {t('search.searchProperties')}
        </button>
      </div>
    </form>
  )
}
