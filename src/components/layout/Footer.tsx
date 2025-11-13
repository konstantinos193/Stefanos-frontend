import { FooterLinks } from './FooterLinks'
import { FooterContact } from './FooterContact'
import { FooterSocial } from './FooterSocial'
import { FooterCopyright } from './FooterCopyright'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterLinks />
          <FooterContact />
          <FooterSocial />
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-700 mb-4">
              Subscribe to get updates on new properties and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
              />
              <button className="bg-accent-blue hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  )
}
