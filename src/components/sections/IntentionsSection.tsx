'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import { HouseIcon, KeyIcon, MoneyIcon } from '@/components/icons'
import { useTranslation } from '@/lib/hooks/useTranslation'

type IntentionOption = {
  id: 'buy' | 'rent' | 'sell'
  icon: 'house' | 'key' | 'money'
  translationKey: string
  href?: string
}

type IntentionsSectionProps = {
  onIntentionClick?: (intention: string) => void
}

export const IntentionsSection = ({ 
  onIntentionClick 
}: IntentionsSectionProps) => {
  const t = useTranslation()
  const router = useRouter()
  
  const handleIntentionClick = (intention: string) => {
    if (onIntentionClick) {
      onIntentionClick(intention)
      return
    }
    
    // Default behavior: navigate to properties page with intention filter
    const pathname = window.location.pathname
    const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
    const lang = langMatch ? langMatch[1] : 'en'
    router.push(`/${lang}/properties?intention=${intention}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, intention: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleIntentionClick(intention)
    }
  }
  
  const intentions: IntentionOption[] = useMemo(() => [
    {
      id: 'buy',
      icon: 'house',
      translationKey: 'buy'
    },
    {
      id: 'rent',
      icon: 'key',
      translationKey: 'rent'
    },
    {
      id: 'sell',
      icon: 'money',
      translationKey: 'sell'
    }
  ], [])

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'house':
        return <HouseIcon size={48} className="text-current" aria-hidden="true" />
      case 'key':
        return <KeyIcon size={48} className="text-current" aria-hidden="true" />
      case 'money':
        return <MoneyIcon size={48} className="text-current" aria-hidden="true" />
      default:
        return null
    }
  }

  return (
    <section 
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="intentions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="intentions-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('intentions.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('intentions.subtitle')}
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          aria-labelledby="intentions-heading"
        >
          {intentions.map((intention) => {
            const label = t(`intentions.${intention.translationKey}.label`)
            const description = t(`intentions.${intention.translationKey}.description`)

            return (
              <button
                key={intention.id}
                type="button"
                aria-label={`${label}: ${description}`}
                onClick={() => handleIntentionClick(intention.id)}
                onKeyDown={(e) => handleKeyDown(e, intention.id)}
                className={clsx(
                  'group relative p-8 sm:p-10 rounded-2xl transition-all duration-300 text-left',
                  'h-full flex flex-col overflow-hidden',
                  'focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-2 focus:ring-offset-white',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  'touch-manipulation min-h-[240px] sm:min-h-[260px]',
                  'cursor-pointer'
                )}
              >
                {/* Base background layer */}
                <div className="absolute inset-0 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300" />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Border layer */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gray-200 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300" />
                
                {/* Hover glow effect */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-start space-y-5 flex-1">
                  <div className="mb-2 transition-all duration-300 text-gray-600 group-hover:text-[#d4af37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                    {getIcon(intention.icon)}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-300 text-gray-900 group-hover:text-[#d4af37]">
                      {label}
                    </h3>
                    <p className="text-base sm:text-lg transition-colors duration-300 text-gray-600 group-hover:text-gray-700">
                      {description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center shadow-lg shadow-[#d4af37]/50">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

