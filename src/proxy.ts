import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'el']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  // 1. Check cookie first (user preference)
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale
      }
    }
  }

  // 3. Default to English
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Skip if already has locale or is an API route, static file, or Next.js internal
  if (
    pathnameHasLocale ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Get locale and redirect
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  // Set locale cookie
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('locale', locale, { maxAge: 60 * 60 * 24 * 365 }) // 1 year
  
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip API routes
    // Skip static files
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}

