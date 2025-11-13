import { apiClient } from './client'

export const adminApi = {
  async getDashboard(): Promise<any> {
    return apiClient.get('/admin/dashboard')
  },

  async getUsers(params?: { page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    const query = queryParams.toString()
    return apiClient.get(`/admin/users${query ? `?${query}` : ''}`)
  },

  async getProperties(params?: { page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    const query = queryParams.toString()
    return apiClient.get(`/admin/properties${query ? `?${query}` : ''}`)
  },

  async getBookings(params?: { page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    const query = queryParams.toString()
    return apiClient.get(`/admin/bookings${query ? `?${query}` : ''}`)
  },

  async getFinancialReport(period?: string): Promise<any> {
    const query = period ? `?period=${period}` : ''
    return apiClient.get(`/admin/financial-report${query}`)
  },

  async getAuditLogs(params?: { page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    const query = queryParams.toString()
    return apiClient.get(`/admin/audit-logs${query ? `?${query}` : ''}`)
  },
}

