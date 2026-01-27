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
        'Property Viewings'
      ],
      el: [
        'Αναζήτηση & Εύρεση Ακινήτων',
        'Υπηρεσίες Αγοράς, Πώλησης & Ενοικίασης',
        'Ανάλυση Αγοράς & Τιμολόγηση',
        'Νομική Υποστήριξη & Έγγραφα',
        'Αξιολόγηση Ακινήτων',
        'Προβολές Ακινήτων'
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
        'Property Monitoring',
        'Maintenance & Repairs',
        'Tenant Screening & Relations',
        'Financial Reporting',
        'Rent Collection',
        'Property Inspections'
      ],
      el: [
        'Παρακολούθηση Ακινήτων',
        'Συντήρηση & Επισκευές',
        'Ελέγχος & Σχέσεις Ενοικιαστών',
        'Οικονομικές Αναφορές',
        'Εισπράξη Ενοικίων',
        'Επιθεωρήσεις Ακινήτων'
      ]
    }
  },
  {
    id: 'investment-consulting',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: { en: 'Investment Consulting', el: 'Επενδυτική Συμβουλευτική' },
    description: {
      en: 'Expert investment advice to help you make informed decisions. Our consultants analyze market trends, evaluate opportunities, and provide strategic guidance for your real estate investments.',
      el: 'Επαγγελματική επενδυτική συμβουλευτική για να λάβετε τεκμηριωμένες αποφάσεις. Οι σύμβουλοί μας αναλύουν τις τάσεις της αγοράς, αξιολογούν ευκαιρίες και παρέχουν στρατηγική καθοδήγηση για τις επενδύσεις σας σε ακίνητα.'
    },
    features: {
      en: [
        'Market Analysis & Trends',
        'Investment Strategy Development',
        'ROI Calculations & Projections',
        'Risk Assessment',
        'Portfolio Diversification',
        'Exit Strategy Planning'
      ],
      el: [
        'Ανάλυση Αγοράς & Τάσεις',
        'Ανάπτυξη Επενδυτικής Στρατηγικής',
        'Υπολογισμοί & Προβλέψεις ROI',
        'Αξιολόγηση Κινδύνου',
        'Διαφοροποίηση Χαρτοφυλακίου',
        'Σχεδιασμός Στρατηγικής Εξόδου'
      ]
    }
  },
  {
    id: 'legal-services',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: { en: 'Legal Services', el: 'Νομικές Υπηρεσίες' },
    description: {
      en: 'Comprehensive legal support for all your real estate transactions. From contract review to property registration, our legal experts ensure your transactions are secure and compliant.',
      el: 'Ολοκληρωμένη νομική υποστήριξη για όλες τις συναλλαγές ακινήτων. Από την αναθεώρηση συμβολαίων έως την εγγραφή ακινήτων, οι νομικοί ειδικοί μας διασφαλίζουν ότι οι συναλλαγές σας είναι ασφαλείς και συμβατές.'
    },
    features: {
      en: [
        'Contract Review & Drafting',
        'Property Title Verification',
        'Transaction Documentation',
        'Legal Compliance Checks',
        'Dispute Resolution',
        'Notary Services Coordination'
      ],
      el: [
        'Αναθεώρηση & Σύνταξη Συμβολαίων',
        'Επαλήθευση Τίτλου Ιδιοκτησίας',
        'Τεκμηρίωση Συναλλαγών',
        'Έλεγχος Νομικής Συμμόρφωσης',
        'Επίλυση Διαφορών',
        'Συντονισμός Νοταριακών Υπηρεσιών'
      ]
    }
  },
  {
    id: 'financial-services',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: { en: 'Financial Services', el: 'Χρηματοοικονομικές Υπηρεσίες' },
    description: {
      en: 'Expert financial guidance for property purchases and investments. We help you secure the best financing options, manage mortgages, and optimize your real estate portfolio.',
      el: 'Επαγγελματική χρηματοοικονομική καθοδήγηση για αγορές και επενδύσεις ακινήτων. Σας βοηθάμε να εξασφαλίσετε τις καλύτερες επιλογές χρηματοδότησης, να διαχειριστείτε υποθήκες και να βελτιστοποιήσετε το χαρτοφυλάκιό σας.'
    },
    features: {
      en: [
        'Mortgage Consultation',
        'Loan Application Support',
        'Financial Planning',
        'Tax Optimization Strategies',
        'Investment Analysis',
        'Wealth Management'
      ],
      el: [
        'Συμβουλευτική Υποθηκών',
        'Υποστήριξη Αίτησης Δανείου',
        'Χρηματοοικονομικός Σχεδιασμός',
        'Στρατηγικές Βελτιστοποίησης Φόρων',
        'Ανάλυση Επενδύσεων',
        'Διαχείριση Περιουσίας'
      ]
    }
  },
  {
    id: 'property-photography',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: { en: 'Property Photography', el: 'Φωτογραφία Ακινήτων' },
    description: {
      en: 'Professional photography to showcase your property in the best light. High-quality visuals that attract more potential buyers and renters.',
      el: 'Επαγγελματική φωτογραφία για να προβάλετε το ακίνητό σας με τον καλύτερο τρόπο. Υψηλής ποιότητας οπτικό υλικό που προσελκύει περισσότερους πιθανούς αγοραστές και ενοικιαστές.'
    },
    features: {
      en: [
        'Professional Photography',
        'Property Photography',
        'Drone Aerial Shots',
        'Video Walkthroughs',
        '3D Floor Plans',
        'Staging Consultation'
      ],
      el: [
        'Επαγγελματική Φωτογραφία',
        'Επαγγελματική Φωτογραφία',
        'Αεροφωτογραφίες Drone',
        'Βίντεο Περιήγησης',
        'Σχέδια 3D',
        'Συμβουλευτική Στολισμού'
      ]
    }
  },
  {
    id: 'renovation-services',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: { en: 'Renovation & Design Services', el: 'Υπηρεσίες Ανακαίνισης & Σχεδιασμού' },
    description: {
      en: 'Transform your property with professional renovation and interior design services. From concept to completion, we help you create spaces that maximize value and appeal.',
      el: 'Μεταμορφώστε το ακίνητό σας με επαγγελματικές υπηρεσίες ανακαίνισης και εσωτερικού σχεδιασμού. Από την ιδέα έως την ολοκλήρωση, σας βοηθάμε να δημιουργήσετε χώρους που μεγιστοποιούν την αξία και την ελκυστικότητα.'
    },
    features: {
      en: [
        'Interior Design Planning',
        'Renovation Project Management',
        'Contractor Coordination',
        'Material Selection',
        'Quality Control',
        'Budget Management'
      ],
      el: [
        'Σχεδιασμός Εσωτερικού Χώρου',
        'Διαχείριση Έργων Ανακαίνισης',
        'Συντονισμός Εργολάβων',
        'Επιλογή Υλικών',
        'Έλεγχος Ποιότητας',
        'Διαχείριση Προϋπολογισμού'
      ]
    }
  }
]

