'use client'

import { useState } from 'react'

export const BookingSearchForm = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    propertyType: '',
    budget: '',
    specialNeeds: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement advanced booking search
    console.log('Advanced booking search:', searchData)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            id="propertyType"
            value={searchData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="input"
          >
            <option value="">Any Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            value={searchData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="input"
          >
            <option value="">Any Budget</option>
            <option value="0-50">€0 - €50/night</option>
            <option value="50-100">€50 - €100/night</option>
            <option value="100-200">€100 - €200/night</option>
            <option value="200-500">€200 - €500/night</option>
            <option value="500+">€500+/night</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="specialNeeds" className="block text-sm font-medium text-gray-700 mb-2">
          Special Requirements
        </label>
        <textarea
          id="specialNeeds"
          value={searchData.specialNeeds}
          onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
          placeholder="Any special requirements or accessibility needs..."
          className="input"
          rows={3}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="flex-1 bg-accent-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Find Perfect Property
        </button>
        <button
          type="button"
          className="flex-1 bg-accent-green hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Get Recommendations
        </button>
      </div>
    </form>
  )
}
