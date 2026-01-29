import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './header-footer.css'
import { HtmlLangUpdater } from '@/components/layout/HtmlLangUpdater'
import { LanguageProvider } from '@/lib/contexts/LanguageContext'
import { StatsProvider } from '@/lib/contexts/StatsContext'
import { AuthInitializer } from '@/components/auth/AuthInitializer'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    default: 'SMH Real Estate',
    template: '%s | SMH Real Estate'
  },
  description: 'SMH Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | SMH Real Estate - Trusted real estate platform with modern booking management',
  keywords: ['real estate', 'ακίνητα', 'booking', 'κρατήσεις', 'property management', 'SMH'],
  authors: [{ name: 'SMH Real Estate' }],
  creator: 'SMH Real Estate',
  publisher: 'SMH Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smholdings.gr'),
  alternates: {
    canonical: '/',
    languages: {
      'el-GR': '/el',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'el_GR',
    url: 'https://smholdings.gr',
    title: 'SMH Real Estate',
    description: 'SMH Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | SMH Real Estate - Trusted real estate platform with modern booking management',
    siteName: 'SMH Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMH Real Estate',
    description: 'SMH Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | SMH Real Estate - Trusted real estate platform with modern booking management',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logoetc.png',
    shortcut: '/logoetc.png',
    apple: '/logoetc.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider initialLanguage="en">
          <StatsProvider>
            <AuthInitializer />
            <HtmlLangUpdater />
            {children}
          </StatsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
