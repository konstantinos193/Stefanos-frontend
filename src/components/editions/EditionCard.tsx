import { Edition } from '@/types/edition'

interface EditionCardProps {
  edition: Edition
}

const statusColors = {
  active: 'bg-accent-green text-white',
  'coming-soon': 'bg-accent-orange text-white',
  beta: 'bg-accent-blue text-white'
}

export const EditionCard = ({ edition }: EditionCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="relative">
        <div className="mb-3 flex items-center justify-center">
          {typeof edition.icon === 'string' && edition.icon.startsWith('http') ? (
            <img 
              src={edition.icon} 
              alt={edition.title.en}
              className="w-12 h-12 mx-auto object-contain"
            />
          ) : typeof edition.icon === 'string' ? (
            <span className="text-4xl">{edition.icon}</span>
          ) : (
            <div className="text-accent-blue">{edition.icon}</div>
          )}
        </div>
        <div className={`absolute top-0 right-0 px-2 py-1 rounded-full text-xs font-medium ${statusColors[edition.status]}`}>
          {edition.status}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {edition.title.en}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {edition.description.en}
        </p>
        <div className="text-accent-blue font-semibold text-sm">
          {edition.price}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {edition.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {edition.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{edition.features.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 btn btn-primary text-sm">
          View Details
        </button>
        <button className="btn btn-secondary text-sm">
          Learn More
        </button>
      </div>
    </div>
  )
}
