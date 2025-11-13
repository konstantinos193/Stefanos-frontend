import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertiesContent } from '@/components/properties/PropertiesContent'

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { lang } = await params
  const search = await searchParams

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-gray-50">
        <Suspense fallback={<PropertiesLoadingSkeleton />}>
          <PropertiesContent lang={lang} searchParams={search} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

function PropertiesLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

