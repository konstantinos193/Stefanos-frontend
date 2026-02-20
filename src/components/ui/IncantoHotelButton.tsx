'use client'

import Image from 'next/image'
import Link from 'next/link'

export const IncantoHotelButton = () => {
  return (
    <Link 
      href="https://incanto-hotel.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-2.5 bg-slate-900/50 hover:bg-slate-900/70 text-white rounded-lg transition-all duration-200 hover:shadow-lg border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm"
    >
      {/* Logo container for 2:1 ratio */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-8 rounded-md overflow-hidden shadow-sm">
          <Image
            alt="Incanto Hotel"
            src="/incanto-logo.png"
            width={64}
            height={32}
            className="w-full h-full object-cover"
            unoptimized
            style={{
              filter: 'contrast(1.1) brightness(1.05)'
            }}
          />
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex flex-col items-start min-w-0">
        <span className="text-sm font-semibold leading-tight text-white">
          Incanto Hotel
        </span>
        <span className="text-xs text-slate-400 leading-tight">
          Visit Website
        </span>
      </div>
      
      {/* Arrow indicator */}
      <svg 
        className="w-4 h-4 text-slate-400 flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
