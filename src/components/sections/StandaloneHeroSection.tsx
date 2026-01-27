'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { LocationAutocomplete } from '@/components/ui/LocationAutocomplete'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { CustomSelect } from '@/components/ui/CustomSelect'

type BookingSearchData = {
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

export const StandaloneHeroSection = () => {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const [searchMode, setSearchMode] = useState<string>('booking')
  const [searchData, setSearchData] = useState<BookingSearchData>({
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
    if (!searchData.checkIn) return minCheckInDate
    const checkInDate = new Date(searchData.checkIn)
    checkInDate.setDate(checkInDate.getDate() + 1)
    return checkInDate.toISOString().split('T')[0]
  }, [searchData.checkIn, minCheckInDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
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
    <div className="flex flex-col items-center text-center w-full">
      <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight px-2 sm:px-0">
          {t('hero.title')}
          <span className="block text-[#d4af37] mt-1 sm:mt-2">{t('hero.titleHighlight')}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
          {t('hero.description')}
        </p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-5 px-2 sm:px-0 flex justify-center">
        <div className="relative inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white backdrop-blur-xl border border-gray-200 p-1 sm:p-1.5 shadow-lg">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/5 via-transparent to-[#d4af37]/5 pointer-events-none"></div>
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm"></div>
          
          <button
            type="button"
            onClick={() => setSearchMode('real-estate')}
            className={`group relative flex items-center gap-1.5 sm:gap-2 md:gap-2.5 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-2 focus:ring-offset-white ${
              searchMode === 'real-estate'
                ? 'bg-gradient-to-r from-[#d4af37] via-[#d4af37] to-[#b8941f] text-black shadow-lg shadow-[#d4af37]/40 scale-[1.02]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {searchMode === 'real-estate' ? (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/15 to-transparent"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10"></div>
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#d4af37] via-[#d4af37] to-[#b8941f] opacity-90"></div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#d4af37]/30 to-[#b8941f]/40 blur-lg opacity-60"></div>
                <div className="absolute inset-0 rounded-full ring-[1.5px] ring-white/30"></div>
                <div className="absolute inset-[1px] rounded-full ring-[0.5px] ring-black/20"></div>
                <span className="relative z-10 text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-black drop-shadow-sm">
                  {t('searchModes.realEstate.label')}
                </span>
                <span className="relative z-10 hidden text-[10px] sm:text-xs md:text-xs lg:text-xs font-semibold sm:inline whitespace-nowrap transition-colors duration-300 text-gray-700">
                  {t('searchModes.realEstate.description')}
                </span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-gray-600 group-hover:text-gray-900">
                  {t('searchModes.realEstate.label')}
                </span>
                <span className="relative z-10 hidden text-[10px] sm:text-xs md:text-xs lg:text-xs font-semibold sm:inline whitespace-nowrap transition-colors duration-300 text-gray-500 group-hover:text-gray-700">
                  {t('searchModes.realEstate.description')}
                </span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setSearchMode('booking')}
            className={`group relative flex items-center gap-1.5 sm:gap-2 md:gap-2.5 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-2 focus:ring-offset-white ${
              searchMode === 'booking'
                ? 'bg-gradient-to-r from-[#d4af37] via-[#d4af37] to-[#b8941f] text-black shadow-lg shadow-[#d4af37]/40 scale-[1.02]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {searchMode === 'booking' ? (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/15 to-transparent"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10"></div>
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#d4af37] via-[#d4af37] to-[#b8941f] opacity-90"></div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#d4af37]/30 to-[#b8941f]/40 blur-lg opacity-60"></div>
                <div className="absolute inset-0 rounded-full ring-[1.5px] ring-white/30"></div>
                <div className="absolute inset-[1px] rounded-full ring-[0.5px] ring-black/20"></div>
                <span className="relative z-10 text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-black drop-shadow-sm">
                  {t('searchModes.booking.label')}
                </span>
                <span className="relative z-10 hidden text-[10px] sm:text-xs md:text-xs lg:text-xs font-semibold sm:inline whitespace-nowrap transition-colors duration-300 text-gray-700">
                  {t('searchModes.booking.description')}
                </span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-gray-600 group-hover:text-gray-900">
                  {t('searchModes.booking.label')}
                </span>
                <span className="relative z-10 hidden text-[10px] sm:text-xs md:text-xs lg:text-xs font-semibold sm:inline whitespace-nowrap transition-colors duration-300 text-gray-500 group-hover:text-gray-700">
                  {t('searchModes.booking.description')}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-5 md:mb-6 px-2 sm:px-0">
        <form onSubmit={handleSubmit} className="bg-transparent backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6">
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
                labelClassName="text-gray-700"
                className="bg-white border border-gray-300 text-gray-900"
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
                labelClassName="text-gray-700"
                className="bg-white border border-gray-300 text-gray-900"
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
      </div>
      
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0"></div>
    </div>
  )
}
