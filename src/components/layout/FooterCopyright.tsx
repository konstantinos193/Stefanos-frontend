'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const t = useTranslation()
  
  return (
    <div className="pt-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm text-center md:text-left">
          © {currentYear}{' '}
          <a
            href="https://example.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Example Company
          </a>
          . All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href={`/${language}/terms`}
            className="text-gray-400 hover:text-accent-blue transition-colors duration-200"
          >
            {t('footer.links.termsOfService')}
          </Link>
          <Link
            href={`/${language}/privacy`}
            className="text-gray-400 hover:text-accent-blue transition-colors duration-200"
          >
            {t('footer.links.privacyPolicy')}
          </Link>
        </div>
      </div>
    </div>
  )
}
