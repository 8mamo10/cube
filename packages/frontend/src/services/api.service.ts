import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.api.post('/auth/refresh');
            this.setAccessToken(response.data.accessToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            }

            return this.api(originalRequest);
          } catch (refreshError) {
            this.clearAccessToken();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  getApi() {
    return this.api;
  }
}

export const apiService = new ApiService();
export const api = apiService.getApi();
