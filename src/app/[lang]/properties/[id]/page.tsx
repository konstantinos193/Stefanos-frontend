import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertyDetailContent } from '@/components/properties/detail/PropertyDetailContent'
import { PropertyDetailSkeleton } from '@/components/properties/detail/PropertyDetailSkeleton'

type Props = {
  params: Promise<{ lang: string; id: string }>
}

export default async function PropertyDetailPage({ params }: Props) {
  const { lang, id } = await params

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-white">
        <Suspense fallback={<PropertyDetailSkeleton />}>
          <PropertyDetailContent lang={lang} propertyId={id} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

