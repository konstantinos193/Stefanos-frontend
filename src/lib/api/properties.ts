import { apiClient } from './client';
import { serverFetch } from './server';
import { Property, PropertiesResponse, PropertySearchParams } from '@/types/property';
import { allMockProperties } from '@/lib/mockData';

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true;

// Helper function to filter and paginate mock properties
function filterMockProperties(params: PropertySearchParams): PropertiesResponse {
  let filtered = [...allMockProperties];

  // Filter by location
  if (params.location) {
    const locationLower = params.location.toLowerCase();
    filtered = filtered.filter(p => 
      p.city.toLowerCase().includes(locationLower) ||
      p.address.toLowerCase().includes(locationLower) ||
      p.country.toLowerCase().includes(locationLower)
    );
  }

  // Filter by type
  if (params.type) {
    filtered = filtered.filter(p => p.type === params.type);
  }

  // Filter by price range
  if (params.minPrice) {
    const minPrice = parseFloat(params.minPrice);
    filtered = filtered.filter(p => p.basePrice >= minPrice);
  }
  if (params.maxPrice) {
    const maxPrice = parseFloat(params.maxPrice);
    filtered = filtered.filter(p => p.basePrice <= maxPrice);
  }

  // Filter by guests
  if (params.guests) {
    const guests = parseInt(params.guests);
    filtered = filtered.filter(p => p.maxGuests >= guests);
  }

  // Sort
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder || 'desc';
  filtered.sort((a, b) => {
    let aVal: any = a[sortBy as keyof Property];
    let bVal: any = b[sortBy as keyof Property];
    
    if (sortBy === 'basePrice') {
      aVal = a.basePrice;
      bVal = b.basePrice;
    } else if (sortBy === 'createdAt') {
      aVal = new Date(a.createdAt).getTime();
      bVal = new Date(b.createdAt).getTime();
    } else if (sortBy === 'averageRating') {
      aVal = a.averageRating || 0;
      bVal = b.averageRating || 0;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Pagination
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '12');
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    success: true,
    data: {
      properties: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
        hasNext: end < filtered.length,
        hasPrev: page > 1,
      },
    },
  };
}

export const propertiesApi = {
  async search(params: PropertySearchParams): Promise<PropertiesResponse> {
    if (USE_MOCK_DATA) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return filterMockProperties(params);
    }

    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value.toString());
      }
    });

    const query = searchParams.toString();
    return apiClient.get<PropertiesResponse>(`/properties${query ? `?${query}` : ''}`);
  },

  async getById(id: string): Promise<{ success: boolean; data: Property }> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      const property = allMockProperties.find(p => p.id === id);
      if (!property) {
        throw new Error('Property not found');
      }
      return { success: true, data: property };
    }

    return apiClient.get(`/properties/${id}`);
  },

  async getAvailability(id: string, startDate: string, endDate: string): Promise<any> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      // Return mock availability - all dates available
      return {
        success: true,
        data: {
          available: true,
          blockedDates: [],
        },
      };
    }

    return apiClient.get(`/properties/${id}/availability?startDate=${startDate}&endDate=${endDate}`);
  },
};

// Server-side version for Server Components
export async function searchPropertiesServer(
  params: PropertySearchParams
): Promise<PropertiesResponse> {
  if (USE_MOCK_DATA) {
    return filterMockProperties(params);
  }

  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value.toString());
    }
  });

  const query = searchParams.toString();
  return serverFetch<PropertiesResponse>(`/properties${query ? `?${query}` : ''}`);
}
