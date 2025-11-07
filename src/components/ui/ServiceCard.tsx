interface Service {
  id: string
  title: {
    gr: string
    en: string
  }
  description: {
    gr: string
    en: string
  }
  icon: string
  features: string[]
}

interface ServiceCardProps {
  service: Service
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="text-center mb-4">
        <div className="mb-4">
          <img 
            src={service.icon} 
            alt={service.title.en}
            className="w-16 h-16 mx-auto object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title.en}
        </h3>
        <p className="text-gray-600 mb-4">
          {service.description.en}
        </p>
      </div>
      
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-accent-green mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button className="w-full btn btn-primary">
        Learn More
      </button>
    </div>
  )
}
