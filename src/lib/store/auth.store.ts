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

// Mock users for development/testing
const MOCK_USERS: Record<string, { user: User; password: string; requiresMFA?: boolean; mfaCode?: string }> = {
  'test@example.com': {
    user: {
      id: 'mock-user-1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      mfaEnabled: false,
    },
    password: 'test',
  },
  'admin@example.com': {
    user: {
      id: 'mock-admin-1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
      mfaEnabled: false,
    },
    password: 'admin',
  },
  'mfa@example.com': {
    user: {
      id: 'mock-mfa-1',
      email: 'mfa@example.com',
      name: 'MFA User',
      role: 'USER',
      mfaEnabled: true,
    },
    password: 'mfa',
    requiresMFA: true,
    mfaCode: '123456', // Mock MFA code
  },
};

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock login function
const mockLogin = async (email: string, password: string, mfaCode?: string): Promise<{ user: User; token: string } | { requiresMFA: boolean }> => {
  // Simulate network delay
  await delay(800);
  
  const mockUser = MOCK_USERS[email.toLowerCase()];
  
  // If user exists in mock users
  if (mockUser) {
    // Check password
    if (mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Check MFA requirement
    if (mockUser.requiresMFA && !mfaCode) {
      return { requiresMFA: true };
    }
    
    // Check MFA code if provided
    if (mockUser.requiresMFA && mfaCode && mfaCode !== mockUser.mfaCode) {
      throw new Error('Invalid MFA code');
    }
    
    // Success - return user and token
    const token = `mock-token-${email.toLowerCase()}`;
    return { user: mockUser.user, token };
  }
  
  // For any other email/password combination, accept it as valid (for easy testing)
  // This allows developers to use any credentials during development
  await delay(600);
  
  // Extract name from email for a more realistic experience
  const emailName = email.split('@')[0];
  const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._-]/g, ' ');
  
  const user: User = {
    id: `mock-user-${email.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    email: email.toLowerCase(),
    name: displayName,
    role: 'USER',
    mfaEnabled: false,
  };
  
  const token = `mock-token-${email.toLowerCase()}`;
  return { user, token };
};

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
          // Try mock login first (for development)
          try {
            const mockResult = await mockLogin(email, password, mfaCode);
            
            if ('requiresMFA' in mockResult) {
              set({ 
                isLoading: false,
                error: 'MFA code required',
              });
              throw new Error('MFA_REQUIRED');
            }
            
            const { user: mockUser, token: mockToken } = mockResult;
            
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
          } catch (mockError: any) {
            // If it's an MFA error, re-throw it
            if (mockError.message === 'MFA_REQUIRED') {
              throw mockError;
            }
            // If mock login fails with other error, try real API
            // (This allows fallback to real API if needed)
          }

          // Try real API login (if mock fails or for production)
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
            // Extract email from token
            const emailFromToken = token.replace('mock-token-', '');
            
            // If we already have a user with matching email, just ensure authenticated state
            if (user && user.email.toLowerCase() === emailFromToken.toLowerCase()) {
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
            
            // If we have a mock token but no user, try to restore from MOCK_USERS or create one
            const mockUserData = MOCK_USERS[emailFromToken.toLowerCase()];
            let mockUser: User;
            
            if (mockUserData) {
              mockUser = { ...mockUserData.user };
            } else {
              // Create a mock user from the email in the token
              const emailName = emailFromToken.split('@')[0];
              const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1).replace(/[._-]/g, ' ');
              mockUser = {
                id: `mock-user-${emailFromToken.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                email: emailFromToken.toLowerCase(),
                name: displayName,
                role: 'USER',
                mfaEnabled: false,
              };
            }
            
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

