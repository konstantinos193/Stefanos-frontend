interface Category {
  id: string
  title: {
    gr: string
    en: string
  }
  description: {
    gr: string
    en: string
  }
  count: number
  icon: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'gray'
}

interface CategoryCardProps {
  category: Category
}

const colorClasses = {
  blue: 'bg-accent-blue hover:bg-blue-700',
  green: 'bg-accent-green hover:bg-green-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  orange: 'bg-accent-orange hover:bg-orange-700',
  gray: 'bg-gray-600 hover:bg-gray-700'
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="text-center">
        <div className="mb-4">
          <img 
            src={category.icon} 
            alt={category.title.en}
            className="w-16 h-16 mx-auto object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.title.en}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {category.description.en}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-blue">
            {category.count}
          </span>
          <button className={`btn ${colorClasses[category.color]} text-white px-4 py-2 text-sm`}>
            View Editions
          </button>
        </div>
      </div>
    </div>
  )
}
