'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { LocationAutocomplete } from '@/components/ui/LocationAutocomplete'
import { RealEstateSearchForm } from './RealEstateSearchForm'

type ShortTermSearchData = {
  location: string
  checkIn: string
  checkOut: string
  guests: string
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

export const RentalSearchForm = () => {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const [mode, setMode] = useState<'longTerm' | 'shortTerm'>('longTerm')
  const [shortTermData, setShortTermData] = useState<ShortTermSearchData>({
    location: 'Arta, Greece',
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
    if (!shortTermData.checkIn) return minCheckInDate
    const checkInDate = new Date(shortTermData.checkIn)
    checkInDate.setDate(checkInDate.getDate() + 1)
    return checkInDate.toISOString().split('T')[0]
  }, [shortTermData.checkIn, minCheckInDate])

  const handleShortTermSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (shortTermData.location) params.set('location', shortTermData.location)
    if (shortTermData.checkIn) {
      const checkInDate = new Date(shortTermData.checkIn)
      params.set('checkIn', checkInDate.toISOString())
    }
    if (shortTermData.checkOut) {
      const checkOutDate = new Date(shortTermData.checkOut)
      params.set('checkOut', checkOutDate.toISOString())
    }
    if (shortTermData.guests) params.set('guests', shortTermData.guests)
    router.push(`/${lang}/results?${params.toString()}`)
  }

  const handleShortTermChange = (field: keyof ShortTermSearchData, value: string) => {
    setShortTermData(prev => {
      const updated = { ...prev, [field]: value }
      if (field === 'checkIn' && prev.checkOut && value) {
        const checkInDate = new Date(value)
        const checkOutDate = new Date(prev.checkOut)
        if (checkOutDate <= checkInDate) updated.checkOut = ''
      }
      return updated
    })
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 sm:mb-5">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode('longTerm')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
              mode === 'longTerm'
                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('hero.parts.rent.longTerm')}
          </button>
          <button
            type="button"
            onClick={() => setMode('shortTerm')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 ${
              mode === 'shortTerm'
                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('hero.parts.rent.shortTerm')}
          </button>
        </div>
      </div>

      {mode === 'longTerm' ? (
        <RealEstateSearchForm intention="rent" idPrefix="rent" />
      ) : (
        <form
          onSubmit={handleShortTermSubmit}
          className="bg-transparent backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-4">
            <div className="lg:col-span-2">
              <LocationAutocomplete
                id="rent-st-location"
                label={t('search.location')}
                placeholder={t('search.locationPlaceholder')}
                value={shortTermData.location}
                onChange={(v) => handleShortTermChange('location', v)}
              />
            </div>
            <div>
              <CustomDatePicker
                id="rent-st-checkIn"
                label={t('search.checkIn')}
                value={shortTermData.checkIn}
                onChange={(v) => handleShortTermChange('checkIn', v)}
                placeholder={t('search.selectCheckInDate')}
                minDate={minCheckInDate}
                labelClassName="text-gray-700"
                className="bg-white border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <CustomDatePicker
                id="rent-st-checkOut"
                label={t('search.checkOut')}
                value={shortTermData.checkOut}
                onChange={(v) => handleShortTermChange('checkOut', v)}
                placeholder={t('search.selectCheckOutDate')}
                minDate={minCheckOutDate}
                labelClassName="text-gray-700"
                className="bg-white border border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <CustomSelect
                id="rent-st-guests"
                label={t('search.guests')}
                value={shortTermData.guests}
                onChange={(v) => handleShortTermChange('guests', v)}
                options={getGuestOptions(t)}
                placeholder={t('search.oneGuest')}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center">
            <button
              type="submit"
              id="search-properties-button-rent-shortterm"
              className="w-full sm:w-auto px-8 py-3 bg-[#d4af37] hover:bg-[#b8941f] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 transform hover:scale-105 active:scale-95"
            >
              {t('search.searchProperties')}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
