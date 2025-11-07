import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Real Estate Platform',
    template: '%s | Real Estate Platform'
  },
  description: 'Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων',
  keywords: ['real estate', 'ακίνητα', 'booking', 'κρατήσεις', 'property management'],
  authors: [{ name: 'Real Estate Platform Team' }],
  creator: 'Real Estate Platform',
  publisher: 'Real Estate Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://real-estate-platform.com'),
  alternates: {
    canonical: '/',
    languages: {
      'el-GR': '/gr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'el_GR',
    url: 'https://real-estate-platform.com',
    title: 'Real Estate Platform',
    description: 'Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων',
    siteName: 'Real Estate Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Platform',
    description: 'Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
