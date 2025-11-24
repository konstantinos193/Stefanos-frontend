'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/lib/store/auth.store'
import { bookingsApi } from '@/lib/api/bookings'
import { Booking } from '@/types/booking'
import { formatDateEU } from '@/lib/utils/date'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user, checkAuth } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth().then(() => {
        if (!isAuthenticated) {
          router.push('/auth/login')
        }
      })
    }
  }, [isAuthenticated, checkAuth, router])

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBookings = async () => {
        try {
          const response = await bookingsApi.getAll({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })
          if (response.success && response.data) {
            setBookings(response.data.bookings || [])
          }
        } catch (err) {
          console.error('Failed to load bookings:', err)
        } finally {
          setLoading(false)
        }
      }

      fetchBookings()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.name ? `Welcome, ${user.name}` : 'Dashboard'}
            </h1>
            <p className="text-gray-600">Manage your bookings and account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming</h3>
              <p className="text-3xl font-bold text-accent-blue">
                {bookings.filter((b) => new Date(b.checkIn) > new Date() && b.status === 'CONFIRMED').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-accent-green">
                {bookings.filter((b) => b.status === 'CHECKED_OUT').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading...</div>
              ) : bookings.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p className="mb-4">No bookings yet</p>
                  <Link
                    href="/properties"
                    className="text-accent-blue hover:text-blue-700 font-medium"
                  >
                    Browse Properties
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.property?.titleEn || booking.property?.titleGr || 'Property'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDateEU(booking.checkIn)} - {formatDateEU(booking.checkOut)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {booking.totalPrice.toFixed(2)} {booking.currency}
                        </p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="ml-4 text-accent-blue hover:text-blue-700 font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

