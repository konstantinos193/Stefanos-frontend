export const HeroStats = () => {
  const stats = [
    {
      number: '500+',
      label: 'Properties',
      description: 'Available for rent'
    },
    {
      number: '10K+',
      label: 'Happy Guests',
      description: 'Satisfied customers'
    },
    {
      number: '50+',
      label: 'Cities',
      description: 'Across Greece'
    },
    {
      number: '24/7',
      label: 'Support',
      description: 'Always available'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">
            {stat.number}
          </div>
          <div className="text-lg font-semibold text-white mb-1">
            {stat.label}
          </div>
          <div className="text-sm text-gray-300">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  )
}
