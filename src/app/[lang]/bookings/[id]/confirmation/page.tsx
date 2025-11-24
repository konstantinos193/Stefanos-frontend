'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { bookingsApi } from '@/lib/api/bookings'
import { CheckIcon } from '@/components/icons'
import { formatDateEU } from '@/lib/utils/date'

export default function BookingConfirmationPage() {
  const router = useRouter()
  const params = useParams()
  const { lang, id } = params
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingsApi.getById(id as string)
        if (response.success && response.data) {
          setBooking(response.data)
        }
      } catch (err) {
        console.error('Failed to load booking:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!booking) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">{lang === 'gr' ? 'Κράτηση δεν βρέθηκε' : 'Booking not found'}</p>
              <Link
                href={`/${lang}/bookings`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-700"
              >
                {lang === 'gr' ? 'Πίσω στις κρατήσεις' : 'Back to bookings'}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {lang === 'gr' ? 'Κράτηση Επιβεβαιώθηκε!' : 'Booking Confirmed!'}
            </h1>

            <p className="text-gray-600 mb-8">
              {lang === 'gr'
                ? 'Η κράτησή σας έχει επιβεβαιωθεί. Έχετε λάβει email με όλες τις λεπτομέρειες.'
                : 'Your booking has been confirmed. You have received an email with all the details.'}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {lang === 'gr' ? 'Στοιχεία Κράτησης' : 'Booking Details'}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{lang === 'gr' ? 'Κωδικός Κράτησης' : 'Booking ID'}</span>
                  <span className="font-mono text-sm">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{lang === 'gr' ? 'Ακίνητο' : 'Property'}</span>
                  <span className="font-medium">{booking.property?.titleEn || booking.property?.titleGr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{lang === 'gr' ? 'Άφιξη' : 'Check-in'}</span>
                  <span className="font-medium">
                    {formatDateEU(booking.checkIn)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{lang === 'gr' ? 'Αναχώρηση' : 'Check-out'}</span>
                  <span className="font-medium">
                    {formatDateEU(booking.checkOut)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{lang === 'gr' ? 'Επισκέπτες' : 'Guests'}</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600 font-semibold">{lang === 'gr' ? 'Σύνολο' : 'Total'}</span>
                  <span className="font-bold text-lg">
                    {booking.totalPrice.toFixed(2)} {booking.currency}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href={`/${lang}/bookings/${id}`}
                className="px-6 py-3 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {lang === 'gr' ? 'Προβολή Κράτησης' : 'View Booking'}
              </Link>
              <Link
                href={`/${lang}/properties/${booking.propertyId}`}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                {lang === 'gr' ? 'Προβολή Ακινήτου' : 'View Property'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

