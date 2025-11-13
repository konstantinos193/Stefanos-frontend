import { SearchIcon, CheckIcon, CreditCardIcon, KeyIcon, HouseIcon, StarIcon } from '@/components/icons'

export const BookingFlow = () => {
  const steps = [
    {
      step: 1,
      title: {
        gr: 'Αναζήτηση',
        en: 'Search'
      },
      description: {
        gr: 'Βρείτε το ιδανικό ακίνητο',
        en: 'Find your perfect property'
      },
      icon: <SearchIcon size={32} className="text-current" />,
      details: [
        'Advanced search filters',
        'Real-time availability',
        'Price comparison',
        'Location insights'
      ]
    },
    {
      step: 2,
      title: {
        gr: 'Επιλογή',
        en: 'Select'
      },
      description: {
        gr: 'Επιλέξτε το ακίνητο και τις ημερομηνίες',
        en: 'Choose your property and dates'
      },
      icon: <CheckIcon size={32} className="text-current" />,
      details: [
        'Detailed property information',
        'Virtual tours',
        'Guest reviews',
        'Instant booking confirmation'
      ]
    },
    {
      step: 3,
      title: {
        gr: 'Πληρωμή',
        en: 'Payment'
      },
      description: {
        gr: 'Ασφαλής πληρωμή με πολλαπλές επιλογές',
        en: 'Secure payment with multiple options'
      },
      icon: <CreditCardIcon size={32} className="text-current" />,
      details: [
        'Multiple payment methods',
        'Secure processing',
        'Instant confirmation',
        'Receipt generation'
      ]
    },
    {
      step: 4,
      title: {
        gr: 'Πρόσβαση',
        en: 'Access'
      },
      description: {
        gr: 'Εύκολη πρόσβαση και check-in',
        en: 'Easy access and check-in'
      },
      icon: <KeyIcon size={32} className="text-current" />,
      details: [
        'Digital key delivery',
        'Access instructions',
        'Emergency contacts',
        '24/7 support'
      ]
    },
    {
      step: 5,
      title: {
        gr: 'Απόλαυση',
        en: 'Enjoy'
      },
      description: {
        gr: 'Απολαύστε τη διαμονή σας',
        en: 'Enjoy your stay'
      },
      icon: <HouseIcon size={32} className="text-current" />,
      details: [
        'Comfortable accommodation',
        'Local recommendations',
        'Maintenance support',
        'Guest services'
      ]
    },
    {
      step: 6,
      title: {
        gr: 'Αξιολόγηση',
        en: 'Review'
      },
      description: {
        gr: 'Αξιολογήστε την εμπειρία σας',
        en: 'Review your experience'
      },
      icon: <StarIcon size={32} className="text-current" />,
      details: [
        'Easy feedback system',
        'Rating and comments',
        'Improvement suggestions',
        'Loyalty rewards'
      ]
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple Booking Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Απλή ιδέα ισοδύναμα καλάροπτα - ποσότητα κέρδος
          </p>
        </div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Step connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>
                )}
                
                <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-blue text-white rounded-full text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  
                  <div className="mb-4 text-accent-blue flex justify-center">{step.icon}</div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title.en}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {step.description.en}
                  </p>
                  
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <svg className="w-4 h-4 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 text-xs text-gray-400">
                    {step.description.gr}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
