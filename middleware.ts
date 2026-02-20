import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const isMissingLocale = !pathname.startsWith('/en') && !pathname.startsWith('/el')

  // Redirect if there is no locale
  if (isMissingLocale) {
    // Get the preferred language from the user's browser
    const acceptLanguage = request.headers.get('accept-language')
    let preferredLanguage = 'en' // default to English

    if (acceptLanguage) {
      // Parse accept-language header to get preferred language
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase())

      // Check if Greek is preferred
      if (languages.some(lang => lang.startsWith('el'))) {
        preferredLanguage = 'el'
      }
      // Check if English is preferred
      else if (languages.some(lang => lang.startsWith('en'))) {
        preferredLanguage = 'en'
      }
    }

    // Create the new URL with the preferred language
    let newPath = `/${preferredLanguage}${pathname}`

    // Remove the trailing slash if it's just the root
    if (newPath === `/${preferredLanguage}/`) {
      newPath = `/${preferredLanguage}`
    }

    return NextResponse.redirect(new URL(newPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|bmp)).*)',
  ],
}
