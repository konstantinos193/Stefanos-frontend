interface Feature {
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
}

interface FeatureItemProps {
  feature: Feature
}

export const FeatureItem = ({ feature }: FeatureItemProps) => {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title.en}
      </h3>
      <p className="text-gray-600">
        {feature.description.en}
      </p>
    </div>
  )
}
