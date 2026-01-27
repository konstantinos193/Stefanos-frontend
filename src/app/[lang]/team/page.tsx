import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function TeamPage({ params }: Props) {
  const { lang } = await params
  const normalizedLang = lang === 'el' || lang === 'gr' ? 'el' : 'en'
  const dict = await getDictionary(normalizedLang)
  
  // Team members data - in a real app, this would come from a database
  const teamMembers = [
    {
      id: 1,
      name: dict.team?.members?.member1?.name || 'John Smith',
      role: dict.team?.members?.member1?.role || 'Founder & CEO',
      bio: dict.team?.members?.member1?.bio || 'With over 15 years of experience in real estate, John leads our team with vision and dedication.',
      email: 'john.smith@example.com',
      phone: '+1 XXX XXX XXXX',
      expertise: [dict.team?.expertise?.realEstate || 'Real Estate', dict.team?.expertise?.investment || 'Investment Consulting']
    },
    {
      id: 2,
      name: dict.team?.members?.member2?.name || 'Jane Doe',
      role: dict.team?.members?.member2?.role || 'Property Management Director',
      bio: dict.team?.members?.member2?.bio || 'Jane specializes in property management and ensures our properties are maintained to the highest standards.',
      email: 'jane.doe@example.com',
      phone: '+1 XXX XXX XXXX',
      expertise: [dict.team?.expertise?.propertyManagement || 'Property Management', dict.team?.expertise?.maintenance || 'Maintenance']
    },
    {
      id: 3,
      name: dict.team?.members?.member3?.name || 'Mike Johnson',
      role: dict.team?.members?.member3?.role || 'Sales & Marketing Manager',
      bio: dict.team?.members?.member3?.bio || 'Mike brings extensive market knowledge and helps clients find their perfect property match.',
      email: 'mike.johnson@example.com',
      phone: '+1 XXX XXX XXXX',
      expertise: [dict.team?.expertise?.sales || 'Sales', dict.team?.expertise?.marketing || 'Marketing']
    },
    {
      id: 4,
      name: dict.team?.members?.member4?.name || 'Sarah Williams',
      role: dict.team?.members?.member4?.role || 'Customer Relations Specialist',
      bio: dict.team?.members?.member4?.bio || 'Sarah ensures exceptional customer service and maintains strong relationships with our clients.',
      email: 'sarah.williams@example.com',
      phone: '+1 XXX XXX XXXX',
      expertise: [dict.team?.expertise?.customerService || 'Customer Service', dict.team?.expertise?.relations || 'Client Relations']
    }
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
                {dict.team?.title || 'Our Team'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {dict.team?.subtitle || 'Meet the experienced professionals dedicated to helping you achieve your real estate goals.'}
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-gray-200 aspect-square flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-accent-blue font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((exp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-blue transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </a>
                      <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent-blue transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent-blue rounded-lg p-8 lg:p-12 text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {dict.team?.cta?.title || 'Join Our Team'}
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                {dict.team?.cta?.description || 'We are always looking for talented individuals to join our growing team. Explore career opportunities with us.'}
              </p>
              <a
                href={`/${lang}/careers`}
                className="inline-block px-8 py-3 bg-white text-accent-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {dict.team?.cta?.button || 'View Careers'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
