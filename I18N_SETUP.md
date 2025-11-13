# i18n Setup Guide - Next.js 16 Optimal Approach

## ✅ What's Been Set Up

### 1. **JSON Translation Files**
- `src/messages/en.json` - English translations
- `src/messages/el.json` - Greek translations

### 2. **Dynamic Routes** (`/en` and `/el`)
- `src/app/[lang]/layout.tsx` - Language-specific layout
- `src/app/[lang]/page.tsx` - Home page with locale
- All routes now support `/en/...` and `/el/...`

### 3. **Middleware** (`src/middleware.ts`)
- Automatically detects user's language preference
- Redirects to `/en` or `/el` based on:
  1. Cookie preference
  2. Browser Accept-Language header
  3. Defaults to English

### 4. **Dictionary Loader** (`src/lib/i18n/dictionaries.ts`)
- `getDictionary(locale)` - Loads from JSON files (fast, cached)
- `getDictionaryFromBackend(locale)` - Fetches from your backend API with fallback

### 5. **Translation Hook** (`src/lib/hooks/useTranslation.ts`)
- Client-side hook for components
- Lazy loads translations
- Supports parameter replacement

## 🚀 How to Use

### Server Components (Recommended)
```typescript
import { getDictionary } from '@/lib/i18n/dictionaries'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'en' | 'el')
  
  return <h1>{dict.hero.title}</h1>
}
```

### Client Components
```typescript
'use client'
import { useTranslation } from '@/lib/hooks/useTranslation'

export const MyComponent = () => {
  const t = useTranslation()
  
  return <h1>{t('hero.title')}</h1>
}
```

### Fetch from Backend (Optional)
```typescript
import { getDictionaryFromBackend } from '@/lib/i18n/dictionaries'

// In your API route or server component
const dict = await getDictionaryFromBackend('el')
```

## 📁 Backend API Endpoint (Optional)

If you want to fetch translations from your backend:

```typescript
// backend/src/routes/translations.ts
GET /api/translations/:locale

// Response:
{
  "navigation": {
    "home": "Home" // or "Αρχική" for el
  },
  "hero": {
    "title": "Find Your Perfect"
  }
}
```

## 🔄 Migration Steps

1. **Move existing pages** to `[lang]` folder:
   - `app/page.tsx` → `app/[lang]/page.tsx`
   - `app/booking/page.tsx` → `app/[lang]/booking/page.tsx`
   - etc.

2. **Update all page components** to accept `params: Promise<{ lang: string }>`

3. **Update links** to include locale:
   ```typescript
   <Link href={`/${lang}/about`}>About</Link>
   ```

4. **Update Navigation** to use locale in hrefs

## ✨ Benefits

✅ **SEO Friendly** - Separate URLs for each language  
✅ **Server Components** - Better performance  
✅ **Backend Integration** - Can fetch from API  
✅ **Type Safe** - TypeScript support  
✅ **Cached** - Translations are cached for performance  
✅ **Fallback** - Falls back to JSON if API fails  

## 🎯 Next Steps

1. Add more translations to JSON files
2. Update all page routes to use `[lang]` structure
3. (Optional) Set up backend API endpoint for translations
4. Update all internal links to include locale

