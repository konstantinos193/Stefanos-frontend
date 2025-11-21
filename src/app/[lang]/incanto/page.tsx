import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IncantoHero } from '@/components/incanto/IncantoHero'
import { IncantoFacilities } from '@/components/incanto/IncantoFacilities'
import { IncantoBooking } from '@/components/incanto/IncantoBooking'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function IncantoPage({ params }: Props) {
  const { lang } = await params
  
  // Normalize lang parameter to match component expectations
  const normalizedLang = lang === 'el' || lang === 'gr' ? 'el' : 'en'

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-white">
        <IncantoHero lang={normalizedLang} />
        <IncantoFacilities lang={normalizedLang} />
        <IncantoBooking lang={normalizedLang} />
      </main>
      <Footer />
    </>
  )
}

