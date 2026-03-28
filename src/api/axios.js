import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.5.178:8000/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to inject the memory-only token
api.interceptors.request.use(async (config) => {
  // Dynamically import to avoid circular dependency with useAuthStore
  const { default: useAuthStore } = await import('../store/useAuthStore');
  const token = useAuthStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`[Axios] Attaching token to request: ${config.url}`);
  } else {
    console.warn(`[Axios] No token found in store for request: ${config.url}`);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor for Silent Refresh on 401
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  // If the error is 401 and it's NOT a login or refresh request (to avoid infinite loops)
  if (
    error.response?.status === 401 && 
    !originalRequest._retry && 
    !originalRequest.url.includes('/auth/refresh') &&
    !originalRequest.url.includes('/auth/login')
  ) {
    originalRequest._retry = true;
    
    try {
      const { default: useAuthStore } = await import('../store/useAuthStore');
      const newToken = await useAuthStore.getState().refresh();
      
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  
  return Promise.reject(error);
});

export default api;
