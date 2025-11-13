'use client'

import { useLanguage } from '@/lib/contexts/LanguageContext'

interface ValuePropBadgeProps {
  text: string
  index: number
}

const ValuePropBadge = ({ text, index }: ValuePropBadgeProps) => {
  return (
    <div 
      className="group relative inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/20"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/30 via-[#d4af37]/50 to-[#d4af37]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Glassmorphism background with gradient */}
      <div className="relative z-10 flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md border border-white/30 group-hover:border-[#d4af37]/50 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Icon with pulse animation */}
        <div className="relative mr-1 sm:mr-1.5 md:mr-2">
          <svg 
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-300 group-hover:scale-110" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          {/* Glow effect behind icon */}
          <div className="absolute inset-0 bg-[#d4af37] blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
        </div>
        
        {/* Text with subtle glow */}
        <span className="relative z-10 text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:text-[#d4af37]/90 transition-colors duration-300">
          {text}
        </span>
      </div>
      
      {/* Outer glow ring on hover */}
      <div className="absolute -inset-1 rounded-full bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
    </div>
  )
}

export const ValuePropBadges = () => {
  const { language } = useLanguage()

  const valueProps = {
    en: ['Verified Properties', 'Expert Guidance', '24/7 Support'],
    el: ['Επαληθευμένα Ακίνητα', 'Επαγγελματική Καθοδήγηση', 'Υποστήριξη 24/7']
  }

  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
      {valueProps[language].map((prop, index) => (
        <ValuePropBadge key={index} text={prop} index={index} />
      ))}
    </div>
  )
}

