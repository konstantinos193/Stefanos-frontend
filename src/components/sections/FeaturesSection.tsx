'use client'

import { FeatureItem } from '@/components/ui/FeatureItem'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useLanguage } from '@/lib/contexts/LanguageContext'

export const FeaturesSection = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  
  // Direct translations with fallbacks
  const title = t('features.title') || (language === 'el' ? 'Γιατί να μας επιλέξετε;' : 'Why Choose Us?')
  const subtitle = t('features.subtitle') || (language === 'el' ? 'Αξιόπιστες υπηρεσίες με σύγχρονη τεχνολογία' : 'Reliable services with modern technology')
  
  const features = [
    {
      id: 'transparency',
      title: {
        gr: 'Διαύγεια',
        en: 'Transparency'
      },
      description: {
        gr: 'Πλήρης διαφάνεια σε όλες τις συναλλαγές και τις πληροφορίες',
        en: 'Complete transparency in all transactions and information'
      },
      icon: '🔍'
    },
    {
      id: 'reliability',
      title: {
        gr: 'Αξιοπιστία',
        en: 'Reliability'
      },
      description: {
        gr: 'Αξιόπιστες υπηρεσίες με 24/7 υποστήριξη',
        en: 'Reliable services with 24/7 support and guaranteed quality'
      },
      icon: '🛡️'
    },
    {
      id: 'technology',
      title: {
        gr: 'Τεχνολογία',
        en: 'Technology'
      },
      description: {
        gr: 'Σύγχρονη τεχνολογία για εύκολη διαχείριση',
        en: 'Modern technology for easy management and booking'
      },
      icon: '💻'
    },
    {
      id: 'support',
      title: {
        gr: 'Υποστήριξη',
        en: 'Support'
      },
      description: {
        gr: 'Εξειδικευμένη υποστήριξη για κάθε ανάγκη',
        en: 'Expert support for every need and requirement'
      },
      icon: '🤝'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
