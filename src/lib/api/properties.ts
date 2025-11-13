import { apiClient } from './client';
import { serverFetch } from './server';
import { Property, PropertiesResponse, PropertySearchParams } from '@/types/property';

export const propertiesApi = {
  async search(params: PropertySearchParams): Promise<PropertiesResponse> {
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
    return apiClient.get(`/properties/${id}`);
  },

  async getAvailability(id: string, startDate: string, endDate: string): Promise<any> {
    return apiClient.get(`/properties/${id}/availability?startDate=${startDate}&endDate=${endDate}`);
  },
};

// Server-side version for Server Components
export async function searchPropertiesServer(
  params: PropertySearchParams
): Promise<PropertiesResponse> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value.toString());
    }
  });

  const query = searchParams.toString();
  return serverFetch<PropertiesResponse>(`/properties${query ? `?${query}` : ''}`);
}
