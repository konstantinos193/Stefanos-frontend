interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  image: string
  amenities: string[]
  type: string
}

interface PropertyCardProps {
  property: Property
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="relative mb-4">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {property.type}
        </div>
        <div className="absolute top-4 left-4 flex items-center bg-white px-2 py-1 rounded-full text-sm">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {property.rating}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {property.location}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-blue">
            €{property.price}
            <span className="text-sm font-normal text-gray-600">/night</span>
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>

      <button className="w-full btn btn-primary">
        View Details
      </button>
    </div>
  )
}
