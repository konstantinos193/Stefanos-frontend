'use client'

import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import Link from 'next/link'

export const FindIdealSection = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  const currentLang = language === 'el' ? 'el' : 'en'

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#d4af37]/5 via-white to-[#d4af37]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {currentLang === 'el' ? 'Βρείτε το Ιδανικό' : 'Find the Ideal'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentLang === 'el' 
              ? 'Ανακαλύψτε το τέλειο ακίνητο που ταιριάζει στις ανάγκες σας με τα προηγμένα εργαλεία αναζήτησης μας.'
              : 'Discover the perfect property that matches your needs with our advanced search tools.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 hover:border-[#d4af37]/40">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center mb-6 mx-auto md:mx-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center md:text-left">
              {currentLang === 'el' ? 'Έξυπνη Αναζήτηση' : 'Smart Search'}
            </h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              {currentLang === 'el' 
                ? 'Χρησιμοποιήστε τα φίλτρα μας για να βρείτε ακριβώς αυτό που ψάχνετε.'
                : 'Use our filters to find exactly what you\'re looking for.'}
            </p>
            <Link
              href={`/${language}/properties`}
              className="block text-center md:text-left text-[#d4af37] font-semibold hover:text-[#b8941f] transition-colors"
            >
              {currentLang === 'el' ? 'Ξεκινήστε Αναζήτηση →' : 'Start Searching →'}
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 hover:border-[#d4af37]/40">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center md:text-left">
              {currentLang === 'el' ? 'Επαγγελματική Συμβουλευτική' : 'Expert Advice'}
            </h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              {currentLang === 'el' 
                ? 'Λάβετε συμβουλές από τους ειδικούς μας για την καλύτερη επιλογή.'
                : 'Get advice from our experts for the best choice.'}
            </p>
            <Link
              href={`/${language}/contact`}
              className="block text-center md:text-left text-blue-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              {currentLang === 'el' ? 'Επικοινωνήστε →' : 'Contact Us →'}
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 hover:border-[#d4af37]/40">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center md:text-left">
              {currentLang === 'el' ? 'Καλύτερες Τιμές' : 'Best Prices'}
            </h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              {currentLang === 'el' 
                ? 'Συγκρίνετε τιμές και βρείτε τις καλύτερες προσφορές.'
                : 'Compare prices and find the best deals.'}
            </p>
            <Link
              href={`/${language}/properties`}
              className="block text-center md:text-left text-green-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              {currentLang === 'el' ? 'Δείτε Προσφορές →' : 'View Deals →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
