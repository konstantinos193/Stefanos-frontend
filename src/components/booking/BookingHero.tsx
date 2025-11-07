import { BookingSearchForm } from './BookingSearchForm'

export const BookingHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Solve Your
            <span className="block text-accent-blue">Booking Problems</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Πρόβλη booking λύθηκε! Αξιόπιστη πλατφόρμα κρατήσεων με διαύγεια
          </p>
          
          <div className="max-w-4xl mx-auto mb-12">
            <BookingSearchForm />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">
              Start Booking
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
