export const EditionsHero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            20 Editions
            <span className="block text-accent-blue">of Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Αξιόπιστες υπηρεσίες με διαύγεια γνώσης για κάθε ανάγκη
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">
              Explore All Editions
            </button>
            <button className="btn btn-secondary">
              View Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
