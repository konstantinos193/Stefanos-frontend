'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { bookingsApi } from '@/lib/api/bookings'
import { paymentsApi, PaymentMethod } from '@/lib/api/payments'
import { useAuthStore } from '@/lib/store/auth.store'

export default function BookingPaymentPage() {
  const router = useRouter()
  const params = useParams()
  const { lang, id } = params
  const { isAuthenticated } = useAuthStore()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${lang}/auth/login?redirect=/bookings/${id}/payment`)
      return
    }

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
  }, [id, isAuthenticated, lang, router])

  const handlePayment = async () => {
    if (!booking) return

    setProcessing(true)
    setError(null)

    try {
      // Create payment intent on backend
      const response = await paymentsApi.processPayment({
        bookingId: booking.id,
        method: paymentMethod,
        amount: booking.totalPrice,
        currency: booking.currency || 'EUR',
      })

      // For card payments, the backend creates a payment intent
      // Payment confirmation happens via Stripe webhook on the backend
      // For non-card methods, payment is processed directly
      if (response.stripePaymentIntentId) {
        // Payment intent created - backend will handle confirmation via webhook
        // Poll for payment status or redirect to confirmation page
        // The webhook will update the payment status automatically
        setTimeout(() => {
          router.push(`/${lang}/bookings/${id}/confirmation`)
        }, 2000)
      } else {
        // Non-Stripe payment method - redirect immediately
        router.push(`/${lang}/bookings/${id}/confirmation`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed')
      setProcessing(false)
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

  if (error && !booking) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => router.push(`/${lang}/bookings`)}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                {lang === 'gr' ? 'Πίσω στις κρατήσεις' : 'Back to bookings'}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!booking) return null

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {lang === 'gr' ? 'Ολοκλήρωση Πληρωμής' : 'Complete Payment'}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {lang === 'gr' ? 'Στοιχεία Κράτησης' : 'Booking Details'}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'gr' ? 'Ακίνητο' : 'Property'}</span>
                    <span className="font-medium">{booking.property?.titleEn || booking.property?.titleGr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'gr' ? 'Άφιξη' : 'Check-in'}</span>
                    <span className="font-medium">
                      {new Date(booking.checkIn).toLocaleDateString(lang === 'gr' ? 'el-GR' : 'en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'gr' ? 'Αναχώρηση' : 'Check-out'}</span>
                    <span className="font-medium">
                      {new Date(booking.checkOut).toLocaleDateString(lang === 'gr' ? 'el-GR' : 'en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'gr' ? 'Επισκέπτες' : 'Guests'}</span>
                    <span className="font-medium">{booking.guests}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {lang === 'gr' ? 'Μέθοδος Πληρωμής' : 'Payment Method'}
                </h2>
                <div className="space-y-3">
                  {(['CREDIT_CARD', 'DEBIT_CARD', 'APPLE_PAY', 'GOOGLE_PAY'] as PaymentMethod[]).map((method) => (
                    <label
                      key={method}
                      className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="mr-3"
                      />
                      <span className="font-medium">
                        {method.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {lang === 'gr' ? 'Σύνοψη' : 'Summary'}
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{lang === 'gr' ? 'Βασική τιμή' : 'Base price'}</span>
                    <span className="font-medium">
                      {booking.basePrice.toFixed(2)} {booking.currency}
                    </span>
                  </div>
                  {booking.cleaningFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'gr' ? 'Καθαρισμός' : 'Cleaning fee'}</span>
                      <span className="font-medium">
                        {booking.cleaningFee.toFixed(2)} {booking.currency}
                      </span>
                    </div>
                  )}
                  {booking.serviceFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'gr' ? 'Υπηρεσία' : 'Service fee'}</span>
                      <span className="font-medium">
                        {booking.serviceFee.toFixed(2)} {booking.currency}
                      </span>
                    </div>
                  )}
                  {booking.taxes > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{lang === 'gr' ? 'Φόροι' : 'Taxes'}</span>
                      <span className="font-medium">
                        {booking.taxes.toFixed(2)} {booking.currency}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-200 font-semibold text-lg">
                    <span>{lang === 'gr' ? 'Σύνολο' : 'Total'}</span>
                    <span>
                      {booking.totalPrice.toFixed(2)} {booking.currency}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-accent-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing
                    ? (lang === 'gr' ? 'Επεξεργασία...' : 'Processing...')
                    : (lang === 'gr' ? 'Ολοκλήρωση Πληρωμής' : 'Complete Payment')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

