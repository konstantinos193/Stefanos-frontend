interface CategoryHeaderProps {
  category: string
}

const categoryInfo = {
  properties: {
    title: {
      gr: 'Ακίνητα',
      en: 'Properties'
    },
    description: {
      gr: '5 εκδόσεις ακινήτων για κάθε ανάγκη',
      en: '5 property editions for every need'
    },
    icon: '🏠',
    count: 5
  },
  booking: {
    title: {
      gr: 'Κρατήσεις',
      en: 'Booking Services'
    },
    description: {
      gr: '5 εκδόσεις υπηρεσιών κρατήσεων',
      en: '5 booking service editions'
    },
    icon: '📅',
    count: 5
  },
  airbnb: {
    title: {
      gr: 'Airbnb',
      en: 'Airbnb Integration'
    },
    description: {
      gr: '3 εκδόσεις Airbnb integration',
      en: '3 Airbnb integration editions'
    },
    icon: '🏡',
    count: 3
  },
  knowledge: {
    title: {
      gr: 'Γνώση',
      en: 'Knowledge & Services'
    },
    description: {
      gr: '4 εκδόσεις γνώσης και υπηρεσιών',
      en: '4 knowledge and service editions'
    },
    icon: '📚',
    count: 4
  },
  admin: {
    title: {
      gr: 'Διαχείριση',
      en: 'Admin & Management'
    },
    description: {
      gr: '3 εκδόσεις διαχείρισης',
      en: '3 management editions'
    },
    icon: '⚙️',
    count: 3
  }
}

export const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const info = categoryInfo[category as keyof typeof categoryInfo]

  if (!info) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-6xl mb-6">{info.icon}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {info.title.en}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {info.description.en}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-2xl font-bold text-accent-blue">
              {info.count} Editions
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">
              {info.description.gr}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
