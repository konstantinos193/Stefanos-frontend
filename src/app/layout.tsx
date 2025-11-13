import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HtmlLangUpdater } from '@/components/layout/HtmlLangUpdater'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Stefanos Spyros Real Estate',
    template: '%s | Stefanos Spyros Real Estate'
  },
  description: 'Στέφανος Σπύρος Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | Stefanos Spyros Real Estate - Trusted real estate platform with modern booking management',
  keywords: ['real estate', 'ακίνητα', 'booking', 'κρατήσεις', 'property management', 'stefanos spyros', 'στέφανος σπύρος'],
  authors: [{ name: 'Stefanos Spyros Real Estate' }],
  creator: 'Stefanos Spyros Real Estate',
  publisher: 'Stefanos Spyros Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://real-estate-platform.com'),
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
    url: 'https://real-estate-platform.com',
    title: 'Stefanos Spyros Real Estate | Στέφανος Σπύρος Real Estate',
    description: 'Στέφανος Σπύρος Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | Stefanos Spyros Real Estate - Trusted real estate platform with modern booking management',
    siteName: 'Stefanos Spyros Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stefanos Spyros Real Estate | Στέφανος Σπύρος Real Estate',
    description: 'Στέφανος Σπύρος Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | Stefanos Spyros Real Estate - Trusted real estate platform with modern booking management',
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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <HtmlLangUpdater />
        {children}
      </body>
    </html>
  )
}
