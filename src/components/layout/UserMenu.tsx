'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth.store';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useTranslation } from '@/lib/hooks/useTranslation';

export const UserMenu = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const { language } = useLanguage();
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push(`/${language}`);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href={`/${language}/auth/login`}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-blue hover:bg-blue-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black shadow-md hover:shadow-lg"
        >
          {t('auth.login')}
        </Link>
        <Link
          href={`/${language}/auth/register`}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-blue hover:bg-blue-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black shadow-md hover:shadow-lg"
        >
          {t('auth.register')}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-black ${
          isMenuOpen 
            ? 'bg-accent-blue shadow-lg' 
            : 'bg-gray-800 hover:bg-gray-700 shadow-md hover:shadow-lg border border-gray-700'
        }`}
      >
        {user.profilePicture ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg">
            <Image
              src={user.profilePicture}
              alt={user.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-base shadow-lg ring-2 ring-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className={`hidden sm:block text-sm font-semibold ${
          isMenuOpen ? 'text-white' : 'text-white'
        }`}>
          {user.name}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isMenuOpen ? 'rotate-180 text-white' : 'text-gray-300'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
            className="fixed inset-0 z-[100]"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl py-2 z-[110] min-w-[200px]">
            <Link
              href={`/${language}/profile`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
            >
              {t('userMenu.profile')}
            </Link>
            <Link
              href={`/${language}/dashboard`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
            >
              {t('userMenu.dashboard')}
            </Link>
            <Link
              href={`/${language}/bookings`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
            >
              {t('userMenu.myBookings')}
            </Link>
            {user.role === 'OWNER' && (
              <Link
                href={`/${language}/dashboard/owner`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
              >
                {t('userMenu.ownerDashboard')}
              </Link>
            )}
            {user.role === 'ADMIN' && (
              <Link
                href={`/${language}/admin`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
              >
                {t('userMenu.adminPanel')}
              </Link>
            )}
            <Link
              href={`/${language}/settings`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 rounded-md mx-1"
            >
              {t('userMenu.settings')}
            </Link>
            <hr className="my-2 border-gray-800 mx-2" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition-colors duration-200 rounded-md mx-1"
            >
              {t('auth.logout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
