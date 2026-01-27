'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'

export const FooterLinks = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  
  return (
    <div>
      {/* Logo */}
      <div className="mb-6">
        <Link href={`/${language}`} className="inline-block">
          <Image
            src="/logoetc.png"
            alt="SMH Real Estate"
            width={200}
            height={80}
            className="h-auto w-auto max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
            unoptimized
          />
        </Link>
      </div>
      
      {/* Company Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        Your trusted partner for premium real estate services, property management, and exceptional hospitality experiences in Greece.
      </p>
    </div>
  )
}
