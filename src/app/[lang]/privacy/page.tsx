import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PrivacyPage({ params }: Props) {
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
                {dict.privacy?.title || 'Privacy Policy'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.privacy?.subtitle || 'We are committed to protecting your privacy and ensuring the security of your personal information.'}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {dict.privacy?.lastUpdated || 'Last updated: January 1, 2024'}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section1?.title || '1. Introduction'}
                  </h2>
                  <p>
                    {dict.privacy?.section1?.content || 'This Privacy Policy describes how we collect, use, and protect your personal information when you use our website and services. By using our services, you agree to the collection and use of information in accordance with this policy.'}
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section2?.title || '2. Information We Collect'}
                  </h2>
                  <p className="mb-3">
                    {dict.privacy?.section2?.paragraph1 || 'We collect several types of information for various purposes to provide and improve our service:'}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dict.privacy?.section2?.personalData?.title || 'Personal Data'}
                      </h3>
                      <p>
                        {dict.privacy?.section2?.personalData?.content || 'While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to: name, email address, phone number, postal address, and payment information.'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dict.privacy?.section2?.usageData?.title || 'Usage Data'}
                      </h3>
                      <p>
                        {dict.privacy?.section2?.usageData?.content || 'We may also collect information about how you access and use our service, including your IP address, browser type, pages visited, time and date of visit, and other diagnostic data.'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dict.privacy?.section2?.cookies?.title || 'Cookies and Tracking Data'}
                      </h3>
                      <p>
                        {dict.privacy?.section2?.cookies?.content || 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section3?.title || '3. How We Use Your Information'}
                  </h2>
                  <p className="mb-3">
                    {dict.privacy?.section3?.paragraph1 || 'We use the collected information for various purposes:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{dict.privacy?.section3?.item1 || 'To provide and maintain our service'}</li>
                    <li>{dict.privacy?.section3?.item2 || 'To notify you about changes to our service'}</li>
                    <li>{dict.privacy?.section3?.item3 || 'To allow you to participate in interactive features of our service'}</li>
                    <li>{dict.privacy?.section3?.item4 || 'To provide customer support'}</li>
                    <li>{dict.privacy?.section3?.item5 || 'To gather analysis or valuable information to improve our service'}</li>
                    <li>{dict.privacy?.section3?.item6 || 'To monitor the usage of our service'}</li>
                    <li>{dict.privacy?.section3?.item7 || 'To detect, prevent and address technical issues'}</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section4?.title || '4. Data Storage and Security'}
                  </h2>
                  <p className="mb-3">
                    {dict.privacy?.section4?.paragraph1 || 'The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'}
                  </p>
                  <p>
                    {dict.privacy?.section4?.paragraph2 || 'However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.'}
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section5?.title || '5. Data Sharing and Disclosure'}
                  </h2>
                  <p className="mb-3">
                    {dict.privacy?.section5?.paragraph1 || 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{dict.privacy?.section5?.item1 || 'With service providers who assist us in operating our website and conducting our business'}</li>
                    <li>{dict.privacy?.section5?.item2 || 'To comply with legal obligations or respond to lawful requests'}</li>
                    <li>{dict.privacy?.section5?.item3 || 'To protect and defend our rights or property'}</li>
                    <li>{dict.privacy?.section5?.item4 || 'With your consent or at your direction'}</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section6?.title || '6. Your Rights (GDPR)'}
                  </h2>
                  <p className="mb-3">
                    {dict.privacy?.section6?.paragraph1 || 'If you are a resident of the European Economic Area (EEA), you have certain data protection rights:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{dict.privacy?.section6?.item1 || 'The right to access, update, or delete your personal information'}</li>
                    <li>{dict.privacy?.section6?.item2 || 'The right of rectification - to have your information corrected'}</li>
                    <li>{dict.privacy?.section6?.item3 || 'The right to object to processing of your personal data'}</li>
                    <li>{dict.privacy?.section6?.item4 || 'The right of restriction - to request restriction of processing'}</li>
                    <li>{dict.privacy?.section6?.item5 || 'The right to data portability - to receive your data in a structured format'}</li>
                    <li>{dict.privacy?.section6?.item6 || 'The right to withdraw consent at any time'}</li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section7?.title || '7. Third-Party Services'}
                  </h2>
                  <p>
                    {dict.privacy?.section7?.content || 'Our service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the privacy policies or practices of any third-party sites or services.'}
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section8?.title || '8. Children\'s Privacy'}
                  </h2>
                  <p>
                    {dict.privacy?.section8?.content || 'Our service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.'}
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section9?.title || '9. Changes to This Privacy Policy'}
                  </h2>
                  <p>
                    {dict.privacy?.section9?.content || 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.'}
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {dict.privacy?.section10?.title || '10. Contact Us'}
                  </h2>
                  <p>
                    {dict.privacy?.section10?.content || 'If you have any questions about this Privacy Policy, please contact us at privacy@example.com or through our contact page.'}
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
