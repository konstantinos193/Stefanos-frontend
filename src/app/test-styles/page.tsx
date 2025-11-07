export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Tailwind CSS Test - Now Working! 🎉
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Card 1
            </h2>
            <p className="text-gray-600 mb-4">
              This is a test card to verify Tailwind CSS is working properly.
            </p>
            <button className="btn btn-primary">
              Test Button
            </button>
          </div>
          
          <div className="bg-accent-blue p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">
              Test Card 2
            </h2>
            <p className="mb-4">
              This card uses our custom accent-blue color.
            </p>
            <button className="btn btn-secondary">
              Test Button
            </button>
          </div>
          
          <div className="bg-accent-green p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">
              Test Card 3
            </h2>
            <p className="mb-4">
              This card uses our custom accent-green color.
            </p>
            <button className="btn btn-accent">
              Test Button
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Header Test</h2>
          <p className="text-gray-300">
            This should have a black background with white text, similar to our header.
          </p>
        </div>
        
        <div className="mt-8 p-6 bg-header-bg text-header-text rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Custom Header Colors</h2>
          <p className="text-gray-300">
            This uses our custom header-bg and header-text colors.
          </p>
        </div>
      </div>
    </div>
  )
}
