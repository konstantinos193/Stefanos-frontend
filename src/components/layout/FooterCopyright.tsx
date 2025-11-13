export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-8 pt-8 border-t border-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-700 text-sm">
          © {currentYear} Stefanos Spyros Real Estate | Στέφανος Σπύρος Real Estate. All rights reserved.
        </p>
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
