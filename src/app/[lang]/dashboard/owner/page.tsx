'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/lib/store/auth.store'
import { propertiesApi } from '@/lib/api/properties'
import { bookingsApi } from '@/lib/api/bookings'
import { paymentsApi } from '@/lib/api/payments'
import { Property } from '@/types/property'
import { Booking } from '@/types/booking'
import { formatDateEU } from '@/lib/utils/date'

export default function OwnerDashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user, checkAuth } = useAuthStore()
  const [properties, setProperties] = useState<Property[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [payouts, setPayouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayouts: 0,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth().then(() => {
        if (!isAuthenticated || user?.role !== 'OWNER') {
          router.push('/auth/login')
        }
      })
    }
  }, [isAuthenticated, user, checkAuth, router])

  useEffect(() => {
    if (isAuthenticated && user?.role === 'OWNER') {
      loadDashboardData()
    }
  }, [isAuthenticated, user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load properties
      const propertiesResponse = await propertiesApi.search({ page: '1', limit: '10' })
      if (propertiesResponse.success) {
        setProperties(propertiesResponse.data.properties || [])
        setStats((prev) => ({ ...prev, totalProperties: propertiesResponse.data.pagination.total }))
      }

      // Load bookings
      const bookingsResponse = await bookingsApi.getAll({ limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data.bookings || [])
        setStats((prev) => ({ ...prev, totalBookings: bookingsResponse.data.pagination.total }))

        // Calculate revenue
        const revenue = bookingsResponse.data.bookings.reduce(
          (sum: number, booking: Booking) => sum + (booking.ownerRevenue || 0),
          0
        )
        setStats((prev) => ({ ...prev, totalRevenue: revenue }))
      }

      // Load payouts
      try {
        const payoutsData = await paymentsApi.getOwnerPayouts()
        setPayouts(payoutsData || [])
        const pending = payoutsData?.filter((p: any) => p.status === 'PENDING').length || 0
        setStats((prev) => ({ ...prev, pendingPayouts: pending }))
      } catch (err) {
        console.error('Failed to load payouts:', err)
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || user?.role !== 'OWNER') {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your properties and track your earnings</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Properties</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-accent-blue">{stats.totalBookings}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-accent-green">
                €{stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Payouts</h3>
              <p className="text-3xl font-bold text-accent-orange">{stats.pendingPayouts}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Properties Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
                <Link
                  href="/properties/new"
                  className="text-sm text-accent-blue hover:text-blue-700 font-medium"
                >
                  + Add Property
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : properties.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p className="mb-4">No properties yet</p>
                    <Link
                      href="/properties/new"
                      className="text-accent-blue hover:text-blue-700 font-medium"
                    >
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  properties.map((property) => (
                    <div key={property.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {property.titleEn || property.titleGr}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {property.address}, {property.city}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {property.basePrice.toFixed(2)} {property.currency} / night
                          </p>
                        </div>
                        <Link
                          href={`/properties/${property.id}/edit`}
                          className="ml-4 text-accent-blue hover:text-blue-700 font-medium"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bookings Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : bookings.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No bookings yet</div>
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
                            Revenue: €{(booking.ownerRevenue || 0).toFixed(2)}
                          </p>
                        </div>
                        <span
                          className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Payouts Section */}
          {payouts.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Payouts</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {payouts.map((payout: any) => (
                  <div key={payout.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">€{payout.amount?.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">
                          {formatDateEU(payout.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payout.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : payout.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {payout.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

