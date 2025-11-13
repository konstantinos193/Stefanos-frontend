import { PropertiesResponse, PropertySearchParams } from '@/types/property'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function searchProperties(
  params: PropertySearchParams
): Promise<PropertiesResponse> {
  const searchParams = new URLSearchParams()

  if (params.location) searchParams.set('location', params.location)
  if (params.checkIn) searchParams.set('checkIn', params.checkIn)
  if (params.checkOut) searchParams.set('checkOut', params.checkOut)
  if (params.guests) searchParams.set('guests', params.guests)
  if (params.type) searchParams.set('type', params.type)
  if (params.minPrice) searchParams.set('minPrice', params.minPrice)
  if (params.maxPrice) searchParams.set('maxPrice', params.maxPrice)
  if (params.amenities) searchParams.set('amenities', params.amenities)
  if (params.page) searchParams.set('page', params.page)
  if (params.limit) searchParams.set('limit', params.limit)
  if (params.sortBy) searchParams.set('sortBy', params.sortBy)
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder)
  if (params.intention) searchParams.set('intention', params.intention)

  const response = await fetch(`${API_URL}/properties?${searchParams.toString()}`, {
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch properties')
  }

  return response.json()
}

