import { IncantoHeader } from '@/components/incanto/IncantoHeader'
import { IncantoFooter } from '@/components/incanto/IncantoFooter'
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
      <IncantoHeader />
      <main className="flex-1 min-h-screen">
        <IncantoHero lang={normalizedLang}>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <IncantoBooking lang={normalizedLang} variant="overlay" />
          </div>
        </IncantoHero>
        <IncantoFacilities lang={normalizedLang} />
      </main>
      <IncantoFooter />
    </>
  )
}

