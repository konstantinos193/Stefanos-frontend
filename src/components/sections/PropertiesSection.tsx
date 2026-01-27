import { PropertyCard } from '@/components/ui/PropertyCard'

export const PropertiesSection = () => {
  const featuredProperties = [
    {
      id: '1',
      title: 'Modern Apartment in Athens',
      location: 'Athens, Greece',
      price: 120,
      rating: 4.8,
      image: '',
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Pool'],
      type: 'Apartment'
    },
    {
      id: '2',
      title: 'Luxury Villa in Mykonos',
      location: 'Mykonos, Greece',
      price: 350,
      rating: 4.9,
      image: '',
      amenities: ['WiFi', 'Kitchen', 'Beach Access', 'Pool'],
      type: 'Villa'
    },
    {
      id: '3',
      title: 'Cozy Studio in Thessaloniki',
      location: 'Thessaloniki, Greece',
      price: 80,
      rating: 4.7,
      image: '',
      amenities: ['WiFi', 'Kitchen', 'City Center'],
      type: 'Studio'
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Properties for Sale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium properties for sale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn btn-primary">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}
