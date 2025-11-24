'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth.store';
import { setLogoutHandler, clearLogoutHandler } from '@/lib/api/errorHandler';

/**
 * Component that initializes the authentication error handler
 * This ensures that 401 errors automatically trigger logout
 */
export function AuthInitializer() {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Register the logout handler with the error handler
    setLogoutHandler(() => {
      logout();
    });

    // Cleanup on unmount
    return () => {
      clearLogoutHandler();
    };
  }, [logout]);

  return null;
}

