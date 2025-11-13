import { UserMenu } from '@/components/layout/UserMenu'

type SignInSectionProps = {
  isAuthenticated?: boolean
}

export const SignInSection = ({ isAuthenticated = false }: SignInSectionProps) => {
  if (isAuthenticated) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          Get Started Today
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sign in to access personalized recommendations, save your favorite properties, 
          and get the best deals on real estate.
        </p>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Εισέλθετε για να αποκτήσετε πρόσβαση σε προσωποποιημένες προτάσεις, 
          αποθηκεύστε τα αγαπημένα σας ακίνητα και λάβετε τις καλύτερες προσφορές.
        </p>
        <div className="flex justify-center">
          <UserMenu />
        </div>
      </div>
    </section>
  )
}

