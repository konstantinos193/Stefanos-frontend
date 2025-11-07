import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EditionsHero } from '@/components/editions/EditionsHero'
import { EditionsGrid } from '@/components/editions/EditionsGrid'
import { EditionsCategories } from '@/components/editions/EditionsCategories'

export default function EditionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <EditionsHero />
        <EditionsCategories />
        <EditionsGrid />
      </main>
      <Footer />
    </>
  )
}
