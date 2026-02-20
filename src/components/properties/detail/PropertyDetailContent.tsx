import { notFound } from 'next/navigation'
import { PropertyImageGallery } from './PropertyImageGallery'
import { PropertyInfo } from './PropertyInfo'
import { PropertyAmenities } from './PropertyAmenities'
import { PropertyInquiryForm } from './PropertyInquiryForm'
import { PropertyMap } from './PropertyMap'
import { PropertyReviews } from './PropertyReviews'
import { PropertyOwner } from './PropertyOwner'
import { Property } from '@/types/property'
import { serverFetch } from '@/lib/api/server'

type PropertyDetailContentProps = {
  lang: string
  propertyId: string
}

async function fetchProperty(id: string): Promise<Property> {
  try {
    // Try to use the API function which now handles mock data
    const { propertiesApi } = await import('@/lib/api/properties')
    const response = await propertiesApi.getById(id)
    
    if (!response.success || !response.data) {
      notFound()
    }
    
    return response.data
  } catch (error) {
    console.error('Failed to fetch property:', error)
    notFound()
  }
}

export async function PropertyDetailContent({ lang, propertyId }: PropertyDetailContentProps) {
  const property = await fetchProperty(propertyId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <PropertyImageGallery images={property.images} title={lang === 'gr' ? property.titleGr : property.titleEn} />
        
        <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16">
            <div className="xl:col-span-2 space-y-12">
              <PropertyInfo property={property} lang={lang} />
              <PropertyAmenities amenities={property.amenities} lang={lang} />
              <PropertyMap 
                latitude={property.latitude} 
                longitude={property.longitude}
                address={property.address}
                city={property.city}
                lang={lang}
              />
              <PropertyReviews propertyId={property.id} lang={lang} />
            </div>
            
            <div className="xl:col-span-1">
              <div className="sticky top-28 space-y-8">
                <PropertyInquiryForm property={property} lang={lang} />
                <PropertyOwner owner={property.owner} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

