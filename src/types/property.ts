export type PropertyType = 
  | 'APARTMENT'
  | 'HOUSE'
  | 'ROOM'
  | 'COMMERCIAL'
  | 'STORAGE'
  | 'VACATION_RENTAL'
  | 'LUXURY'
  | 'INVESTMENT'

export type PropertyStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'SUSPENDED'

export interface PropertyOwner {
  id: string
  name: string
  avatar: string | null
}

export interface PropertyAmenity {
  id: string
  nameEn: string
  nameGr: string
  icon: string | null
  category: string
}

export interface PropertyAmenityRelation {
  id: string
  propertyId: string
  amenityId: string
  amenity: PropertyAmenity
}

export interface Property {
  id: string
  titleEn: string
  titleGr: string
  descriptionEn: string | null
  descriptionGr: string | null
  type: PropertyType
  status: PropertyStatus
  address: string
  city: string
  country: string
  postalCode?: string
  latitude: number | null
  longitude: number | null
  maxGuests: number
  bedrooms: number
  bathrooms: number
  area: number | null
  basePrice: number
  currency: string
  cleaningFee: number | null
  serviceFee: number | null
  serviceFeePercentage?: number
  taxRate?: number
  taxes: number | null
  cancellationPolicy?: 'FLEXIBLE' | 'MODERATE' | 'STRICT' | 'SUPER_STRICT'
  hasDynamicRooms?: boolean
  averageCleanlinessRating?: number
  lastCleaningDate?: string
  images: string[]
  videos: string[]
  owner: PropertyOwner
  amenities: PropertyAmenityRelation[]
  rooms?: Room[]
  propertyGroupId?: string
  averageRating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  propertyId: string
  type: 'BEDROOM' | 'BATHROOM' | 'LIVING_ROOM' | 'KITCHEN' | 'DINING_ROOM' | 'OTHER'
  nameEn: string
  nameGr: string
  descriptionEn?: string
  descriptionGr?: string
  capacity?: number
  amenities?: string[]
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PropertiesResponse {
  success: boolean
  data: {
    properties: Property[]
    pagination: PaginationInfo
  }
}

export interface PropertySearchParams {
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: string
  type?: string
  minPrice?: string
  maxPrice?: string
  amenities?: string
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  intention?: string
}

