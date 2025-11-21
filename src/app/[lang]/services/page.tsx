import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServicesOverview } from '@/components/incanto/ServicesOverview'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  
  // Normalize lang parameter
  const normalizedLang = lang === 'el' || lang === 'gr' ? 'el' : 'en'

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-white">
        <ServicesOverview lang={normalizedLang} />
      </main>
      <Footer />
    </>
  )
}

