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


const useAuthStore = create((set, get) => ({
  user: getSafeJSON('user'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: true, // Always start in loading state to avoid premature redirection
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Handle both wrapped and unwrapped responses
      let data = response.data;
      if (data && data.data && !data.user && !data.access_token) {
        data = data.data;
      }
      
      const { user, access_token } = data;

      const userData = user || data;
      const tokenData = access_token || (user && user.access_token) || data.token;

      if (!tokenData) throw new Error("No access token received from server.");

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', tokenData);

      set({ user: userData, token: tokenData, isAuthenticated: true });
      
      // Fetch dynamic permissions - non-blocking for login flow
      try {
        await get().fetchUserPermissions();
      } catch (pErr) {
        console.error("Permission fetch failed but continuing login:", pErr);
      }
      
      set({ isLoading: false });
      return true;
    } catch (err) {
      console.error("Login attempt failed:", err);
      set({
        error: err.response?.data?.error || err.response?.data?.message || err.message || 'Login Failed',
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
      const response = await api.post('/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${get().token}` }
      });
      
      let data = response.data;
      if (data && data.data && !data.user && !data.access_token) {
        data = data.data;
      }

      const { user, access_token } = data;

      const userData = user || data;
      const tokenData = access_token || (user && user.access_token) || data.token;

      if (tokenData) {
        localStorage.setItem('token', tokenData);
        if (userData) localStorage.setItem('user', JSON.stringify(userData));
        set({
          token: tokenData,
          user: userData || get().user,
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
      let data = response.data;
      if (data && data.data && !data.permissions) {
        data = data.data;
      }
      
      const { permissions, is_admin, role_id, calculation_id ,role_name } = data;
      const newPermissions = Array.isArray(permissions) ? permissions : [];
      
      set((state) => ({
        user: { 
          ...state.user, 
          permissions: newPermissions, 
          is_admin: is_admin,
          role_id: role_id,
          calculation_id: calculation_id
        }
      }));
        
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          localStorage.setItem('user', JSON.stringify({ 
            ...userObj, 
            permissions: newPermissions,
            is_admin: is_admin,
            role_id: role_id,
            calculation_id: calculation_id
          }));
        } catch (e) {}
      }
    } catch (err) {
      console.error('[AuthStore] Failed to fetch user permissions:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
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
      
      let data = response.data;
      if (data && data.data && !data.user && !data.access_token) {
        data = data.data;
      }

      const { user, access_token } = data;

      const userData = user || data;
      const tokenData = access_token || (user && user.access_token) || data.token;

      if (tokenData) {
        localStorage.setItem('token', tokenData);
        if (userData) localStorage.setItem('user', JSON.stringify(userData));
        set({
          user: userData || get().user,
          token: tokenData,
          isAuthenticated: true
        });
        
        // Non-blocking fetch
        try {
          await get().fetchUserPermissions();
        } catch (e) {}
        
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
