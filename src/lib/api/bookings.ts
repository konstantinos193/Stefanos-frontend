import { apiClient } from './client';
import { mockBookings, allMockProperties } from '@/lib/mockData';

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true;

export interface CreateBookingDto {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
  paymentMethod?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  status: string;
  paymentStatus: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  basePrice: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  currency: string;
  ownerRevenue?: number;
  platformFee?: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
  property?: {
    id: string;
    titleEn: string;
    titleGr: string;
    images: string[];
    address: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CancelBookingDto {
  reason?: string;
}

function generateMockBooking(data: CreateBookingDto): Booking {
  const property = allMockProperties.find(p => p.id === data.propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  const basePrice = property.basePrice * nights;
  const cleaningFee = property.cleaningFee || 0;
  const serviceFee = basePrice * 0.1;
  const taxes = (basePrice + cleaningFee + serviceFee) * 0.13;
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  return {
    id: `booking-${Date.now()}`,
    propertyId: data.propertyId,
    guestId: `guest-${Date.now()}`,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: data.guests,
    totalPrice: Math.round(totalPrice),
    basePrice: Math.round(basePrice),
    cleaningFee: Math.round(cleaningFee),
    serviceFee: Math.round(serviceFee),
    taxes: Math.round(taxes),
    currency: property.currency,
    ownerRevenue: Math.round(basePrice * 0.9),
    platformFee: Math.round(serviceFee),
    guestName: data.guestName,
    guestEmail: data.guestEmail,
    guestPhone: data.guestPhone,
    specialRequests: data.specialRequests,
    property: {
      id: property.id,
      titleEn: property.titleEn,
      titleGr: property.titleGr,
      images: property.images.slice(0, 1),
      address: property.address,
      city: property.city,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const bookingsApi = {
  async create(data: CreateBookingDto): Promise<{ success: boolean; data: Booking }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const booking = generateMockBooking(data);
      return { success: true, data: booking };
    }

    return apiClient.post('/bookings', data);
  },

  async getAll(params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ success: boolean; data: { bookings: Booking[]; pagination: any } }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      let bookings = [...mockBookings];
      
      // Generate more mock bookings
      for (let i = 0; i < 10; i++) {
        const property = allMockProperties[Math.floor(Math.random() * allMockProperties.length)];
        const checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + Math.floor(Math.random() * 30));
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 7) + 1);
        
        bookings.push(generateMockBooking({
          propertyId: property.id,
          checkIn: checkIn.toISOString().split('T')[0],
          checkOut: checkOut.toISOString().split('T')[0],
          guests: Math.floor(Math.random() * property.maxGuests) + 1,
          guestName: `Guest ${i + 1}`,
          guestEmail: `guest${i + 1}@example.com`,
        }));
      }

      // Sort
      if (params?.sortBy) {
        bookings.sort((a, b) => {
          const aVal = a[params.sortBy as keyof Booking] as any;
          const bVal = b[params.sortBy as keyof Booking] as any;
          if (params.sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
          } else {
            return aVal < bVal ? 1 : -1;
          }
        });
      }

      // Paginate
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = bookings.slice(start, end);

      return {
        success: true,
        data: {
          bookings: paginated,
          pagination: {
            page,
            limit,
            total: bookings.length,
            totalPages: Math.ceil(bookings.length / limit),
            hasNext: end < bookings.length,
            hasPrev: page > 1,
          },
        },
      };
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder);
    
    const query = queryParams.toString();
    return apiClient.get(`/bookings${query ? `?${query}` : ''}`);
  },

  async getById(id: string): Promise<{ success: boolean; data: Booking }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) {
        throw new Error('Booking not found');
      }
      return { success: true, data: booking };
    }

    return apiClient.get(`/bookings/${id}`);
  },

  async cancel(id: string, data: CancelBookingDto): Promise<{ success: boolean; message: string; data: Booking }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) {
        throw new Error('Booking not found');
      }
      return {
        success: true,
        message: 'Booking cancelled successfully',
        data: { ...booking, status: 'CANCELLED', updatedAt: new Date().toISOString() },
      };
    }

    return apiClient.post(`/bookings/${id}/cancel`, data);
  },
};

