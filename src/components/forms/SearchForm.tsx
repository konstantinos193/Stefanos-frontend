'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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

const guestOptions = [
  { value: '1', label: '1 Guest' },
  { value: '2', label: '2 Guests' },
  { value: '3', label: '3 Guests' },
  { value: '4', label: '4 Guests' },
  { value: '5', label: '5 Guests' },
  { value: '6', label: '6 Guests' },
  { value: '7', label: '7 Guests' },
  { value: '8', label: '8 Guests' }
]

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
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
            label="Location"
            placeholder="Preveza, Greece"
            value={searchData.location}
            onChange={(value) => handleInputChange('location', value)}
          />
        </div>
        
        <div>
          <CustomDatePicker
            id="checkIn"
            label="Check In"
            value={searchData.checkIn}
            onChange={(value) => handleInputChange('checkIn', value)}
            placeholder="Select check-in date"
            minDate={minCheckInDate}
          />
        </div>
        
        <div>
          <CustomDatePicker
            id="checkOut"
            label="Check Out"
            value={searchData.checkOut}
            onChange={(value) => handleInputChange('checkOut', value)}
            placeholder="Select check-out date"
            minDate={minCheckOutDate}
          />
        </div>
        
        <div>
          <CustomSelect
            id="guests"
            label="Guests"
            value={searchData.guests}
            onChange={(value) => handleInputChange('guests', value)}
            options={guestOptions}
            placeholder="1 Guest"
          />
        </div>
      </div>
      
      <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center">
        <button
          type="submit"
          id="search-properties-button-booking"
          className="search-properties-button px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none cursor-pointer"
          style={{ 
            background: 'transparent',
            backgroundImage: 'none',
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#ffffff'
          }}
        >
          Search Properties
        </button>
      </div>
    </form>
  )
}
