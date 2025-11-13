import { apiClient } from './client';

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

export const bookingsApi = {
  async create(data: CreateBookingDto): Promise<{ success: boolean; data: Booking }> {
    return apiClient.post('/bookings', data);
  },

  async getAll(params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ success: boolean; data: { bookings: Booking[]; pagination: any } }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.set('sortOrder', params.sortOrder);
    
    const query = queryParams.toString();
    return apiClient.get(`/bookings${query ? `?${query}` : ''}`);
  },

  async getById(id: string): Promise<{ success: boolean; data: Booking }> {
    return apiClient.get(`/bookings/${id}`);
  },

  async cancel(id: string, data: CancelBookingDto): Promise<{ success: boolean; message: string; data: Booking }> {
    return apiClient.post(`/bookings/${id}/cancel`, data);
  },
};

