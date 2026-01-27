import { PropertyOwner as PropertyOwnerType } from '@/types/property'

type PropertyOwnerProps = {
  owner: PropertyOwnerType
  lang: string
}

export function PropertyOwner({ owner, lang }: PropertyOwnerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {lang === 'gr' ? 'Στοιχεία Επικοινωνίας' : 'Contact Information'}
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
            {lang === 'gr' ? 'Διαχειριστής Ακινήτου' : 'Property Manager'}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">
          {lang === 'gr' 
            ? 'Για περισσότερες πληροφορίες σχετικά με αυτό το ακίνητο, χρησιμοποιήστε τη φόρμα επικοινωνίας.'
            : 'For more information about this property, please use the contact form above.'}
        </p>
      </div>
    </div>
  )
}

