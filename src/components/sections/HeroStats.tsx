'use client'

import { useMemo } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useStats } from '@/lib/contexts/StatsContext'

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000)
    return `${thousands}K+`
  }
  return `${num}+`
}

export const HeroStats = () => {
  const t = useTranslation()
  const { stats, loading } = useStats()

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

    return statsList.filter(stat => stat.value > 0)
  }, [stats])

  if (loading || displayStats.length === 0) {
    return null
  }

  const gridCols = displayStats.length === 1 ? 'grid-cols-1' : displayStats.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'

  return (
    <div className={`grid ${gridCols} gap-4 sm:gap-5 md:gap-6`}>
      {displayStats.map((stat, index) => (
        <div key={index} className="text-center px-2">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
            {stat.number}
          </div>
          <div className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5">
            {t(stat.labelKey)}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-600">
            {t(stat.descriptionKey)}
          </div>
        </div>
      ))}
    </div>
  )
}
