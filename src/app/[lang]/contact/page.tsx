import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: Props) {
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
                {dict.contact?.title || 'Contact Us'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.contact?.subtitle || 'We\'d love to hear from you. Get in touch with our team and we\'ll respond as soon as possible.'}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  {dict.contact?.info?.title || 'Get in Touch'}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dict.contact?.info?.addressLabel || 'Address'}
                      </h3>
                      <p className="text-gray-600">
                        {dict.contact?.info?.address || '123 Main Street, Suite 100, City, State 12345'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dict.contact?.info?.phoneLabel || 'Phone'}
                      </h3>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-accent-blue transition-colors">
                        {dict.contact?.info?.phone || '+1 (234) 567-8900'}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dict.contact?.info?.emailLabel || 'Email'}
                      </h3>
                      <a href="mailto:info@example.com" className="text-gray-600 hover:text-accent-blue transition-colors">
                        {dict.contact?.info?.email || 'info@example.com'}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {dict.contact?.info?.hoursLabel || 'Business Hours'}
                      </h3>
                      <p className="text-gray-600">
                        {dict.contact?.info?.hours || 'Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Map Location</span>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  {dict.contact?.form?.title || 'Send us a Message'}
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict.contact?.form?.firstName || 'First Name'}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                        placeholder={dict.contact?.form?.firstNamePlaceholder || 'John'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict.contact?.form?.lastName || 'Last Name'}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                        placeholder={dict.contact?.form?.lastNamePlaceholder || 'Doe'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.contact?.form?.email || 'Email'}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.contact?.form?.emailPlaceholder || 'john.doe@example.com'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.contact?.form?.phone || 'Phone (Optional)'}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.contact?.form?.phonePlaceholder || '+1 XXX XXX XXXX'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.contact?.form?.subject || 'Subject'}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.contact?.form?.subjectPlaceholder || 'How can we help you?'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.contact?.form?.message || 'Message'}
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.contact?.form?.messagePlaceholder || 'Tell us about your inquiry...'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-accent-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {dict.contact?.form?.submit || 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
