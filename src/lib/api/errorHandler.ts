/**
 * Centralized authentication error handler
 * Handles 401 errors and triggers logout when tokens are expired or invalid
 */

let logoutHandler: (() => void) | null = null;
let isLoggingOut = false;

export function setLogoutHandler(handler: () => void) {
  logoutHandler = handler;
}

export function clearLogoutHandler() {
  logoutHandler = null;
}

export async function handleAuthError(response: Response): Promise<never> {
  // Prevent multiple simultaneous logout attempts
  if (isLoggingOut) {
    throw new Error('Already logging out');
  }

  // Clear tokens from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    // Also clear any persisted auth state
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        if (parsed.state) {
          parsed.state.token = null;
          parsed.state.user = null;
          parsed.state.isAuthenticated = false;
          localStorage.setItem('auth-storage', JSON.stringify(parsed));
        }
      }
    } catch (e) {
      // If parsing fails, just remove the key
      localStorage.removeItem('auth-storage');
    }
  }

  // Get error message from response
  let errorMessage = 'Invalid or expired token';
  try {
    const error = await response.json();
    errorMessage = error.message || errorMessage;
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  // Trigger logout handler if available
  if (logoutHandler) {
    isLoggingOut = true;
    try {
      logoutHandler();
    } finally {
      // Reset flag after a delay to allow logout to complete
      setTimeout(() => {
        isLoggingOut = false;
      }, 1000);
    }
  } else if (typeof window !== 'undefined') {
    // Fallback: redirect to login if handler not set
    isLoggingOut = true;
    window.location.href = '/login';
  }

  throw new Error(errorMessage);
}

