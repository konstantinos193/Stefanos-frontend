'use client'

import { useState } from 'react'

export const UserMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <a
          href="/login"
          className="text-header-text hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Login
        </a>
        <a
          href="/register"
          className="bg-accent-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Register
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-header-text hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">U</span>
        </div>
        <span>User</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isMenuOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="/bookings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Bookings
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <hr className="my-1" />
          <button
            onClick={() => setIsAuthenticated(false)}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
