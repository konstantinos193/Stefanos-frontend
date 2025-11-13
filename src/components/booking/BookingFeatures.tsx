import { SearchIcon, ShieldIcon, PinIcon, HouseIcon, MoneyIcon, WrenchIcon } from '@/components/icons'

export const BookingFeatures = () => {
  const features = [
    {
      id: 'transparency',
      title: {
        gr: 'Διαύγεια',
        en: 'Transparency'
      },
      description: {
        gr: 'Πλήρης διαφάνεια σε όλες τις πληροφορίες',
        en: 'Complete transparency in all information'
      },
      icon: <SearchIcon size={40} className="text-current" />,
      benefits: [
        'No hidden fees',
        'Clear pricing',
        'Transparent terms',
        'Real-time updates'
      ]
    },
    {
      id: 'reliability',
      title: {
        gr: 'Αξιοπιστία',
        en: 'Reliability'
      },
      description: {
        gr: 'Αξιόπιστη υπηρεσία με 24/7 υποστήριξη',
        en: 'Reliable service with 24/7 support'
      },
      icon: <ShieldIcon size={40} className="text-current" />,
      benefits: [
        '24/7 customer support',
        'Guaranteed availability',
        'Secure transactions',
        'Quality assurance'
      ]
    },
    {
      id: 'access-points',
      title: {
        gr: 'Σημεία Πρόσβασης',
        en: 'Access Points'
      },
      description: {
        gr: 'Αξιόπιστα - πρόσβαση shmeia',
        en: 'Reliable access points everywhere'
      },
      icon: <PinIcon size={40} className="text-current" />,
      benefits: [
        'Multiple access methods',
        'Digital key management',
        'Emergency access',
        'Location-based services'
      ]
    },
    {
      id: 'room-clarity',
      title: {
        gr: 'Διαύγεια Δωμάτιο',
        en: 'Room Clarity'
      },
      description: {
        gr: 'Σαφής πληροφόρηση για κάθε δωμάτιο',
        en: 'Clear information for every room'
      },
      icon: <HouseIcon size={40} className="text-current" />,
      benefits: [
        'Detailed room descriptions',
        'High-quality photos',
        'Virtual tours',
        'Amenity listings'
      ]
    },
    {
      id: 'profit-optimization',
      title: {
        gr: 'Βελτιστοποίηση Κέρδους',
        en: 'Profit Optimization'
      },
      description: {
        gr: 'Ιδέα απλή ισοδύναμα καλάροπτα - ποσότητα κέρδος',
        en: 'Simple idea equivalents well-crafted - quantity profit'
      },
      icon: <MoneyIcon size={40} className="text-current" />,
      benefits: [
        'Dynamic pricing',
        'Revenue optimization',
        'Cost management',
        'Performance analytics'
      ]
    },
    {
      id: 'problem-solving',
      title: {
        gr: 'Επίλυση Προβλημάτων',
        en: 'Problem Solving'
      },
      description: {
        gr: 'Πρόβλη booking λύθηκε!',
        en: 'Booking problems solved!'
      },
      icon: <WrenchIcon size={40} className="text-current" />,
      benefits: [
        'Automated conflict resolution',
        'Instant problem detection',
        'Quick solutions',
        'Preventive measures'
      ]
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Our Booking System Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Αξιόπιστη πλατφόρμα με σύγχρονη τεχνολογία
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
              <div className="text-center mb-4">
                <div className="mb-4 flex justify-center text-accent-blue">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title.en}
                </h3>
                <p className="text-gray-300 mb-4">
                  {feature.description.en}
                </p>
              </div>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <svg className="w-4 h-4 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 text-xs text-gray-400">
                {feature.description.gr}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