export function ServicesOverview({ lang }: ServicesOverviewProps) {
  const t = useTranslation()
  const { language } = useLanguage()
  const currentLang = lang === 'el' ? 'el' : 'en'

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {t('servicesOverview.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('servicesOverview.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Properties for Sale Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentLang === 'el' ? 'Ακίνητα Προς Πώληση' : 'Properties for Sale'}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {currentLang === 'el' 
                    ? 'Ανακαλύψτε μια εκλεκτή συλλογή ακινήτων προς πώληση σε όλη την Ελλάδα. Από διαμερίσματα και οικοδομές έως βίλες και επενδυτικές ευκαιρίες.'
                    : 'Discover an exclusive collection of properties for sale across Greece. From apartments and buildings to villas and investment opportunities.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${language}/properties?type=sale`}
                    className="px-8 py-3 bg-[#d4af37] text-white rounded-lg font-semibold hover:bg-[#b8941f] transition-colors duration-200 text-center"
                  >
                    {currentLang === 'el' ? 'Δείτε Όλα τα Ακίνητα' : 'View All Properties'}
                  </Link>
                  <Link
                    href={`/${language}/properties?type=sale&featured=true`}
                    className="px-8 py-3 bg-transparent border-2 border-[#d4af37] text-[#d4af37] rounded-lg font-semibold hover:bg-[#d4af37]/10 transition-colors duration-200 text-center"
                  >
                    {currentLang === 'el' ? 'Προτεινόμενα' : 'Featured Properties'}
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties for Rent Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentLang === 'el' ? 'Ακίνητα προς Ενοικίαση' : 'Properties for Rent'}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {currentLang === 'el' 
                    ? 'Βρείτε το ιδανικό ακίνητο για ενοικίαση. Διαθέσιμα διαμερίσματα, σπίτια, καταστήματα και επαγγελματικοί χώροι σε όλη την Ελλάδα.'
                    : 'Find the ideal property for rent. Available apartments, houses, stores, and commercial spaces across Greece.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${language}/properties?intention=rent`}
                    className="px-8 py-3 bg-[#d4af37] text-white rounded-lg font-semibold hover:bg-[#b8941f] transition-colors duration-200 text-center"
                  >
                    {currentLang === 'el' ? 'Δείτε Όλες τις Ενοικιάσεις' : 'View All Rentals'}
                  </Link>
                  <Link
                    href={`/${language}/properties?intention=rent&type=COMMERCIAL`}
                    className="px-8 py-3 bg-transparent border-2 border-[#d4af37] text-[#d4af37] rounded-lg font-semibold hover:bg-[#d4af37]/10 transition-colors duration-200 text-center"
                  >
                    {currentLang === 'el' ? 'Καταστήματα' : 'Stores'}
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#d4af37] flex items-center justify-center">
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4 w-12 h-12 flex items-center justify-center text-[#d4af37]">
                  {service.icon}
                </div>

                {/* Content */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {service.title[currentLang]}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {service.description[currentLang]}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features[currentLang].map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <svg className="w-4 h-4 text-[#d4af37] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('servicesOverview.getStarted')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('servicesOverview.getStartedDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${language}/properties`}
              className="px-8 py-3 bg-[#d4af37] text-white rounded-lg font-semibold hover:bg-[#b8941f] transition-colors duration-200"
            >
              {t('servicesOverview.exploreProperties')}
            </Link>
            <Link
              href={`/${language}/bookings`}
              className="px-8 py-3 bg-transparent border-2 border-[#d4af37] text-[#d4af37] rounded-lg font-semibold hover:bg-[#d4af37]/10 transition-colors duration-200"
            >
              {t('servicesOverview.makeBooking')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

