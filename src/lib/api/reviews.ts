import { apiClient } from './client';

export interface CreateReviewDto {
  propertyId: string;
  bookingId: string;
  rating: number;
  cleanlinessRating: number;
  accuracyRating?: number;
  communicationRating?: number;
  locationRating?: number;
  valueRating?: number;
  title?: string;
  comment?: string;
  isPublic?: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  bookingId: string;
  guestId: string;
  rating: number;
  cleanlinessRating?: number;
  accuracyRating?: number;
  communicationRating?: number;
  locationRating?: number;
  valueRating?: number;
  title?: string;
  comment?: string;
  response?: string;
  isPublic: boolean;
  guest?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyReviewsResponse {
  reviews: Review[];
  summary: {
    totalReviews: number;
    averageRating: number;
    averageCleanlinessRating: number;
    ratingDistribution: Record<number, number>;
  };
}

export const reviewsApi = {
  async create(data: CreateReviewDto): Promise<Review> {
    return apiClient.post('/reviews', data);
  },

  async getPropertyReviews(propertyId: string): Promise<PropertyReviewsResponse> {
    return apiClient.get(`/reviews/property/${propertyId}`);
  },

  async getAll(propertyId?: string): Promise<Review[]> {
    const query = propertyId ? `?propertyId=${propertyId}` : '';
    return apiClient.get(`/reviews${query}`);
  },

  async getById(id: string): Promise<Review> {
    return apiClient.get(`/reviews/${id}`);
  },

  async update(id: string, data: Partial<CreateReviewDto> & { response?: string }): Promise<Review> {
    return apiClient.patch(`/reviews/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/reviews/${id}`);
  },
};

