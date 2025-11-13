'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api/client'

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
        const result = await apiClient.get<StatsResponse>('/health/stats')
        if (result.success && result.data) {
          statsCache = result.data
          setStats(result.data)
          return result.data
        }
        return null
      } catch (err) {
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

