import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, AuthResponse } from '../api/auth';
import { setLogoutHandler, clearLogoutHandler } from '../api/errorHandler';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  mfaEnabled?: boolean;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, mfaCode?: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
      clearError: () => void;
      updateProfilePicture: (pictureUrl: string | null) => void;
}

// Track if checkAuth is currently running to prevent multiple simultaneous calls
let checkAuthPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, mfaCode?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Mock credentials for testing
          if (email === 'test@stefanos.com' && password === 'test') {
            const mockUser = {
              id: 'mock-user-1',
              email: 'test@stefanos.com',
              name: 'Test User',
              role: 'USER',
              mfaEnabled: false,
            };
            const mockToken = 'mock-token-test@stefanos.com';
            
            // Restore profile picture from localStorage if exists
            if (typeof window !== 'undefined') {
              const savedPicture = localStorage.getItem(`profile_picture_${mockUser.id}`);
              if (savedPicture) {
                mockUser.profilePicture = savedPicture;
              }
            }
            
            // Store token in apiClient for consistency
            const { apiClient } = await import('../api/client');
            apiClient.setToken(mockToken);
            
            set({
              user: mockUser,
              token: mockToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return;
          }

          const response = await authApi.login({ email, password }, mfaCode);
          
          if (response.requiresMFA && !mfaCode) {
            set({ 
              isLoading: false,
              error: 'MFA code required',
            });
            throw new Error('MFA_REQUIRED');
          }

          if (response.success && response.user && response.token) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          set({ 
            isLoading: false, 
            error: message,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },

      register: async (email: string, password: string, name: string, phone?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register({ email, password, name, phone });
          
          if (response.success && response.user && response.token) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Registration failed';
          set({ 
            isLoading: false, 
            error: message,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },

      logout: () => {
        authApi.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        // Clear any pending checkAuth
        checkAuthPromise = null;
      },

      checkAuth: async () => {
        // If checkAuth is already running, return the existing promise
        if (checkAuthPromise) {
          return checkAuthPromise;
        }

        // Create new checkAuth promise
        checkAuthPromise = (async () => {
          const { token, user } = get();
          if (!token) {
            set({ isAuthenticated: false, user: null });
            checkAuthPromise = null;
            return;
          }

          // Handle mock token - restore mock user if it's a mock token
          if (token.startsWith('mock-token-')) {
            if (user && user.email === 'test@stefanos.com') {
              // Restore profile picture from localStorage if exists
              if (typeof window !== 'undefined') {
                const savedPicture = localStorage.getItem(`profile_picture_${user.id}`);
                if (savedPicture && !user.profilePicture) {
                  set({
                    user: {
                      ...user,
                      profilePicture: savedPicture,
                    },
                    isAuthenticated: true,
                    isLoading: false,
                  });
                  checkAuthPromise = null;
                  return;
                }
              }
              // User already exists, just ensure authenticated state
              set({
                isAuthenticated: true,
                isLoading: false,
              });
              checkAuthPromise = null;
              return;
            }
            // If we have a mock token but no user, restore the mock user
            let mockUser = {
              id: 'mock-user-1',
              email: 'test@stefanos.com',
              name: 'Test User',
              role: 'USER',
              mfaEnabled: false,
            };
            
            // Restore profile picture from localStorage if exists
            if (typeof window !== 'undefined') {
              const savedPicture = localStorage.getItem(`profile_picture_${mockUser.id}`);
              if (savedPicture) {
                mockUser.profilePicture = savedPicture;
              }
            }
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            });
            checkAuthPromise = null;
            return;
          }

          set({ isLoading: true });
          try {
            const response = await authApi.getCurrentUser();
            if (response.success && response.user) {
              set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              throw new Error('Authentication failed');
            }
          } catch (error) {
            // Only logout if it's an auth error (401), not network errors
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const isAuthError = errorMessage.includes('Invalid or expired token') || 
                              errorMessage.includes('Unauthorized') ||
                              errorMessage.includes('401');
            
            if (isAuthError) {
              set({
                isAuthenticated: false,
                user: null,
                token: null,
                isLoading: false,
              });
              authApi.logout();
            } else {
              // For network errors, don't logout - just set loading to false
              set({ isLoading: false });
            }
          } finally {
            checkAuthPromise = null;
          }
        })();

        return checkAuthPromise;
      },

      clearError: () => set({ error: null }),

      updateProfilePicture: (pictureUrl: string | null) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              profilePicture: pictureUrl || undefined,
            },
          });
          // Also store in localStorage for persistence
          if (typeof window !== 'undefined') {
            if (pictureUrl) {
              localStorage.setItem(`profile_picture_${user.id}`, pictureUrl);
            } else {
              localStorage.removeItem(`profile_picture_${user.id}`);
            }
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

