'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/lib/store/auth.store';
import { bookingsApi, Booking } from '@/lib/api/bookings';
import Link from 'next/link';
import { formatDateEU } from '@/lib/utils/date';

export default function BookingsPage() {
  const router = useRouter();
  const { isAuthenticated, user, token } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadBookings();
  }, [isAuthenticated, router]);

  const loadBookings = async () => {
    // Skip API call for mock users
    if (token && token.startsWith('mock-token-')) {
      setBookings([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await bookingsApi.getAll();
      if (response.success) {
        setBookings(response.data.bookings);
      }
    } catch (err: any) {
      // Only show error if it's not a token-related error for mock users
      if (!token || !token.startsWith('mock-token-')) {
        setError(err.message || 'Failed to load bookings');
      } else {
        setBookings([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingsApi.cancel(bookingId, { reason: 'User requested cancellation' });
      loadBookings();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

          {error && !(token && token.startsWith('mock-token-')) && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
              <Link
                href="/properties"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {booking.property?.titleEn || 'Property'}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {booking.property?.address}, {booking.property?.city}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : booking.status === 'COMPLETED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Check-in</p>
                          <p className="font-medium text-gray-900">
                            {formatDateEU(booking.checkIn)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Check-out</p>
                          <p className="font-medium text-gray-900">
                            {formatDateEU(booking.checkOut)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Guests</p>
                          <p className="font-medium text-gray-900">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Price</p>
                          <p className="font-medium text-gray-900">
                            {booking.totalPrice.toFixed(2)} {booking.currency}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                      >
                        View Details
                      </Link>
                      {booking.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

