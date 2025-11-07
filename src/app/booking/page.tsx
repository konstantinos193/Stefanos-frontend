import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BookingHero } from '@/components/booking/BookingHero'
import { ProblemSolving } from '@/components/booking/ProblemSolving'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { BookingFeatures } from '@/components/booking/BookingFeatures'

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BookingHero />
        <ProblemSolving />
        <BookingFlow />
        <BookingFeatures />
      </main>
      <Footer />
    </>
  )
}
