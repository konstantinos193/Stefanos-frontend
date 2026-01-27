'use client';

import { useTranslation } from '@/lib/hooks/useTranslation'

export const FooterContact = () => {
  const t = useTranslation();
  
  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: t('footer.address'),
      value: t('footer.addressValue')
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('footer.phone'),
      value: t('footer.phoneValue'),
      href: `tel:${t('footer.phoneValue').replace(/\s/g, '')}`
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: t('footer.email'),
      value: t('footer.emailValue'),
      href: `mailto:${t('footer.emailValue')}`
    }
  ]

  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">
        {t('footer.contactInfo')}
      </h3>
      <div className="space-y-4">
        {contactInfo.map((item, index) => {
          const content = (
            <div className="flex items-start space-x-3">
              <div className="text-accent-blue mt-0.5 flex-shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-xs font-medium mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-accent-blue transition-colors duration-200 text-sm break-words"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-300 text-sm break-words">{item.value}</p>
                )}
              </div>
            </div>
          );

          return item.href ? (
            <div key={index}>{content}</div>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    </div>
  )
}
