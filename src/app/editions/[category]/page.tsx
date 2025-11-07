import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CategoryHeader } from '@/components/editions/CategoryHeader'
import { CategoryEditions } from '@/components/editions/CategoryEditions'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <CategoryHeader category={params.category} />
        <CategoryEditions category={params.category} />
      </main>
      <Footer />
    </>
  )
}
