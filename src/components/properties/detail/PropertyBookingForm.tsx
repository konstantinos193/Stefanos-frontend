'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Property } from '@/types/property'
import { bookingsApi } from '@/lib/api/bookings'
import { useAuthStore } from '@/lib/store/auth.store'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { CustomInput } from '@/components/ui/CustomInput'
import { CustomSelect } from '@/components/ui/CustomSelect'

type PropertyBookingFormProps = {
  property: Property
  lang: string
}

export function PropertyBookingForm({ property, lang }: PropertyBookingFormProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diffTime = checkOutDate.getTime() - checkInDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [checkIn, checkOut])

  const price = useMemo(() => {
    if (nights === 0) return { subtotal: 0, cleaning: 0, service: 0, taxes: 0, total: 0 }

    const subtotal = property.basePrice * nights
    const cleaning = property.cleaningFee || 0
    const serviceFeePercentage = property.serviceFeePercentage || 10
    const service = subtotal * (serviceFeePercentage / 100)
    const taxRate = property.taxRate || 24
    const taxes = (subtotal + cleaning + service) * (taxRate / 100)
    const total = subtotal + cleaning + service + taxes

    return { subtotal, cleaning, service, taxes, total }
  }, [nights, property.basePrice, property.cleaningFee, property.serviceFeePercentage, property.taxRate])

  const { isAuthenticated, user } = useAuthStore()
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setGuestName(user.name || '')
      setGuestEmail(user.email || '')
    }
  }, [isAuthenticated, user])

  const guestOptions = useMemo(() => {
    return Array.from({ length: property.maxGuests }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }))
  }, [property.maxGuests])

  const minCheckInDate = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  const minCheckOutDate = useMemo(() => {
    return checkIn || new Date().toISOString().split('T')[0]
  }, [checkIn])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!checkIn || !checkOut) {
      setError(lang === 'gr' ? 'Παρακαλώ επιλέξτε ημερομηνίες' : 'Please select dates')
      return
    }

    if (guests > property.maxGuests) {
      setError(
        lang === 'gr' 
          ? `Μέγιστος αριθμός επισκεπτών: ${property.maxGuests}`
          : `Maximum guests: ${property.maxGuests}`
      )
      return
    }

    if (!guestName || !guestEmail) {
      setError(lang === 'gr' ? 'Παρακαλώ συμπληρώστε όνομα και email' : 'Please fill in name and email')
      return
    }

    setLoading(true)

    try {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const response = await bookingsApi.create({
        propertyId: property.id,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests,
        guestName,
        guestEmail,
        guestPhone: guestPhone || undefined,
        specialRequests: specialRequests || undefined,
      })

      if (response.success && response.data) {
        router.push(`/${lang}/bookings/${response.data.id}/payment`)
      } else {
        throw new Error('Failed to create booking')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }, [checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests, property.id, property.maxGuests, lang, router])

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            {property.basePrice.toFixed(2)} {property.currency}
          </span>
          <span className="text-gray-600">
            {lang === 'gr' ? 'ανά βράδυ' : 'per night'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'gr' ? 'Άφιξη' : 'Check-in'}
            </label>
            <CustomDatePicker
              value={checkIn || ''}
              onChange={setCheckIn}
              placeholder={lang === 'gr' ? 'Επιλέξτε ημερομηνία' : 'Select date'}
              minDate={minCheckInDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'gr' ? 'Αναχώρηση' : 'Check-out'}
            </label>
            <CustomDatePicker
              value={checkOut || ''}
              onChange={setCheckOut}
              placeholder={lang === 'gr' ? 'Επιλέξτε ημερομηνία' : 'Select date'}
              minDate={minCheckOutDate}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Επισκέπτες' : 'Guests'}
          </label>
          <CustomSelect
            value={guests.toString()}
            onChange={(value) => setGuests(parseInt(value))}
            options={guestOptions}
          />
        </div>

        {!isAuthenticated && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'gr' ? 'Όνομα' : 'Full Name'} *
              </label>
              <CustomInput
                type="text"
                value={guestName}
                onChange={setGuestName}
                placeholder={lang === 'gr' ? 'Το όνομά σας' : 'Your name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'gr' ? 'Email' : 'Email'} *
              </label>
              <CustomInput
                type="email"
                value={guestEmail}
                onChange={setGuestEmail}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'gr' ? 'Τηλέφωνο' : 'Phone'} (optional)
              </label>
              <CustomInput
                type="tel"
                value={guestPhone}
                onChange={setGuestPhone}
                placeholder={lang === 'gr' ? '+30 123 456 7890' : '+1 234 567 8900'}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Ειδικά αιτήματα' : 'Special Requests'} (optional)
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={lang === 'gr' ? 'Πείτε μας αν χρειάζεστε κάτι ειδικό...' : 'Tell us if you need anything special...'}
          />
        </div>

        {nights > 0 && (
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {property.basePrice.toFixed(2)} {property.currency} × {nights}{' '}
                {lang === 'gr' ? 'βράδια' : 'nights'}
              </span>
              <span className="text-gray-900">{price.subtotal.toFixed(2)} {property.currency}</span>
            </div>
            {price.cleaning > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{lang === 'gr' ? 'Καθαρισμός' : 'Cleaning fee'}</span>
                <span className="text-gray-900">{price.cleaning.toFixed(2)} {property.currency}</span>
              </div>
            )}
            {price.service > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{lang === 'gr' ? 'Υπηρεσία' : 'Service fee'}</span>
                <span className="text-gray-900">{price.service.toFixed(2)} {property.currency}</span>
              </div>
            )}
            {price.taxes > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{lang === 'gr' ? 'Φόροι' : 'Taxes'}</span>
                <span className="text-gray-900">{price.taxes.toFixed(2)} {property.currency}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
              <span className="text-gray-900">{lang === 'gr' ? 'Σύνολο' : 'Total'}</span>
              <span className="text-gray-900">{price.total.toFixed(2)} {property.currency}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !checkIn || !checkOut}
          className="w-full bg-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading
            ? (lang === 'gr' ? 'Επεξεργασία...' : 'Processing...')
            : (lang === 'gr' ? 'Κράτηση' : 'Book Now')}
        </button>
      </form>
    </div>
  )
}

