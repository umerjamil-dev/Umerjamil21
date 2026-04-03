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
  isLoading: true, // Always start in loading state to avoid premature redirection
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

      set({ user: userData, token: tokenData, isAuthenticated: true });
      
      // NEW: Fetch detailed permissions after successful login
      await useAuthStore.getState().fetchUserPermissions();
      
      set({ isLoading: false });
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

  fetchUserPermissions: async () => {
    try {
      const response = await api.get('/user/permissions');
      // console.log('[AuthStore] User Permissions Response Data:', response.data);
      const { permissions, is_admin, role_id } = response.data;
      
      set((state) => ({
        user: { 
          ...state.user, 
          permissions: permissions || [], 
          is_admin: is_admin,
          role_id: role_id
        }
      }));
      
      // Also update localStorage to persist permissions for faster next-load
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        localStorage.setItem('user', JSON.stringify({ 
          ...userObj, 
          permissions: permissions || [],
          is_admin: is_admin,
          role_id: role_id
        }));
      }
    } catch (err) {
      console.error('[AuthStore] Failed to fetch user permissions:', err);
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
          isAuthenticated: true
        });
        
        // NEW: Fetch detailed permissions after successful auth check
        await useAuthStore.getState().fetchUserPermissions();
        set({ isLoading: false });
      } else {
        set({ isLoading: false, isAuthenticated: true });
      }
    } catch (err) {
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
