import { RefreshIcon, CreditCardIcon, ChatIcon, KeyIcon, CrossIcon, WrenchIcon } from '@/components/icons'

export const ProblemSolving = () => {
  const problems = [
    {
      id: 'double-booking',
      title: {
        gr: 'Διπλές Κρατήσεις',
        en: 'Double Booking'
      },
      description: {
        gr: 'Αυτόματη αποφυγή διπλών κρατήσεων',
        en: 'Automatic prevention of double bookings'
      },
      solution: {
        gr: 'Σύγχρονη διαχείριση ημερολογίου με real-time updates',
        en: 'Real-time calendar management with instant updates'
      },
      icon: <RefreshIcon size={40} className="text-current" />,
      color: 'blue'
    },
    {
      id: 'payment-issues',
      title: {
        gr: 'Προβλήματα Πληρωμής',
        en: 'Payment Issues'
      },
      description: {
        gr: 'Ασφαλείς και γρήγορες πληρωμές',
        en: 'Secure and fast payment processing'
      },
      solution: {
        gr: 'Πολλαπλές μεθόδους πληρωμής με αυτόματη επεξεργασία',
        en: 'Multiple payment methods with automatic processing'
      },
      icon: <CreditCardIcon size={40} className="text-current" />,
      color: 'green'
    },
    {
      id: 'communication',
      title: {
        gr: 'Επικοινωνία',
        en: 'Communication'
      },
      description: {
        gr: 'Σαφής και άμεση επικοινωνία',
        en: 'Clear and immediate communication'
      },
      solution: {
        gr: 'Σύστημα μηνυμάτων με αυτόματες ειδοποιήσεις',
        en: 'Messaging system with automatic notifications'
      },
      icon: <ChatIcon size={40} className="text-current" />,
      color: 'purple'
    },
    {
      id: 'access-problems',
      title: {
        gr: 'Πρόσβαση',
        en: 'Access Issues'
      },
      description: {
        gr: 'Εύκολη και ασφαλής πρόσβαση',
        en: 'Easy and secure access'
      },
      solution: {
        gr: 'Ψηφιακά κλειδιά και οδηγίες πρόσβασης',
        en: 'Digital keys and access instructions'
      },
      icon: <KeyIcon size={40} className="text-current" />,
      color: 'orange'
    },
    {
      id: 'cancellation',
      title: {
        gr: 'Ακύρωση',
        en: 'Cancellation'
      },
      description: {
        gr: 'Εύκολη ακύρωση και επιστροφή χρημάτων',
        en: 'Easy cancellation and refund processing'
      },
      solution: {
        gr: 'Αυτόματη επεξεργασία ακυρώσεων με διαφανείς όρους',
        en: 'Automatic cancellation processing with transparent terms'
      },
      icon: <CrossIcon size={40} className="text-current" />,
      color: 'red'
    },
    {
      id: 'maintenance',
      title: {
        gr: 'Συντήρηση',
        en: 'Maintenance'
      },
      description: {
        gr: 'Γρήγορη επίλυση προβλημάτων συντήρησης',
        en: 'Quick resolution of maintenance issues'
      },
      solution: {
        gr: '24/7 υποστήριξη με άμεση επικοινωνία τεχνικών',
        en: '24/7 support with immediate technician contact'
      },
      icon: <WrenchIcon size={40} className="text-current" />,
      color: 'gray'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Common Booking Problems
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Πρόβλη booking λύθηκε! Αξιόπιστα - πρόσβαση shmeia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div key={problem.id} className="card hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-4">
                <div className="mb-4 flex justify-center text-accent-blue">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {problem.title.en}
                </h3>
                <p className="text-gray-600 mb-4">
                  {problem.description.en}
                </p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Our Solution:
                </h4>
                <p className="text-sm text-gray-600">
                  {problem.solution.en}
                </p>
              </div>
              
              <div className="mt-4">
                <span className="text-xs text-gray-500">
                  {problem.description.gr}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
