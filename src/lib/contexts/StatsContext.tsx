'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api/client'
import { allMockProperties } from '@/lib/mockData'

// Set to true to use mock data, false to use real API
const USE_MOCK_DATA = true

type StatsData = {
  properties: number
  happyGuests: number
  cities: number
}

type StatsResponse = {
  success: boolean
  data: StatsData
}

interface StatsContextType {
  stats: StatsData | null
  loading: boolean
  error: Error | null
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

let statsCache: StatsData | null = null
let fetchPromise: Promise<StatsData | null> | null = null

// Generate mock stats from mock properties
function getMockStats(): StatsData {
  const uniqueCities = new Set(allMockProperties.map(p => p.city))
  const totalReviews = allMockProperties.reduce((sum, p) => sum + (p.reviewCount || 0), 0)
  
  return {
    properties: allMockProperties.length,
    happyGuests: totalReviews, // Using review count as proxy for happy guests
    cities: uniqueCities.size,
  }
}

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<StatsData | null>(statsCache)
  const [loading, setLoading] = useState(!statsCache)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (statsCache) {
      setStats(statsCache)
      setLoading(false)
      return
    }

    if (fetchPromise) {
      fetchPromise
        .then((data) => {
          if (data) {
            statsCache = data
            setStats(data)
          }
          setLoading(false)
        })
        .catch((err) => {
          const error = err instanceof Error ? err : new Error('Failed to fetch stats')
          setError(error)
          setLoading(false)
        })
      return
    }

    setLoading(true)
    fetchPromise = (async () => {
      try {
        if (USE_MOCK_DATA) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 300))
          const mockStats = getMockStats()
          statsCache = mockStats
          setStats(mockStats)
          return mockStats
        }

        const result = await apiClient.get<StatsResponse>('/health/stats')
        if (result.success && result.data) {
          statsCache = result.data
          setStats(result.data)
          return result.data
        }
        return null
      } catch (err) {
        // If API fails and we're not using mock data, try mock data as fallback
        if (!USE_MOCK_DATA) {
          console.warn('API failed, falling back to mock stats')
          const mockStats = getMockStats()
          statsCache = mockStats
          setStats(mockStats)
          return mockStats
        }
        
        const error = err instanceof Error ? err : new Error('Failed to fetch stats')
        setError(error)
        console.error('Failed to fetch stats:', err)
        return null
      } finally {
        fetchPromise = null
      }
    })()
    
    fetchPromise
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return (
    <StatsContext.Provider value={{ stats, loading, error }}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStats = () => {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}
