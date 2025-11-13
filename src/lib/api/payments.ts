import { apiClient } from './client';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'PAYPAL' | 'BANK_TRANSFER' | 'STRIPE_LINK';

export interface CreatePaymentDto {
  bookingId: string;
  method: PaymentMethod;
  amount: number;
  currency?: string;
}

export interface PaymentResponse {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: string;
  method: PaymentMethod;
  transactionId?: string;
  stripePaymentIntentId?: string;
  refundAmount?: number;
  processedAt?: string;
  createdAt: string;
}

export interface RefundPaymentDto {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export const paymentsApi = {
  async processPayment(data: CreatePaymentDto): Promise<PaymentResponse> {
    return apiClient.post('/payments/process', data);
  },

  async confirmPayment(paymentIntentId: string): Promise<PaymentResponse> {
    return apiClient.post(`/payments/confirm/${paymentIntentId}`);
  },

  async refund(data: RefundPaymentDto): Promise<PaymentResponse> {
    return apiClient.post('/payments/refund', data);
  },

  async getById(id: string): Promise<PaymentResponse> {
    return apiClient.get(`/payments/${id}`);
  },

  async getOwnerPayouts(): Promise<any[]> {
    return apiClient.get('/payments/owner/payouts');
  },
};

