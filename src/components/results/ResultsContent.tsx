import { searchPropertiesServer } from '@/lib/api/properties'
import { PropertySearchParams } from '@/types/property'
import { PropertyList } from './PropertyList'
import { FiltersSidebar } from './FiltersSidebar'
import { SortDropdown } from './SortDropdown'
import { Pagination } from './Pagination'
import { getDictionary } from '@/lib/i18n/dictionaries'

interface ResultsContentProps {
  lang: string
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function ResultsContent({ lang, searchParams }: ResultsContentProps) {
  const dict = await getDictionary(lang)
  
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
    sortOrder: typeof searchParams.sortOrder === 'string' ? (searchParams.sortOrder as 'asc' | 'desc') : undefined
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
  const resultText = hasResults
    ? dict.results.found.replace('{count}', data.pagination.total.toString())
    : dict.results.noResults

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dict.results.title}</h1>
        <p className="text-gray-600">{resultText}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltersSidebar lang={lang} />
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {dict.results.showing
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

