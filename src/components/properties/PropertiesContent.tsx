import { searchPropertiesServer } from '@/lib/api/properties'
import { PropertySearchParams } from '@/types/property'
import { PropertyList } from '@/components/results/PropertyList'
import { FiltersSidebar } from '@/components/results/FiltersSidebar'
import { SortDropdown } from '@/components/results/SortDropdown'
import { Pagination } from '@/components/results/Pagination'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface PropertiesContentProps {
  lang: string
  searchParams: { [key: string]: string | string[] | undefined }
}

const getIntentionTitle = (intention: string | undefined, lang: string): string => {
  const titles: Record<string, { en: string; el: string }> = {
    buy: {
      en: 'Properties for Sale',
      el: 'Ακίνητα προς Πώληση'
    },
    rent: {
      en: 'Properties for Rent',
      el: 'Ακίνητα προς Ενοικίαση'
    },
    sell: {
      en: 'List Your Property',
      el: 'Προσθέστε το Ακίνητό σας'
    }
  }

  if (!intention || !titles[intention]) {
    return lang === 'el' ? 'Όλα τα Ακίνητα' : 'All Properties'
  }

  return titles[intention][lang as 'en' | 'el']
}

const getIntentionDescription = (intention: string | undefined, lang: string): string => {
  const descriptions: Record<string, { en: string; el: string }> = {
    buy: {
      en: 'Find your perfect property to buy',
      el: 'Βρείτε το ιδανικό ακίνητο για αγορά'
    },
    rent: {
      en: 'Discover properties available for rent',
      el: 'Ανακαλύψτε ακίνητα διαθέσιμα προς ενοικίαση'
    },
    sell: {
      en: 'List your property and reach thousands of buyers',
      el: 'Προσθέστε το ακίνητό σας και φτάστε σε χιλιάδες αγοραστές'
    }
  }

  if (!intention || !descriptions[intention]) {
    return lang === 'el' 
      ? 'Ανακαλύψτε όλα τα διαθέσιμα ακίνητα' 
      : 'Discover all available properties'
  }

  return descriptions[intention][lang as 'en' | 'el']
}

export async function PropertiesContent({ lang, searchParams }: PropertiesContentProps) {
  const dict = await getDictionary(lang)
  const intention = typeof searchParams.intention === 'string' ? searchParams.intention : undefined
  
  const params: PropertySearchParams = {
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
    checkIn: typeof searchParams.checkIn === 'string' ? searchParams.checkIn : undefined,
    checkOut: typeof searchParams.checkOut === 'string' ? searchParams.checkOut : undefined,
    guests: typeof searchParams.guests === 'string' ? searchParams.guests : undefined,
    type: typeof searchParams.type === 'string' ? searchParams.type : undefined,
    minPrice: typeof searchParams.minPrice === 'string' ? searchParams.minPrice : undefined,
    maxPrice: typeof searchParams.maxPrice === 'string' ? searchParams.maxPrice : undefined,
    amenities: typeof searchParams.amenities === 'string' ? searchParams.amenities : undefined,
    page: typeof searchParams.page === 'string' ? searchParams.page : '1',
    limit: typeof searchParams.limit === 'string' ? searchParams.limit : '12',
    sortBy: typeof searchParams.sortBy === 'string' ? searchParams.sortBy : undefined,
    sortOrder: typeof searchParams.sortOrder === 'string' ? (searchParams.sortOrder as 'asc' | 'desc') : undefined,
    intention: intention
  }

  let data
  try {
    const response = await searchPropertiesServer(params)
    data = response.data
  } catch (error) {
    console.error('Error fetching properties:', error)
    data = {
      properties: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    }
  }

  const hasResults = data.properties.length > 0
  const count = data.pagination.total
  const resultText = hasResults
    ? lang === 'el'
      ? `Βρέθηκαν ${count} ${count === 1 ? 'ακίνητο' : 'ακίνητα'}`
      : `Found ${count} ${count === 1 ? 'property' : 'properties'}`
    : dict.results.noResults

  const pageTitle = getIntentionTitle(intention, lang)
  const pageDescription = getIntentionDescription(intention, lang)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{pageTitle}</h1>
        <p className="text-gray-600">{pageDescription}</p>
        {hasResults && (
          <p className="text-sm text-gray-500 mt-2">{resultText}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltersSidebar lang={lang} intention={intention} />
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {hasResults && dict.results.showing
                .replace('{current}', data.properties.length.toString())
                .replace('{total}', data.pagination.total.toString())}
            </div>
            <SortDropdown lang={lang} />
          </div>

          <PropertyList properties={data.properties} lang={lang} />

          {hasResults && <Pagination pagination={data.pagination} lang={lang} />}
        </div>
      </div>
    </div>
  )
}

