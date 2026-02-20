import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const normalizedLang = lang === 'el' || lang === 'gr' ? 'el' : 'en'
  const dict = await getDictionary(normalizedLang)
  
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {dict.about?.title || 'About Our Company'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.about?.subtitle || 'Your trusted partner in Greek real estate, providing exceptional service and expertise since our founding.'}
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {dict.about?.history?.title || 'Our Story'}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    {dict.about?.history?.paragraph1 || 'Our company was founded with a vision to transform the real estate experience. We combine deep local knowledge with modern technology to provide our clients with exceptional service.'}
                  </p>
                  <p>
                    {dict.about?.history?.paragraph2 || 'Over the years, we have built a reputation for integrity, professionalism, and results. Our team of experienced professionals understands the unique needs of each client and works tirelessly to exceed expectations.'}
                  </p>
                  <p>
                    {dict.about?.history?.paragraph3 || 'From luxury properties to investment opportunities, we offer comprehensive real estate services that help our clients achieve their goals, whether they are renting or managing properties.'}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <span className="text-gray-400 text-lg">Company Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {dict.about?.mission?.title || 'Our Mission & Values'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dict.about?.mission?.subtitle || 'The principles that guide everything we do'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dict.about?.values?.integrity?.title || 'Integrity'}
                </h3>
                <p className="text-gray-600">
                  {dict.about?.values?.integrity?.description || 'We conduct business with honesty, transparency, and ethical practices in every transaction.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dict.about?.values?.excellence?.title || 'Excellence'}
                </h3>
                <p className="text-gray-600">
                  {dict.about?.values?.excellence?.description || 'We strive for excellence in every aspect of our service, from property selection to client support.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dict.about?.values?.clientFocus?.title || 'Client Focus'}
                </h3>
                <p className="text-gray-600">
                  {dict.about?.values?.clientFocus?.description || 'Your success is our success. We prioritize your needs and work to deliver personalized solutions.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {dict.about?.whyChooseUs?.title || 'Why Choose Us?'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dict.about?.whyChooseUs?.subtitle || 'What sets us apart in the real estate market'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.about?.advantages?.localExpertise?.title || 'Local Expertise'}
                  </h3>
                  <p className="text-gray-600">
                    {dict.about?.advantages?.localExpertise?.description || 'Deep knowledge of the Greek real estate market, local regulations, and property values across different regions.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.about?.advantages?.technology?.title || 'Modern Technology'}
                  </h3>
                  <p className="text-gray-600">
                    {dict.about?.advantages?.technology?.description || 'Advanced tools and platforms for property management, virtual tours, and seamless transactions.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.about?.advantages?.comprehensive?.title || 'Comprehensive Services'}
                  </h3>
                  <p className="text-gray-600">
                    {dict.about?.advantages?.comprehensive?.description || 'From property search to management, investment consulting, and maintenance - we cover all your real estate needs.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.about?.advantages?.support?.title || '24/7 Support'}
                  </h3>
                  <p className="text-gray-600">
                    {dict.about?.advantages?.support?.description || 'Round-the-clock assistance for property owners and guests, ensuring peace of mind at all times.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 lg:py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {dict.about?.stats?.title || 'Our Impact'}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {dict.about?.stats?.subtitle || 'Numbers that reflect our commitment to excellence'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-accent-blue mb-2">
                  {dict.about?.stats?.propertiesCount || '500+'}
                </div>
                <div className="text-gray-300">
                  {dict.about?.stats?.propertiesLabel || 'Properties'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-accent-blue mb-2">
                  {dict.about?.stats?.clientsCount || '1000+'}
                </div>
                <div className="text-gray-300">
                  {dict.about?.stats?.clientsLabel || 'Satisfied Clients'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-accent-blue mb-2">
                  {dict.about?.stats?.locationsCount || '50+'}
                </div>
                <div className="text-gray-300">
                  {dict.about?.stats?.locationsLabel || 'Locations'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-accent-blue mb-2">
                  {dict.about?.stats?.yearsCount || '10+'}
                </div>
                <div className="text-gray-300">
                  {dict.about?.stats?.yearsLabel || 'Years Experience'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
