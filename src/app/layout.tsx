import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HtmlLangUpdater } from '@/components/layout/HtmlLangUpdater'
import { LanguageProvider } from '@/lib/contexts/LanguageContext'
import { StatsProvider } from '@/lib/contexts/StatsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'STEFANOS MALESKOS Real Estate',
    template: '%s | STEFANOS MALESKOS Real Estate'
  },
  description: 'ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | STEFANOS MALESKOS Real Estate - Trusted real estate platform with modern booking management',
  keywords: ['real estate', 'ακίνητα', 'booking', 'κρατήσεις', 'property management', 'STEFANOS MALESKOS', 'ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ'],
  authors: [{ name: 'STEFANOS MALESKOS Real Estate' }],
  creator: 'STEFANOS MALESKOS Real Estate',
  publisher: 'STEFANOS MALESKOS Real Estate',
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
    title: 'STEFANOS MALESKOS Real Estate | ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ Real Estate',
    description: 'ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | STEFANOS MALESKOS Real Estate - Trusted real estate platform with modern booking management',
    siteName: 'STEFANOS MALESKOS Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STEFANOS MALESKOS Real Estate | ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ Real Estate',
    description: 'ΣΤΕΦΑΝΟΣ ΜΑΛΕΣΚΟΣ Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων | STEFANOS MALESKOS Real Estate - Trusted real estate platform with modern booking management',
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
            <HtmlLangUpdater />
            {children}
          </StatsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
