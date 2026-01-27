import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function TermsPage({ params }: Props) {
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
                {dict.terms?.title || 'Terms of Service'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.terms?.subtitle || 'Please read these terms carefully before using our services.'}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {dict.terms?.lastUpdated || 'Last updated: January 1, 2024'}
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section1?.title || '1. Acceptance of Terms'}
                  </h2>
                  <p>
                    {dict.terms?.section1?.content || 'By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'}
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section2?.title || '2. Use License'}
                  </h2>
                  <p className="mb-3">
                    {dict.terms?.section2?.paragraph1 || 'Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{dict.terms?.section2?.item1 || 'Modify or copy the materials'}</li>
                    <li>{dict.terms?.section2?.item2 || 'Use the materials for any commercial purpose or for any public display'}</li>
                    <li>{dict.terms?.section2?.item3 || 'Attempt to reverse engineer any software contained on the website'}</li>
                    <li>{dict.terms?.section2?.item4 || 'Remove any copyright or other proprietary notations from the materials'}</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section3?.title || '3. User Accounts'}
                  </h2>
                  <p className="mb-3">
                    {dict.terms?.section3?.paragraph1 || 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.'}
                  </p>
                  <p>
                    {dict.terms?.section3?.paragraph2 || 'You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.'}
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section4?.title || '4. Property Listings and Bookings'}
                  </h2>
                  <p className="mb-3">
                    {dict.terms?.section4?.paragraph1 || 'All property listings are provided for informational purposes only. We do not guarantee the accuracy, completeness, or availability of any property listing. Property availability, pricing, and conditions are subject to change without notice.'}
                  </p>
                  <p>
                    {dict.terms?.section4?.paragraph2 || 'By making a booking through our platform, you agree to comply with all terms and conditions set forth by the property owner and our cancellation and refund policies.'}
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section5?.title || '5. Payment Terms'}
                  </h2>
                  <p className="mb-3">
                    {dict.terms?.section5?.paragraph1 || 'All payments must be made through our secure payment gateway. By providing payment information, you represent and warrant that you are authorized to use the payment method provided.'}
                  </p>
                  <p>
                    {dict.terms?.section5?.paragraph2 || 'Refunds are subject to our cancellation policy and will be processed according to the terms agreed upon at the time of booking.'}
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section6?.title || '6. Prohibited Uses'}
                  </h2>
                  <p className="mb-3">
                    {dict.terms?.section6?.paragraph1 || 'You may not use our service:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{dict.terms?.section6?.item1 || 'In any way that violates any applicable law or regulation'}</li>
                    <li>{dict.terms?.section6?.item2 || 'To transmit any malicious code, viruses, or harmful data'}</li>
                    <li>{dict.terms?.section6?.item3 || 'To impersonate or attempt to impersonate the company or any employee'}</li>
                    <li>{dict.terms?.section6?.item4 || 'To engage in any automated use of the system'}</li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section7?.title || '7. Limitation of Liability'}
                  </h2>
                  <p>
                    {dict.terms?.section7?.content || 'In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.'}
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section8?.title || '8. Changes to Terms'}
                  </h2>
                  <p>
                    {dict.terms?.section8?.content || 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.'}
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.terms?.section9?.title || '9. Contact Information'}
                  </h2>
                  <p>
                    {dict.terms?.section9?.content || 'If you have any questions about these Terms of Service, please contact us at legal@example.com or through our contact page.'}
                  </p>
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
