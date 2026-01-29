'use client';

import Link from 'next/link'
import { FooterContact } from './FooterContact'
import { FooterSocial } from './FooterSocial'
import { FooterLinks } from './FooterLinks'
import { FooterCopyright } from './FooterCopyright'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useState } from 'react'

export const Footer = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };
  
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <FooterLinks />
          </div>
          
          {/* Quick Links - Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t('footer.sections.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${language}/about`}
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/team`}
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.ourTeam')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/careers`}
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.careers')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/contact`}
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              {t('footer.sections.services')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.propertyManagement')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.investmentConsulting')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.realEstate')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent-blue transition-colors duration-200 text-sm"
                >
                  {t('footer.links.maintenance')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <FooterContact />
            <div className="mt-8">
              <FooterSocial />
            </div>
            <div className="mt-8">
              <h3 className="text-white font-semibold text-lg mb-4">
                {t('footer.newsletter')}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {t('footer.newsletterDescription')}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.enterEmail')}
                  required
                  className="site-footer-input flex-1 px-4 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black text-sm whitespace-nowrap"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <FooterCopyright />
      </div>
    </footer>
  )
}
