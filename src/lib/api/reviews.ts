import { apiClient } from './client';
import { mockReviews, generateMockReviews } from '@/lib/mockData';

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true;

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

function calculateReviewSummary(reviews: Review[]) {
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      averageCleanlinessRating: 0,
      ratingDistribution: {},
    };
  }

  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const totalCleanliness = reviews.reduce((sum, r) => sum + (r.cleanlinessRating || r.rating), 0);
  const distribution: Record<number, number> = {};

  reviews.forEach(r => {
    const rounded = Math.round(r.rating);
    distribution[rounded] = (distribution[rounded] || 0) + 1;
  });

  return {
    totalReviews: reviews.length,
    averageRating: totalRating / reviews.length,
    averageCleanlinessRating: totalCleanliness / reviews.length,
    ratingDistribution: distribution,
  };
}

export const reviewsApi = {
  async create(data: CreateReviewDto): Promise<Review> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newReview: Review = {
        id: `review-${Date.now()}`,
        ...data,
        guestId: 'guest-mock',
        isPublic: data.isPublic ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        guest: {
          id: 'guest-mock',
          name: 'Guest User',
        },
      };
      return newReview;
    }

    return apiClient.post('/reviews', data);
  },

  async getPropertyReviews(propertyId: string): Promise<PropertyReviewsResponse> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Get existing reviews for this property
      const propertyReviews = mockReviews.filter(r => r.propertyId === propertyId);
      // Generate additional reviews (5-15 per property)
      const additionalReviews = generateMockReviews(propertyId, Math.floor(Math.random() * 10) + 5);
      const allReviews = [...propertyReviews, ...additionalReviews];
      const summary = calculateReviewSummary(allReviews);

      return {
        reviews: allReviews,
        summary,
      };
    }

    return apiClient.get(`/reviews/property/${propertyId}`);
  },

  async getAll(propertyId?: string): Promise<Review[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      if (propertyId) {
        const propertyReviews = mockReviews.filter(r => r.propertyId === propertyId);
        const additionalReviews = generateMockReviews(propertyId, 10);
        return [...propertyReviews, ...additionalReviews];
      }
      return mockReviews;
    }

    const query = propertyId ? `?propertyId=${propertyId}` : '';
    return apiClient.get(`/reviews${query}`);
  },

  async getById(id: string): Promise<Review> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const review = mockReviews.find(r => r.id === id);
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    }

    return apiClient.get(`/reviews/${id}`);
  },

  async update(id: string, data: Partial<CreateReviewDto> & { response?: string }): Promise<Review> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const review = mockReviews.find(r => r.id === id);
      if (!review) {
        throw new Error('Review not found');
      }
      return { ...review, ...data, updatedAt: new Date().toISOString() };
    }

    return apiClient.patch(`/reviews/${id}`, data);
  },

  async delete(id: string): Promise<{ message: string }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return { message: 'Review deleted successfully' };
    }

    return apiClient.delete(`/reviews/${id}`);
  },
};

