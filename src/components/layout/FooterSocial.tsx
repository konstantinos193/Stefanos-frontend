'use client';

import { useTranslation } from '@/lib/hooks/useTranslation'

export const FooterSocial = () => {
  const t = useTranslation();

  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-4">
        {t('footer.followUs')}
      </h3>
      <div className="flex space-x-4">
        <a
          href="https://www.facebook.com/profile.php?id=61575429243332"
          className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  )
}
