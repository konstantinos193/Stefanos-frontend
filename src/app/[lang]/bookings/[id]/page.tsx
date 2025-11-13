'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { bookingsApi } from '@/lib/api/bookings'
import { Booking } from '@/types/booking'

export default function BookingDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { lang, id } = params
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingsApi.getById(id as string)
        if (response.success && response.data) {
          setBooking(response.data)
        } else {
          setError('Booking not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const handleCancel = async () => {
    if (!booking || !confirm(lang === 'gr' ? 'Είστε σίγουροι ότι θέλετε να ακυρώσετε αυτή την κράτηση;' : 'Are you sure you want to cancel this booking?')) {
      return
    }

    try {
      await bookingsApi.cancel(booking.id, { reason: 'User requested cancellation' })
      router.push(`/${lang}/bookings`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to cancel booking')
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

  if (error || !booking) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-red-600">{error || 'Booking not found'}</p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link
              href={`/${lang}/bookings`}
              className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
            >
              ← {lang === 'gr' ? 'Πίσω στις κρατήσεις' : 'Back to bookings'}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {lang === 'gr' ? 'Λεπτομέρειες Κράτησης' : 'Booking Details'}
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {booking.property?.titleEn || booking.property?.titleGr || 'Property'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {booking.property?.address}, {booking.property?.city}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  booking.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : booking.status === 'CANCELLED'
                    ? 'bg-red-100 text-red-800'
                    : booking.status === 'CHECKED_OUT'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Κωδικός Κράτησης' : 'Booking ID'}
                </h3>
                <p className="font-mono text-sm">{booking.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Κατάσταση Πληρωμής' : 'Payment Status'}
                </h3>
                <p className="font-medium">{booking.paymentStatus}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Άφιξη' : 'Check-in'}
                </h3>
                <p className="font-medium">
                  {new Date(booking.checkIn).toLocaleDateString(lang === 'gr' ? 'el-GR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Αναχώρηση' : 'Check-out'}
                </h3>
                <p className="font-medium">
                  {new Date(booking.checkOut).toLocaleDateString(lang === 'gr' ? 'el-GR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Επισκέπτες' : 'Guests'}
                </h3>
                <p className="font-medium">{booking.guests}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Σύνολο' : 'Total Price'}
                </h3>
                <p className="font-bold text-lg">
                  {booking.totalPrice.toFixed(2)} {booking.currency}
                </p>
              </div>
            </div>

            {booking.specialRequests && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {lang === 'gr' ? 'Ειδικά Αιτήματα' : 'Special Requests'}
                </h3>
                <p className="text-gray-700">{booking.specialRequests}</p>
              </div>
            )}

            <div className="pt-6 border-t border-gray-200">
              <div className="flex gap-4">
                {booking.status === 'CONFIRMED' && (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    {lang === 'gr' ? 'Ακύρωση Κράτησης' : 'Cancel Booking'}
                  </button>
                )}
                {booking.propertyId && (
                  <Link
                    href={`/${lang}/properties/${booking.propertyId}`}
                    className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {lang === 'gr' ? 'Προβολή Ακινήτου' : 'View Property'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

