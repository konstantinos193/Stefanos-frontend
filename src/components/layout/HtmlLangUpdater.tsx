'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const HtmlLangUpdater = () => {
  const pathname = usePathname()

  useEffect(() => {
    const langMatch = pathname.match(/^\/(en|el)(\/|$)/)
    const lang = langMatch ? langMatch[1] : 'en'
    
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [pathname])

  return null
}

