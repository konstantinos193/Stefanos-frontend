import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to English as default language
  redirect('/el')
}
