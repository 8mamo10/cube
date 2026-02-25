import { api, apiService } from './api.service';
import { User, LoginDto, AuthResponse, UserRole } from '@stamp-card/shared';

interface RegisterDto {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.accessToken) {
      apiService.setAccessToken(response.data.accessToken);
    }
    return response.data;
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.accessToken) {
      apiService.setAccessToken(response.data.accessToken);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    apiService.clearAccessToken();
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async refresh(): Promise<{ accessToken: string }> {
    const response = await api.post<{ accessToken: string }>('/auth/refresh');
    if (response.data.accessToken) {
      apiService.setAccessToken(response.data.accessToken);
    }
    return response.data;
  },
};
