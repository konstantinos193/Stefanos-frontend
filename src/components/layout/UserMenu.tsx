'use client'

import { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

export const UserMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg text-sm font-medium text-header-text hover:text-white hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-blue hover:bg-blue-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black shadow-md hover:shadow-lg"
        >
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-header-text hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black"
        aria-label="User menu"
        aria-expanded={isMenuOpen}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-blue-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-sm font-semibold">U</span>
        </div>
        <span className="hidden md:inline">User</span>
        <svg
          className={clsx(
            'w-4 h-4 transition-transform duration-200',
            isMenuOpen && 'rotate-180'
          )}
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
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-1 z-20">
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
              href="/bookings"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              My Bookings
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Settings
            </Link>
            <hr className="my-1 border-gray-800" />
            <button
              onClick={() => {
                setIsAuthenticated(false)
                setIsMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
