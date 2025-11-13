import type { Metadata } from 'next'
import { LanguageProvider } from '@/lib/contexts/LanguageContext'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'en' | 'el')
  
  return {
    title: {
      default: 'Stefanos Spyros Real Estate',
      template: '%s | Stefanos Spyros Real Estate'
    },
    description: lang === 'el' 
      ? 'Στέφανος Σπύρος Real Estate - Αξιόπιστη πλατφόρμα ακινήτων με σύγχρονη διαχείριση κρατήσεων'
      : 'Stefanos Spyros Real Estate - Trusted real estate platform with modern booking management',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'el-GR': '/el',
        'en-US': '/en',
      },
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  
  return (
    <LanguageProvider initialLanguage={lang as 'en' | 'el'}>
      <div className="min-h-screen flex flex-col" lang={lang}>
        {children}
      </div>
    </LanguageProvider>
  )
}

