import { clsx } from 'clsx'
import type { ReactNode } from 'react'

export type SearchModeOption = {
  value: string
  label: string
  description?: ReactNode
}

type SearchModeTabsProps = {
  options: SearchModeOption[]
  activeValue: string
  onChange: (value: string) => void
}

export const SearchModeTabs = ({
  options,
  activeValue,
  onChange
}: SearchModeTabsProps) => {
  return (
    <div className="relative inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white backdrop-blur-xl border border-gray-200 p-1 sm:p-1.5 shadow-lg">
      {/* Subtle inner glow accent */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/5 via-transparent to-[#d4af37]/5 pointer-events-none" />
      
      {/* Outer border glow on hover */}
      <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm" />
      
      {options.map((option) => {
        const isActive = option.value === activeValue

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={clsx(
              'group relative flex items-center gap-1.5 sm:gap-2 md:gap-2.5 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 transition-all duration-300 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-2 focus:ring-offset-white',
              isActive
                ? 'bg-gradient-to-r from-[#d4af37] via-[#d4af37] to-[#b8941f] text-black shadow-lg shadow-[#d4af37]/40 scale-[1.02]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            {/* Active state layered depth */}
            {isActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/15 to-transparent" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10" />
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#d4af37] via-[#d4af37] to-[#b8941f] opacity-90" />
              </>
            )}
            
            {/* Inactive state hover enhancement */}
            {!isActive && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
            
            <span className={clsx(
              'relative z-10 text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wide sm:tracking-wider whitespace-nowrap',
              isActive ? 'text-black drop-shadow-sm' : 'text-gray-600 group-hover:text-gray-900'
            )}>
              {option.label}
            </span>
            
            {option.description ? (
              <span
                className={clsx(
                  'relative z-10 hidden text-[10px] sm:text-xs md:text-xs lg:text-xs font-semibold sm:inline whitespace-nowrap transition-colors duration-300',
                  isActive ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'
                )}
              >
                {option.description}
              </span>
            ) : null}
            
            {/* Active state outer glow and border */}
            {isActive && (
              <>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#d4af37]/30 to-[#b8941f]/40 blur-lg opacity-60" />
                <div className="absolute inset-0 rounded-full ring-[1.5px] ring-white/30" />
                <div className="absolute inset-[1px] rounded-full ring-[0.5px] ring-black/20" />
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}

