export interface Review {
  id: string
  propertyId: string
  bookingId: string
  guestId: string
  rating: number
  cleanlinessRating?: number
  accuracyRating?: number
  communicationRating?: number
  locationRating?: number
  valueRating?: number
  title?: string
  comment?: string
  response?: string
  isPublic: boolean
  guest?: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface ReviewSummary {
  totalReviews: number
  averageRating: number
  averageCleanlinessRating: number
  ratingDistribution: Record<number, number>
}

