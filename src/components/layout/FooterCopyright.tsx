'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const t = useTranslation()
  
  return (
    <div className="site-footer-copyright flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-center md:text-left">
        © {currentYear}{' '}
        <a
          href="https://adinfinity.gr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer.copyrightName')}
        </a>
        . {t('footer.allRightsReserved')}
      </p>
      <div className="flex items-center gap-6">
        <Link href={`/${language}/terms`}>
          {t('footer.links.termsOfService')}
        </Link>
        <Link href={`/${language}/privacy`}>
          {t('footer.links.privacyPolicy')}
        </Link>
      </div>
    </div>
  )
}
