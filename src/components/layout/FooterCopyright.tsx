import Image from 'next/image'

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-8 pt-8 border-t border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            src="/logoetc.png"
            alt="STEFANOS MALESKOS Real Estate"
            width={150}
            height={60}
            className="h-auto w-auto max-w-[140px] object-contain opacity-80"
            unoptimized
          />
          <p className="text-gray-700 text-sm text-center md:text-left">
            © {currentYear} STEFANOS MALESKOS Real Estate. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="/terms"
            className="text-gray-700 hover:text-accent-blue text-sm transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            className="text-gray-700 hover:text-accent-blue text-sm transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/cookies"
            className="text-gray-700 hover:text-accent-blue text-sm transition-colors duration-200"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  )
}
