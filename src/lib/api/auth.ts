import { apiClient } from './client';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    mfaEnabled?: boolean;
  };
  token?: string;
  requiresMFA?: boolean;
  mfaType?: 'TOTP' | 'EMAIL';
}

export interface EnableMFADto {
  type: 'TOTP' | 'EMAIL';
}

export interface EnableMFAResponse {
  success: boolean;
  message: string;
  qrCodeUrl?: string;
  backupCodes?: string[];
  secret?: string;
}

export const authApi = {
  async login(credentials: LoginDto, mfaCode?: string): Promise<AuthResponse> {
    const params = mfaCode ? `?mfaCode=${mfaCode}` : '';
    const response = await apiClient.post<AuthResponse>(
      `/auth/login${params}`,
      credentials
    );
    
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  },

  async getCurrentUser(): Promise<AuthResponse> {
    return apiClient.get<AuthResponse>('/auth/me');
  },

  async enableMFA(data: EnableMFADto): Promise<EnableMFAResponse> {
    return apiClient.post<EnableMFAResponse>('/auth/mfa/enable', data);
  },

  async disableMFA(): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/mfa/disable');
  },

  async sendEmailOTP(userId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/mfa/send-otp', { userId });
  },

  logout() {
    apiClient.setToken(null);
  },
};

