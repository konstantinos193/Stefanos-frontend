'use client'

import { ServiceCard } from '@/components/ui/ServiceCard'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'

export const ServicesSection = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  const currentLang = language === 'el' ? 'el' : 'en'

  const services = [
    {
      id: 'property-management',
      title: {
        el: 'Διαχείριση Ακινήτων',
        en: 'Property Management'
      },
      description: {
        el: 'Αξιόπιστη διαχείριση των ακινήτων σας με σύγχρονα εργαλεία και υποστήριξη 24/7',
        en: 'Reliable property management with modern tools and 24/7 support'
      },
      icon: 'https://placehold.co/80x80/3b82f6/FFFFFF?text=Property+Mgmt',
      features: {
        el: ['Υποστήριξη 24/7', 'Συντήρηση', 'Ελέγχος Ενοικιαστών', 'Οικονομικές Αναφορές'],
        en: ['24/7 Support', 'Maintenance', 'Tenant Screening', 'Financial Reporting']
      }
    },
    {
      id: 'booking-platform',
      title: {
        el: 'Πλατφόρμα Κρατήσεων',
        en: 'Booking Platform'
      },
      description: {
        el: 'Σύγχρονη πλατφόρμα για απρόσκοπτη εμπειρία κρατήσεων',
        en: 'Modern platform for seamless booking experience'
      },
      icon: 'https://placehold.co/80x80/10b981/FFFFFF?text=Booking',
      features: {
        el: ['Online Κρατήσεις', 'Επεξεργασία Πληρωμών', 'Συγχρονισμός Ημερολογίου', 'Mobile Εφαρμογή'],
        en: ['Online Booking', 'Payment Processing', 'Calendar Sync', 'Mobile App']
      }
    },
    {
      id: 'real-estate',
      title: {
        el: 'Ακίνητα',
        en: 'Real Estate'
      },
      description: {
        el: 'Εύρεση και πώληση ακινήτων με πλήρη διαφάνεια',
        en: 'Find and sell properties with complete transparency'
      },
      icon: 'https://placehold.co/80x80/f59e0b/FFFFFF?text=Real+Estate',
      features: {
        el: ['Αναζήτηση Ακινήτων', 'Εικονικές Περιηγήσεις', 'Ανάλυση Αγοράς', 'Νομική Υποστήριξη'],
        en: ['Property Search', 'Virtual Tours', 'Market Analysis', 'Legal Support']
      }
    },
    {
      id: 'maintenance',
      title: {
        el: 'Συντήρηση',
        en: 'Maintenance'
      },
      description: {
        el: 'Επαγγελματικές υπηρεσίες συντήρησης και επισκευών',
        en: 'Professional maintenance and repair services'
      },
      icon: 'https://placehold.co/80x80/ef4444/FFFFFF?text=Maintenance',
      features: {
        el: ['Επείγουσες Επισκευές', 'Προληπτική Συντήρηση', 'Έλεγχος Ποιότητας', 'Γρήγορη Απόκριση'],
        en: ['Emergency Repairs', 'Preventive Maintenance', 'Quality Control', 'Fast Response']
      }
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {currentLang === 'el' ? 'Τι Προσφέρουμε' : 'What We Offer'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentLang === 'el'
              ? 'Αξιόπιστες εξυπηρετήσεις για όλες τις ανάγκες σας'
              : 'Reliable services for all your needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={{
                ...service,
                title: service.title[currentLang],
                description: service.description[currentLang],
                features: service.features[currentLang]
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
