'use client';

import { FooterContact } from './FooterContact'
import { FooterSocial } from './FooterSocial'
import { FooterCopyright } from './FooterCopyright'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const Footer = () => {
  const t = useTranslation();
  
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FooterContact />
          <FooterSocial />
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('footer.newsletter')}
            </h3>
            <p className="text-gray-700 mb-4">
              {t('footer.newsletterDescription')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer.enterEmail')}
                className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
              />
              <button className="bg-accent-blue hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  )
}
