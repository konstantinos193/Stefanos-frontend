'use client'

import { useState, useEffect } from 'react'
import { Property } from '@/types/property'
import { useAuthStore } from '@/lib/store/auth.store'
import { CustomInput } from '@/components/ui/CustomInput'
import { inquiriesApi, CreateInquiryData } from '@/lib/api/inquiries'

type PropertyInquiryFormProps = {
  property: Property
  lang: string
}

export function PropertyInquiryForm({ property, lang }: PropertyInquiryFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { isAuthenticated, user } = useAuthStore()

  // Pre-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [isAuthenticated, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!name || !email) {
      setError(lang === 'gr' ? 'Παρακαλώ συμπληρώστε όνομα και email' : 'Please fill in name and email')
      return
    }

    setLoading(true)

    try {
      const inquiryData: CreateInquiryData = {
        name,
        email,
        phone: phone || undefined,
        message: message || '',
        propertyId: property.id,
      }

      await inquiriesApi.create(inquiryData)
      setSuccess(true)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-3">
            {lang === 'gr' ? 'Επικοινωνία' : 'Contact Us'}
          </h3>
          <p className="text-blue-100 text-base leading-relaxed">
            {lang === 'gr' 
              ? 'Ενδιαφέρεστε για αυτό το ακίνητο; Στείλτε μας ένα μήνυμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.'
              : 'Interested in this property? Send us a message and we\'ll get back to you as soon as possible.'}
          </p>
        </div>
      </div>

      {/* Price Section */}
      {property.basePrice > 0 && (
        <div className="px-8 py-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                {property.basePrice.toLocaleString()} {property.currency}
              </span>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'gr' ? 'Από' : 'From'} / {lang === 'gr' ? 'διανυκτέρευση' : 'night'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {property.maxGuests} {lang === 'gr' ? 'Επισκέπτες' : 'Guests'} max
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                {lang === 'gr' ? 'Ονοματεπώνυμο' : 'Full Name'} *
              </label>
              <CustomInput
                type="text"
                value={name}
                onChange={setName}
                placeholder={lang === 'gr' ? 'Το ονοματεπώνυμό σας' : 'Your full name'}
                required
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                {lang === 'gr' ? 'Email' : 'Email'} *
              </label>
              <CustomInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                {lang === 'gr' ? 'Τηλέφωνο' : 'Phone'} 
                <span className="font-normal text-gray-500 ml-2">
                  ({lang === 'gr' ? 'προαιρετικό' : 'optional'})
                </span>
              </label>
              <CustomInput
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder={lang === 'gr' ? '+30 123 456 7890' : '+1 234 567 8900'}
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                {lang === 'gr' ? 'Μήνυμα' : 'Message'} 
                <span className="font-normal text-gray-500 ml-2">
                  ({lang === 'gr' ? 'προαιρετικό' : 'optional'})
                </span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none hover:border-gray-300"
                placeholder={lang === 'gr' 
                  ? 'Πείτε μας περισσότερα για το ενδιαφέρον σας για αυτό το ακίνητο...' 
                  : 'Tell us more about your interest in this property...'}
              />
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border-2 border-red-200 p-5 rounded-2xl flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="font-semibold">{lang === 'gr' ? 'Σφάλμα:' : 'Error:'}</span>
                <span className="ml-2">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="text-sm text-green-700 bg-green-50 border-2 border-green-200 p-5 rounded-2xl flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="font-semibold">{lang === 'gr' ? 'Επιτυχία!' : 'Success!'}</span>
                <span className="ml-2">{lang === 'gr' 
                  ? 'Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.'
                  : 'Your message has been sent successfully! We\'ll contact you soon.'}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-xl hover:shadow-2xl text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <span className="relative z-10">
              {loading
                ? (lang === 'gr' ? 'Αποστολή...' : 'Sending...')
                : (lang === 'gr' ? 'Στείλτε το Μήνυμά σας' : 'Send Your Message')}
            </span>
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            {lang === 'gr' 
              ? 'Απαντάμε συνήθως εντός 24 ωρών.'
              : 'We typically respond within 24 hours.'}
          </p>
        </form>
      </div>
    </div>
  )
}
