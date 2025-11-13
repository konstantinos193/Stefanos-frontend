import { notFound } from 'next/navigation'
import { PropertyImageGallery } from './PropertyImageGallery'
import { PropertyInfo } from './PropertyInfo'
import { PropertyAmenities } from './PropertyAmenities'
import { PropertyBookingForm } from './PropertyBookingForm'
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
    const response = await serverFetch<{ success: boolean; data: Property }>(`/properties/${id}`)
    
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
    <div className="max-w-7xl mx-auto">
      <PropertyImageGallery images={property.images} title={lang === 'gr' ? property.titleGr : property.titleEn} />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyInfo property={property} lang={lang} />
            <PropertyAmenities amenities={property.amenities} lang={lang} />
            <PropertyMap 
              latitude={property.latitude} 
              longitude={property.longitude}
              address={property.address}
              city={property.city}
            />
            <PropertyReviews propertyId={property.id} lang={lang} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <PropertyBookingForm property={property} lang={lang} />
              <PropertyOwner owner={property.owner} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

