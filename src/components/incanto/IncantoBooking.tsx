'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { bookingsApi } from '@/lib/api/bookings'
import { useAuthStore } from '@/lib/store/auth.store'
import { CustomDatePicker } from '@/components/ui/CustomDatePicker'
import { CustomInput } from '@/components/ui/CustomInput'
import { CustomSelect } from '@/components/ui/CustomSelect'

type IncantoBookingProps = {
  lang: string
}

// L'incanto property ID - this should match an actual property in your database
// For now, we'll use a placeholder that you can update
const INCANTO_PROPERTY_ID = 'incanto-property-id' // Update this with actual property ID

export function IncantoBooking({ lang }: IncantoBookingProps) {
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

  // Default pricing for L'incanto - adjust as needed
  const basePrice = 150
  const cleaningFee = 50
  const serviceFeePercentage = 10
  const taxRate = 24
  const maxGuests = 4

  const price = useMemo(() => {
    if (nights === 0) return { subtotal: 0, cleaning: 0, service: 0, taxes: 0, total: 0 }

    const subtotal = basePrice * nights
    const cleaning = cleaningFee
    const service = subtotal * (serviceFeePercentage / 100)
    const taxes = (subtotal + cleaning + service) * (taxRate / 100)
    const total = subtotal + cleaning + service + taxes

    return { subtotal, cleaning, service, taxes, total }
  }, [nights])

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
    return Array.from({ length: maxGuests }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    }))
  }, [maxGuests])

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
      setError(lang === 'el' ? 'Παρακαλώ επιλέξτε ημερομηνίες' : 'Please select dates')
      return
    }

    if (guests > maxGuests) {
      setError(
        lang === 'el' 
          ? `Μέγιστος αριθμός επισκεπτών: ${maxGuests}`
          : `Maximum guests: ${maxGuests}`
      )
      return
    }

    if (!guestName || !guestEmail) {
      setError(lang === 'el' ? 'Παρακαλώ συμπληρώστε όνομα και email' : 'Please fill in name and email')
      return
    }

    setLoading(true)

    try {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const response = await bookingsApi.create({
        propertyId: INCANTO_PROPERTY_ID,
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
  }, [checkIn, checkOut, guests, guestName, guestEmail, guestPhone, specialRequests, lang, router])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === 'el' ? 'Κράτηση' : 'Book Your Stay'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'el'
              ? 'Κάντε την κράτησή σας στο L\'incanto και απολαύστε μια αξέχαστη διαμονή'
              : 'Book your stay at L\'incanto and enjoy an unforgettable experience'}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 md:p-8">
            {/* STEFANOS MALESKOS Real Estate Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logoetc.png"
                alt="STEFANOS MALESKOS Real Estate"
                width={180}
                height={72}
                className="h-auto w-auto max-w-[160px] object-contain opacity-90"
                unoptimized
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {basePrice.toFixed(2)} €
                </span>
                <span className="text-gray-600">
                  {lang === 'el' ? 'ανά βράδυ' : 'per night'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === 'el' ? 'Άφιξη' : 'Check-in'}
                  </label>
                  <CustomDatePicker
                    value={checkIn || ''}
                    onChange={setCheckIn}
                    placeholder={lang === 'el' ? 'Επιλέξτε ημερομηνία' : 'Select date'}
                    minDate={minCheckInDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === 'el' ? 'Αναχώρηση' : 'Check-out'}
                  </label>
                  <CustomDatePicker
                    value={checkOut || ''}
                    onChange={setCheckOut}
                    placeholder={lang === 'el' ? 'Επιλέξτε ημερομηνία' : 'Select date'}
                    minDate={minCheckOutDate}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'el' ? 'Επισκέπτες' : 'Guests'}
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
                      {lang === 'el' ? 'Όνομα' : 'Full Name'} *
                    </label>
                    <CustomInput
                      type="text"
                      value={guestName}
                      onChange={setGuestName}
                      placeholder={lang === 'el' ? 'Το όνομά σας' : 'Your name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {lang === 'el' ? 'Email' : 'Email'} *
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
                      {lang === 'el' ? 'Τηλέφωνο' : 'Phone'} (optional)
                    </label>
                    <CustomInput
                      type="tel"
                      value={guestPhone}
                      onChange={setGuestPhone}
                      placeholder={lang === 'el' ? '+30 123 456 7890' : '+1 234 567 8900'}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'el' ? 'Ειδικά αιτήματα' : 'Special Requests'} (optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={lang === 'el' ? 'Πείτε μας αν χρειάζεστε κάτι ειδικό...' : 'Tell us if you need anything special...'}
                />
              </div>

              {nights > 0 && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {basePrice.toFixed(2)} € × {nights}{' '}
                      {lang === 'el' ? 'βράδια' : 'nights'}
                    </span>
                    <span className="text-gray-900">{price.subtotal.toFixed(2)} €</span>
                  </div>
                  {price.cleaning > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'el' ? 'Καθαρισμός' : 'Cleaning fee'}</span>
                      <span className="text-gray-900">{price.cleaning.toFixed(2)} €</span>
                    </div>
                  )}
                  {price.service > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'el' ? 'Υπηρεσία' : 'Service fee'}</span>
                      <span className="text-gray-900">{price.service.toFixed(2)} €</span>
                    </div>
                  )}
                  {price.taxes > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'el' ? 'Φόροι' : 'Taxes'}</span>
                      <span className="text-gray-900">{price.taxes.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                    <span className="text-gray-900">{lang === 'el' ? 'Σύνολο' : 'Total'}</span>
                    <span className="text-gray-900">{price.total.toFixed(2)} €</span>
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
                  ? (lang === 'el' ? 'Επεξεργασία...' : 'Processing...')
                  : (lang === 'el' ? 'Κράτηση' : 'Book Now')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

