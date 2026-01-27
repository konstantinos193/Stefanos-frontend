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
      titleKey: 'services.propertyManagement.title',
      descriptionKey: 'services.propertyManagement.description',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: {
        el: ['Συντήρηση', 'Ελέγχος Ενοικιαστών', 'Οικονομικές Αναφορές'],
        en: ['Maintenance', 'Tenant Screening', 'Financial Reporting']
      }
    },
    {
      id: 'investment-consulting',
      titleKey: 'services.investmentConsulting.title',
      descriptionKey: 'services.investmentConsulting.description',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: {
        el: ['Ανάλυση Αγοράς', 'Συμβουλευτική Επένδυσης', 'Αξιολόγηση Ακινήτων', 'Στρατηγική Ανάπτυξης'],
        en: ['Market Analysis', 'Investment Consulting', 'Property Valuation', 'Growth Strategy']
      }
    },
    {
      id: 'real-estate',
      titleKey: 'services.realEstate.title',
      descriptionKey: 'services.realEstate.description',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      features: {
        el: ['Αναζήτηση Ακινήτων', 'Ανάλυση Αγοράς', 'Νομική Υποστήριξη'],
        en: ['Property Search', 'Market Analysis', 'Legal Support']
      }
    },
    {
      id: 'maintenance',
      titleKey: 'services.maintenance.title',
      descriptionKey: 'services.maintenance.description',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
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
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={{
                ...service,
                title: t(service.titleKey),
                description: t(service.descriptionKey),
                features: service.features[currentLang]
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
