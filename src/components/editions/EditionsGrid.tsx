import { EditionCard } from './EditionCard'
import {
  ChartUpIcon,
  ClockIcon,
  CalendarIcon,
  PartyIcon,
  BriefcaseIcon,
  PackageIcon,
  HouseIcon,
  ChatIcon,
  MoneyIcon,
  ChartIcon,
  WrenchIcon,
  ScalesIcon
} from '@/components/icons'
import { Edition } from '@/types/edition'

export const EditionsGrid = () => {
  const editions: Edition[] = [
    // Property Editions (5)
    {
      id: 'residential',
      category: 'properties',
      title: {
        gr: 'Κατοικίες',
        en: 'Residential Properties'
      },
      description: {
        gr: 'Σύγχρονα διαμερίσματα και κατοικίες',
        en: 'Modern apartments and houses for rent'
      },
      features: ['WiFi', 'Kitchen', 'Parking', 'Garden'],
      price: 'From €80/night',
      icon: 'https://placehold.co/60x60/3b82f6/FFFFFF?text=Residential',
      status: 'active'
    },
    {
      id: 'commercial',
      category: 'properties',
      title: {
        gr: 'Επαγγελματικές',
        en: 'Commercial Properties'
      },
      description: {
        gr: 'Επαγγελματικοί χώροι και γραφεία',
        en: 'Office spaces and commercial properties'
      },
      features: ['WiFi', 'Meeting Rooms', 'Parking', 'Reception'],
      price: 'From €150/night',
      icon: 'https://placehold.co/60x60/3b82f6/FFFFFF?text=Residential',
      status: 'active'
    },
    {
      id: 'vacation',
      category: 'properties',
      title: {
        gr: 'Διακοπές',
        en: 'Vacation Rentals'
      },
      description: {
        gr: 'Ιδανικά για διακοπές και σύντομες διαμονές',
        en: 'Perfect for vacations and short stays'
      },
      features: ['Beach Access', 'Pool', 'WiFi', 'Kitchen'],
      price: 'From €120/night',
      icon: 'https://placehold.co/60x60/10b981/FFFFFF?text=Vacation',
      status: 'active'
    },
    {
      id: 'luxury',
      category: 'properties',
      title: {
        gr: 'Λουξ',
        en: 'Luxury Properties'
      },
      description: {
        gr: 'Premium ακίνητα με υψηλές ανέσεις',
        en: 'Premium properties with high-end amenities'
      },
      features: ['Concierge', 'Pool', 'Spa', 'Private Garden'],
      price: 'From €300/night',
      icon: 'https://placehold.co/60x60/f59e0b/FFFFFF?text=Luxury',
      status: 'active'
    },
    {
      id: 'investment',
      category: 'properties',
      title: {
        gr: 'Επενδυτικά',
        en: 'Investment Properties'
      },
      description: {
        gr: 'Ακίνητα για επενδυτικούς σκοπούς',
        en: 'Properties for investment purposes'
      },
      features: ['ROI Analysis', 'Market Data', 'Legal Support', 'Management'],
      price: 'From €200/night',
      icon: <ChartUpIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    // Booking Services (5)
    {
      id: 'short-term',
      category: 'booking',
      title: {
        gr: 'Σύντομες Κρατήσεις',
        en: 'Short-term Rentals'
      },
      description: {
        gr: 'Κρατήσεις από 1-30 ημέρες',
        en: 'Rentals from 1-30 days'
      },
      features: ['Instant Booking', 'Flexible Dates', '24/7 Support', 'Mobile App'],
      price: 'From €50/night',
      icon: <ClockIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'long-term',
      category: 'booking',
      title: {
        gr: 'Μακροπρόθεσμες Κρατήσεις',
        en: 'Long-term Rentals'
      },
      description: {
        gr: 'Κρατήσεις από 1-12 μήνες',
        en: 'Rentals from 1-12 months'
      },
      features: ['Monthly Discounts', 'Utilities Included', 'Maintenance', 'Legal Support'],
      price: 'From €800/month',
      icon: <CalendarIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'event-spaces',
      category: 'booking',
      title: {
        gr: 'Χώροι Εκδηλώσεων',
        en: 'Event Spaces'
      },
      description: {
        gr: 'Ειδικοί χώροι για εκδηλώσεις και events',
        en: 'Specialized spaces for events and celebrations'
      },
      features: ['Catering', 'Audio/Visual', 'Decoration', 'Staff'],
      price: 'From €200/event',
      icon: <PartyIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'meeting-rooms',
      category: 'booking',
      title: {
        gr: 'Αίθουσες Συνεδριάσεων',
        en: 'Meeting Rooms'
      },
      description: {
        gr: 'Επαγγελματικές αίθουσες συνεδριάσεων',
        en: 'Professional meeting and conference rooms'
      },
      features: ['Projector', 'WiFi', 'Catering', 'Reception'],
      price: 'From €50/hour',
      icon: <BriefcaseIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'storage',
      category: 'booking',
      title: {
        gr: 'Αποθήκες',
        en: 'Storage Units'
      },
      description: {
        gr: 'Ασφαλείς αποθηκευτικοί χώροι',
        en: 'Secure storage units for your belongings'
      },
      features: ['24/7 Access', 'Security', 'Climate Control', 'Insurance'],
      price: 'From €30/month',
      icon: <PackageIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    // Airbnb Integration (3)
    {
      id: 'property-management',
      category: 'airbnb',
      title: {
        gr: 'Διαχείριση Ακινήτων',
        en: 'Property Management'
      },
      description: {
        gr: 'Πλήρης διαχείριση Airbnb ακινήτων',
        en: 'Complete Airbnb property management'
      },
      features: ['Listing Optimization', 'Guest Communication', 'Pricing Strategy', 'Maintenance'],
      price: '15% commission',
      icon: <HouseIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'guest-communication',
      category: 'airbnb',
      title: {
        gr: 'Επικοινωνία Μετά',
        en: 'Guest Communication'
      },
      description: {
        gr: 'Αυτοματοποιημένη επικοινωνία με τους επισκέπτες',
        en: 'Automated guest communication system'
      },
      features: ['Auto Messages', 'Multi-language', '24/7 Support', 'Reviews'],
      price: '€50/month',
      icon: <ChatIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'revenue-optimization',
      category: 'airbnb',
      title: {
        gr: 'Βελτιστοποίηση Εσόδων',
        en: 'Revenue Optimization'
      },
      description: {
        gr: 'Μεγιστοποίηση εσόδων από τα ακίνητα',
        en: 'Maximize revenue from your properties'
      },
      features: ['Dynamic Pricing', 'Market Analysis', 'Competitor Tracking', 'Reports'],
      price: '€100/month',
      icon: <MoneyIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    // Knowledge & Services (4)
    {
      id: 'market-insights',
      category: 'knowledge',
      title: {
        gr: 'Αγοραία Ανάλυση',
        en: 'Market Insights'
      },
      description: {
        gr: 'Συμβουλές και ανάλυση της αγοράς ακινήτων',
        en: 'Real estate market analysis and insights'
      },
      features: ['Market Reports', 'Trend Analysis', 'Price Predictions', 'Investment Tips'],
      price: '€200/month',
      icon: <ChartIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'legal-guidance',
      category: 'knowledge',
      title: {
        gr: 'Νομική Υποστήριξη',
        en: 'Legal Guidance'
      },
      description: {
        gr: 'Νομικές συμβουλές για ακίνητα',
        en: 'Legal advice and support for properties'
      },
      features: ['Contract Review', 'Legal Updates', 'Dispute Resolution', 'Compliance'],
      price: '€150/hour',
      icon: <ScalesIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'financial-planning',
      category: 'knowledge',
      title: {
        gr: 'Οικονομικός Σχεδιασμός',
        en: 'Financial Planning'
      },
      description: {
        gr: 'Οικονομικός σχεδιασμός για επενδύσεις',
        en: 'Financial planning for property investments'
      },
      features: ['ROI Analysis', 'Tax Planning', 'Investment Strategy', 'Risk Assessment'],
      price: '€300/session',
      icon: <BriefcaseIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'property-maintenance',
      category: 'knowledge',
      title: {
        gr: 'Συντήρηση Ακινήτων',
        en: 'Property Maintenance'
      },
      description: {
        gr: 'Συμβουλές και υπηρεσίες συντήρησης',
        en: 'Maintenance advice and services'
      },
      features: ['Preventive Maintenance', 'Emergency Repairs', 'Quality Control', 'Cost Optimization'],
      price: '€100/month',
      icon: <WrenchIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    // Admin & Management (3)
    {
      id: 'property-dashboard',
      category: 'admin',
      title: {
        gr: 'Dashboard Ακινήτων',
        en: 'Property Dashboard'
      },
      description: {
        gr: 'Συγκεντρωμένη διαχείριση όλων των ακινήτων',
        en: 'Centralized management of all properties'
      },
      features: ['Real-time Data', 'Analytics', 'Reports', 'Alerts'],
      price: '€200/month',
      icon: <ChartIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'booking-management',
      category: 'admin',
      title: {
        gr: 'Διαχείριση Κρατήσεων',
        en: 'Booking Management'
      },
      description: {
        gr: 'Πλήρης διαχείριση κρατήσεων και επισκεπτών',
        en: 'Complete booking and guest management'
      },
      features: ['Calendar Sync', 'Guest Profiles', 'Payment Processing', 'Communication'],
      price: '€150/month',
      icon: <CalendarIcon size={48} className="text-accent-blue" />,
      status: 'active'
    },
    {
      id: 'analytics-reports',
      category: 'admin',
      title: {
        gr: 'Αναλυτικά & Reports',
        en: 'Analytics & Reports'
      },
      description: {
        gr: 'Λεπτομερή αναλυτικά και reports',
        en: 'Detailed analytics and reporting system'
      },
      features: ['Performance Metrics', 'Revenue Tracking', 'Guest Analytics', 'Custom Reports'],
      price: '€250/month',
      icon: <ChartUpIcon size={48} className="text-accent-blue" />,
      status: 'active'
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All 20 Editions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Πλήρης λίστα όλων των εκδόσεων και υπηρεσιών
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {editions.map((edition) => (
            <EditionCard key={edition.id} edition={edition} />
          ))}
        </div>
      </div>
    </section>
  )
}
