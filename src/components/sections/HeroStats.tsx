'use client'

import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'

type StatsData = {
  properties: number
  happyGuests: number
  cities: number
}

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000)
    const remainder = num % 1000
    if (remainder === 0) {
      return `${thousands}K+`
    }
    return `${thousands}K+`
  }
  return `${num}+`
}

export const HeroStats = () => {
  const t = useTranslation()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const response = await fetch(`${apiUrl}/health/stats`, {
          cache: 'no-store',
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            setStats(result.data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = useMemo(() => {
    if (!stats) return []

    const statsList = [
      {
        number: formatNumber(stats.properties),
        value: stats.properties,
        labelKey: 'stats.properties.label',
        descriptionKey: 'stats.properties.description'
      },
      {
        number: formatNumber(stats.happyGuests),
        value: stats.happyGuests,
        labelKey: 'stats.happyGuests.label',
        descriptionKey: 'stats.happyGuests.description'
      },
      {
        number: formatNumber(stats.cities),
        value: stats.cities,
        labelKey: 'stats.cities.label',
        descriptionKey: 'stats.cities.description'
      }
    ]

    // Filter out zero values
    return statsList.filter(stat => stat.value > 0)
  }, [stats])

  if (loading || displayStats.length === 0) {
    return null
  }

  const gridCols = displayStats.length === 1 ? 'grid-cols-1' : displayStats.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'

  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-4 md:gap-6 lg:gap-8`}>
      {displayStats.map((stat, index) => (
        <div key={index} className="text-center px-1 sm:px-2">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#d4af37] mb-0.5 sm:mb-1">
            {stat.number}
          </div>
          <div className="text-xs sm:text-sm md:text-base font-medium text-white/90 mb-0.5">
            {t(stat.labelKey)}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400">
            {t(stat.descriptionKey)}
          </div>
        </div>
      ))}
    </div>
  )
}
