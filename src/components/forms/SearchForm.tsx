'use client'

import { useState } from 'react'

export const SearchForm = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    propertyType: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Search data:', searchData)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={searchData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Where are you going?"
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
            Check In
          </label>
          <input
            type="date"
            id="checkIn"
            value={searchData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
            Check Out
          </label>
          <input
            type="date"
            id="checkOut"
            value={searchData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <select
            id="guests"
            value={searchData.guests}
            onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
            className="input"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-accent-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Search Properties
        </button>
      </div>
    </form>
  )
}
