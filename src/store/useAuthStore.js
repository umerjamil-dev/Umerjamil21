import { create } from 'zustand';
import api from '../api/axios';

const getSafeJSON = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getSafeJSON('user'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: !localStorage.getItem('token'), // Optimistic: Not loading if token exists
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, access_token } = response.data;

      const userData = user || response.data;
      const tokenData = access_token || (user && user.access_token) || response.data.token;

      if (!tokenData) throw new Error("No access token received");

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', tokenData);

      set({ user: userData, token: tokenData, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.error || err.response?.data?.message || 'Login Failed',
        isLoading: false
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  refresh: async () => {
    try {
      // console.log("[useAuthStore] Manual Refresh calling with token:", useAuthStore.getState().token);
      const response = await api.post('/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` }
      });
      const { user, access_token } = response.data;

      const userData = user || response.data;
      const tokenData = access_token || (user && user.access_token) || response.data.token;

      if (tokenData) {
        localStorage.setItem('token', tokenData);
        if (userData) localStorage.setItem('user', JSON.stringify(userData));
        set({
          token: tokenData,
          user: userData || useAuthStore.getState().user,
          isAuthenticated: true
        });
        return tokenData;
      }
      return null;
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
      return null;

    }
  },

  checkAuth: async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      // console.log("[useAuthStore] checkAuth calling with token:", storedToken);
      const response = await api.post('/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const { user, access_token } = response.data;

      const userData = user || response.data;
      const tokenData = access_token || (user && user.access_token) || response.data.token;

      if (tokenData) {
        localStorage.setItem('token', tokenData);
        if (userData) localStorage.setItem('user', JSON.stringify(userData));
        set({
          user: userData || useAuthStore.getState().user,
          token: tokenData,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({ isLoading: false, isAuthenticated: true });
      }
    } catch (err) {
      // ONLY clear if it's an explicit 401 (Session Expired)
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    }
  }
}));

export default useAuthStore;
