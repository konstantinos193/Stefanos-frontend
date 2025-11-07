import { CategoryCard } from './CategoryCard'

export const EditionsCategories = () => {
  const categories = [
    {
      id: 'properties',
      title: {
        gr: 'Ακίνητα',
        en: 'Properties'
      },
      description: {
        gr: '5 εκδόσεις ακινήτων για κάθε ανάγκη',
        en: '5 property editions for every need'
      },
      count: 5,
      icon: 'https://placehold.co/80x80/3b82f6/FFFFFF?text=Properties',
      color: 'blue'
    },
    {
      id: 'booking',
      title: {
        gr: 'Κρατήσεις',
        en: 'Booking Services'
      },
      description: {
        gr: '5 εκδόσεις υπηρεσιών κρατήσεων',
        en: '5 booking service editions'
      },
      count: 5,
      icon: 'https://placehold.co/80x80/10b981/FFFFFF?text=Booking',
      color: 'green'
    },
    {
      id: 'airbnb',
      title: {
        gr: 'Airbnb',
        en: 'Airbnb Integration'
      },
      description: {
        gr: '3 εκδόσεις Airbnb integration',
        en: '3 Airbnb integration editions'
      },
      count: 3,
      icon: 'https://placehold.co/80x80/8b5cf6/FFFFFF?text=Airbnb',
      color: 'purple'
    },
    {
      id: 'knowledge',
      title: {
        gr: 'Γνώση',
        en: 'Knowledge & Services'
      },
      description: {
        gr: '4 εκδόσεις γνώσης και υπηρεσιών',
        en: '4 knowledge and service editions'
      },
      count: 4,
      icon: 'https://placehold.co/80x80/f59e0b/FFFFFF?text=Knowledge',
      color: 'orange'
    },
    {
      id: 'admin',
      title: {
        gr: 'Διαχείριση',
        en: 'Admin & Management'
      },
      description: {
        gr: '3 εκδόσεις διαχείρισης',
        en: '3 management editions'
      },
      count: 3,
      icon: 'https://placehold.co/80x80/6b7280/FFFFFF?text=Admin',
      color: 'gray'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Edition Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Οργανωμένες κατηγορίες για εύκολη πλοήγηση
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
