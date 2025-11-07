import { ServiceCard } from '@/components/ui/ServiceCard'

export const ServicesSection = () => {
  const services = [
    {
      id: 'property-management',
      title: {
        gr: 'Διαχείριση Ακινήτων',
        en: 'Property Management'
      },
      description: {
        gr: 'Αξιόπιστη διαχείριση των ακινήτων σας με σύγχρονα εργαλεία',
        en: 'Reliable property management with modern tools and 24/7 support'
      },
      icon: 'https://placehold.co/80x80/3b82f6/FFFFFF?text=Property+Mgmt',
      features: ['24/7 Support', 'Maintenance', 'Tenant Screening', 'Financial Reporting']
    },
    {
      id: 'booking-platform',
      title: {
        gr: 'Πλατφόρμα Κρατήσεων',
        en: 'Booking Platform'
      },
      description: {
        gr: 'Σύγχρονη πλατφόρμα για εύκολες κρατήσεις',
        en: 'Modern platform for seamless booking experience'
      },
      icon: 'https://placehold.co/80x80/10b981/FFFFFF?text=Booking',
      features: ['Online Booking', 'Payment Processing', 'Calendar Sync', 'Mobile App']
    },
    {
      id: 'real-estate',
      title: {
        gr: 'Ακίνητα',
        en: 'Real Estate'
      },
      description: {
        gr: 'Εύρεση και πώληση ακινήτων με διαφάνεια',
        en: 'Find and sell properties with complete transparency'
      },
      icon: 'https://placehold.co/80x80/f59e0b/FFFFFF?text=Real+Estate',
      features: ['Property Search', 'Virtual Tours', 'Market Analysis', 'Legal Support']
    },
    {
      id: 'maintenance',
      title: {
        gr: 'Συντήρηση',
        en: 'Maintenance'
      },
      description: {
        gr: 'Συντήρηση και επισκευές ακινήτων',
        en: 'Professional maintenance and repair services'
      },
      icon: 'https://placehold.co/80x80/ef4444/FFFFFF?text=Maintenance',
      features: ['Emergency Repairs', 'Preventive Maintenance', 'Quality Control', 'Fast Response']
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Αξιόπιστες εξυπηρετήσεις για όλες τις ανάγκες σας
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
