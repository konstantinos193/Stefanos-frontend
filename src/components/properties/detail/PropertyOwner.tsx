import { PropertyOwner as PropertyOwnerType } from '@/types/property'

type PropertyOwnerProps = {
  owner: PropertyOwnerType
  lang: string
}

export function PropertyOwner({ owner, lang }: PropertyOwnerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {lang === 'gr' ? 'Ιδιοκτήτης' : 'Property Owner'}
      </h3>
      
      <div className="flex items-center gap-4">
        {owner.avatar ? (
          <img
            src={owner.avatar}
            alt={owner.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-xl font-medium">
              {owner.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <div>
          <div className="font-semibold text-gray-900">{owner.name}</div>
          <div className="text-sm text-gray-600">
            {lang === 'gr' ? 'Ιδιοκτήτης' : 'Property Owner'}
          </div>
        </div>
      </div>
      
      <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors">
        {lang === 'gr' ? 'Επικοινωνία' : 'Contact Owner'}
      </button>
    </div>
  )
}

