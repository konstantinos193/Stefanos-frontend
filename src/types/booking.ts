export type BookingStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentStatus = 
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED'

export interface Booking {
  id: string
  propertyId: string
  guestId: string
  status: BookingStatus | string
  paymentStatus: PaymentStatus | string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  basePrice: number
  cleaningFee?: number
  serviceFee?: number
  taxes?: number
  currency: string
  ownerRevenue?: number
  platformFee?: number
  guestName: string
  guestEmail: string
  guestPhone?: string
  specialRequests?: string
  property?: {
    id: string
    titleEn: string
    titleGr: string
    images: string[]
    address: string
    city: string
  }
  payments?: Payment[]
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  bookingId: string
  propertyId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: string
  transactionId?: string
  stripePaymentIntentId?: string
  stripeChargeId?: string
  refundAmount?: number
  refundReason?: string
  refundedAt?: string
  processedAt?: string
  createdAt: string
}

