'use client'

import { useState, useEffect } from 'react'
import { Property } from '@/types/property'
import { useAuthStore } from '@/lib/store/auth.store'
import { CustomInput } from '@/components/ui/CustomInput'

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
      // TODO: Implement API call to send inquiry
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
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
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {lang === 'gr' ? 'Επικοινωνία' : 'Contact Us'}
        </h3>
        <p className="text-sm text-gray-600">
          {lang === 'gr' 
            ? 'Ενδιαφέρεστε για αυτό το ακίνητο; Στείλτε μας ένα μήνυμα και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.'
            : 'Interested in this property? Send us a message and we\'ll get back to you as soon as possible.'}
        </p>
      </div>

      {property.basePrice > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {property.basePrice.toLocaleString()} {property.currency}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {lang === 'gr' ? 'Τιμή' : 'Price'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Όνομα' : 'Full Name'} *
          </label>
          <CustomInput
            type="text"
            value={name}
            onChange={setName}
            placeholder={lang === 'gr' ? 'Το όνομά σας' : 'Your name'}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Email' : 'Email'} *
          </label>
          <CustomInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Τηλέφωνο' : 'Phone'} (optional)
          </label>
          <CustomInput
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder={lang === 'gr' ? '+30 123 456 7890' : '+1 234 567 8900'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang === 'gr' ? 'Μήνυμα' : 'Message'} (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={lang === 'gr' 
              ? 'Πείτε μας για το ενδιαφέρον σας για αυτό το ακίνητο...' 
              : 'Tell us about your interest in this property...'}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
            {lang === 'gr' 
              ? 'Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.'
              : 'Your message has been sent successfully! We\'ll contact you soon.'}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading
            ? (lang === 'gr' ? 'Αποστολή...' : 'Sending...')
            : (lang === 'gr' ? 'Στείλετε Μήνυμα' : 'Send Message')}
        </button>
      </form>
    </div>
  )
}
