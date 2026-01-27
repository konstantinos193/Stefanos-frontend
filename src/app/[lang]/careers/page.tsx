import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function CareersPage({ params }: Props) {
  const { lang } = await params
  const normalizedLang = lang === 'el' || lang === 'gr' ? 'el' : 'en'
  const dict = await getDictionary(normalizedLang)
  
  // Job openings - in a real app, this would come from a database
  const jobOpenings = [
    {
      id: 1,
      title: dict.careers?.jobs?.job1?.title || 'Real Estate Agent',
      department: dict.careers?.jobs?.job1?.department || 'Sales',
      location: dict.careers?.jobs?.job1?.location || 'Remote / Office',
      type: dict.careers?.jobs?.job1?.type || 'Full-time',
      description: dict.careers?.jobs?.job1?.description || 'We are looking for an experienced real estate agent to join our sales team. The ideal candidate will have a strong track record in property sales and excellent communication skills.'
    },
    {
      id: 2,
      title: dict.careers?.jobs?.job2?.title || 'Property Manager',
      department: dict.careers?.jobs?.job2?.department || 'Operations',
      location: dict.careers?.jobs?.job2?.location || 'Office',
      type: dict.careers?.jobs?.job2?.type || 'Full-time',
      description: dict.careers?.jobs?.job2?.description || 'Join our operations team as a property manager. You will be responsible for overseeing property maintenance, tenant relations, and ensuring properties meet our quality standards.'
    },
    {
      id: 3,
      title: dict.careers?.jobs?.job3?.title || 'Marketing Specialist',
      department: dict.careers?.jobs?.job3?.department || 'Marketing',
      location: dict.careers?.jobs?.job3?.location || 'Remote / Office',
      type: dict.careers?.jobs?.job3?.type || 'Full-time',
      description: dict.careers?.jobs?.job3?.description || 'We are seeking a creative marketing specialist to help promote our properties and services. Experience with digital marketing and real estate is preferred.'
    }
  ]

  const benefits = [
    dict.careers?.benefits?.benefit1 || 'Competitive salary package',
    dict.careers?.benefits?.benefit2 || 'Health insurance coverage',
    dict.careers?.benefits?.benefit3 || 'Flexible working hours',
    dict.careers?.benefits?.benefit4 || 'Professional development opportunities',
    dict.careers?.benefits?.benefit5 || 'Team building activities',
    dict.careers?.benefits?.benefit6 || 'Modern office environment'
  ]
  
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {dict.careers?.title || 'Careers'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.careers?.subtitle || 'Join our team and help shape the future of real estate services. We are always looking for talented individuals who share our passion for excellence.'}
              </p>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {dict.careers?.culture?.title || 'Our Culture'}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    {dict.careers?.culture?.paragraph1 || 'We believe in creating a positive and inclusive work environment where every team member can thrive. Our culture is built on collaboration, innovation, and mutual respect.'}
                  </p>
                  <p>
                    {dict.careers?.culture?.paragraph2 || 'We value diversity and encourage our employees to bring their unique perspectives to the table. We invest in our team\'s growth through continuous learning opportunities and professional development programs.'}
                  </p>
                  <p>
                    {dict.careers?.culture?.paragraph3 || 'Work-life balance is important to us, and we offer flexible working arrangements to help our team members achieve their personal and professional goals.'}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <span className="text-gray-400 text-lg">Company Culture Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {dict.careers?.benefits?.title || 'Benefits & Perks'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dict.careers?.benefits?.subtitle || 'We offer comprehensive benefits to support our team members'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {dict.careers?.openings?.title || 'Open Positions'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {dict.careers?.openings?.subtitle || 'Explore our current job openings'}
              </p>
            </div>

            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 lg:p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-accent-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                      {dict.careers?.apply || 'Apply Now'}
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            {jobOpenings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {dict.careers?.noOpenings || 'No open positions at the moment. Please check back later.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
                {dict.careers?.applicationForm?.title || 'General Application'}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                {dict.careers?.applicationForm?.subtitle || 'Don\'t see a position that matches your skills? Send us a general application and we\'ll keep you in mind for future opportunities.'}
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.careers?.form?.firstName || 'First Name'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.careers?.form?.firstNamePlaceholder || 'John'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict.careers?.form?.lastName || 'Last Name'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      placeholder={dict.careers?.form?.lastNamePlaceholder || 'Doe'}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.careers?.form?.email || 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    placeholder={dict.careers?.form?.emailPlaceholder || 'john.doe@example.com'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.careers?.form?.phone || 'Phone (Optional)'}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    placeholder={dict.careers?.form?.phonePlaceholder || '+1 XXX XXX XXXX'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.careers?.form?.position || 'Position of Interest'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    placeholder={dict.careers?.form?.positionPlaceholder || 'e.g., Real Estate Agent'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.careers?.form?.message || 'Cover Letter / Message'}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    placeholder={dict.careers?.form?.messagePlaceholder || 'Tell us about yourself and why you\'re interested in joining our team...'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.careers?.form?.resume || 'Resume / CV'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {dict.careers?.form?.resumeHint || 'PDF, DOC, or DOCX format (max 5MB)'}
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {dict.careers?.form?.submit || 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
