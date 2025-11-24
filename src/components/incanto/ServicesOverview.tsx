'use client'

import { useTranslation } from '@/lib/hooks/useTranslation'
import Link from 'next/link'
import { useLanguage } from '@/lib/contexts/LanguageContext'

type ServicesOverviewProps = {
  lang: string
}

const services = [
  {
    id: 'real-estate',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: { en: 'Real Estate Services', el: 'Υπηρεσίες Ακινήτων' },
    description: {
      en: 'Comprehensive real estate solutions for buying, selling, and leasing properties across Greece. Find your perfect property with our advanced search tools and expert guidance.',
      el: 'Ολοκληρωμένες λύσεις ακινήτων για αγορά, πώληση και ενοικίαση ακινήτων σε όλη την Ελλάδα. Βρείτε το ιδανικό σας ακίνητο με τα προηγμένα εργαλεία αναζήτησης και την εμπειρογνωμοσύνη μας.'
    },
    features: {
      en: [
        'Property Search & Discovery',
        'Buy, Sell & Lease Services',
        'Market Analysis & Pricing',
        'Legal Support & Documentation',
        'Property Valuation',
        'Virtual Tours & Viewings'
      ],
      el: [
        'Αναζήτηση & Εύρεση Ακινήτων',
        'Υπηρεσίες Αγοράς, Πώλησης & Ενοικίασης',
        'Ανάλυση Αγοράς & Τιμολόγηση',
        'Νομική Υποστήριξη & Έγγραφα',
        'Αξιολόγηση Ακινήτων',
        'Εικονικές Περιηγήσεις & Προβολές'
      ]
    }
  },
  {
    id: 'booking-platform',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: { en: 'Booking Platform', el: 'Πλατφόρμα Κρατήσεων' },
    description: {
      en: 'Modern booking management system for short-term rentals. Streamline your property bookings with automated calendar sync, payment processing, and guest communication.',
      el: 'Σύγχρονο σύστημα διαχείρισης κρατήσεων για βραχυπρόθεσμες ενοικιάσεις. Απλοποιήστε τις κρατήσεις των ακινήτων σας με αυτοματοποιημένη συγχρονισμό ημερολογίου, επεξεργασία πληρωμών και επικοινωνία με τους επισκέπτες.'
    },
    features: {
      en: [
        'Online Booking System',
        'Calendar Synchronization',
        'Payment Processing',
        'Guest Management',
        'Automated Confirmations',
        'Multi-Channel Integration'
      ],
      el: [
        'Σύστημα Online Κρατήσεων',
        'Συγχρονισμός Ημερολογίου',
        'Επεξεργασία Πληρωμών',
        'Διαχείριση Επισκεπτών',
        'Αυτοματοποιημένες Επιβεβαιώσεις',
        'Ενσωμάτωση Πολλαπλών Καναλιών'
      ]
    }
  },
  {
    id: 'property-management',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: { en: 'Property Management', el: 'Διαχείριση Ακινήτων' },
    description: {
      en: 'Complete property management services to maximize your investment returns. From maintenance to tenant relations, we handle all aspects of property management.',
      el: 'Ολοκληρωμένες υπηρεσίες διαχείρισης ακινήτων για μεγιστοποίηση των αποδόσεων της επένδυσής σας. Από τη συντήρηση έως τις σχέσεις με τους ενοικιαστές, διαχειριζόμαστε όλες τις πτυχές της διαχείρισης ακινήτων.'
    },
    features: {
      en: [
        '24/7 Property Monitoring',
        'Maintenance & Repairs',
        'Tenant Screening & Relations',
        'Financial Reporting',
        'Rent Collection',
        'Property Inspections'
      ],
      el: [
        'Παρακολούθηση Ακινήτων 24/7',
        'Συντήρηση & Επισκευές',
        'Ελέγχος & Σχέσεις Ενοικιαστών',
        'Οικονομικές Αναφορές',
        'Εισπράξη Ενοικίων',
        'Επιθεωρήσεις Ακινήτων'
      ]
    }
  },
  {
    id: 'consulting',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: { en: 'Real Estate Consulting', el: 'Σύμβουλος Ακινήτων' },
    description: {
      en: 'Expert consulting services for real estate investments, market analysis, and strategic planning. Get professional advice tailored to your specific needs and goals.',
      el: 'Εξειδικευμένες συμβουλευτικές υπηρεσίες για επενδύσεις σε ακίνητα, ανάλυση αγοράς και στρατηγικό σχεδιασμό. Λάβετε επαγγελματικές συμβουλές προσαρμοσμένες στις συγκεκριμένες ανάγκες και στόχους σας.'
    },
    features: {
      en: [
        'Investment Analysis',
        'Market Research',
        'Strategic Planning',
        'Risk Assessment',
        'Portfolio Optimization',
        'Legal Consultation'
      ],
      el: [
        'Ανάλυση Επενδύσεων',
        'Έρευνα Αγοράς',
        'Στρατηγικός Σχεδιασμός',
        'Αξιολόγηση Κινδύνου',
        'Βελτιστοποίηση Χαρτοφυλακίου',
        'Νομική Συμβουλευτική'
      ]
    }
  }
]

export function ServicesOverview({ lang }: ServicesOverviewProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const currentLang = lang === 'el' ? 'el' : 'en'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4af37\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-[#d4af37] to-[#b8941f] mx-auto rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t('servicesOverview.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('servicesOverview.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl hover:border-[#d4af37]/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-[#b8941f]/5 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {service.title[currentLang]}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description[currentLang]}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features[currentLang].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#d4af37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('servicesOverview.getStarted')}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t('servicesOverview.getStartedDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${language}/properties`}
              className="px-8 py-3 bg-white text-[#d4af37] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              {t('servicesOverview.exploreProperties')}
            </Link>
            <Link
              href={`/${language}/bookings`}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              {t('servicesOverview.makeBooking')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

