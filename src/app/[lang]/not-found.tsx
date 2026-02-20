import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/lib/hooks/useTranslation'

type Props = {
  params: Promise<{ lang: string }>
}

export default async function NotFound({ params }: Props) {
  let lang = 'en' // default fallback
  
  try {
    const resolvedParams = await params
    lang = resolvedParams.lang || 'en'
  } catch (error) {
    // If params is undefined or fails to resolve, use default language
    lang = 'en'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative h-16 w-32">
            <Image
              src="/logoetc.png"
              alt="SMH Real Estate"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 404 Content */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {lang === 'el' ? 'Η Σελίδα Δεν Βρέθηκε' : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {lang === 'el' 
            ? 'Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί. Ας επιστρέψουμε στην εύρεση του ιδανικού ακινήτου για εσάς.'
            : 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back to finding your perfect property.'
          }
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            {lang === 'el' ? 'Αρχική Σελίδα' : 'Go Home'}
          </Link>
          <Link
            href={`/${lang}/properties`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            {lang === 'el' ? 'Περιήγηση Ακινήτων' : 'Browse Properties'}
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          {lang === 'el' ? 'Αν πιστεύετε ότι πρόκειται για σφάλμα, παρακαλώ ' : 'If you believe this is an error, please '}
          <Link href={`/${lang}/contact`} className="text-blue-600 hover:text-blue-700 underline">
            {lang === 'el' ? 'επικοινωνήστε με την ομάδα υποστήριξής μας' : 'contact our support team'}
          </Link>
        </p>
      </div>
    </div>
  )
}
