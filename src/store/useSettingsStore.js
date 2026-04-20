import { create } from 'zustand';
import api from '../api/axios';

const useSettingsStore = create((set) => ({
  profile: null,
  company: null,
  users: [],
  roles: [],
  permissions: [],
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const results = await Promise.allSettled([
        api.get('/settings/profile'),
        api.get('/settings/company'),
        // api.get('/settings/users'),
        api.get('/settings/roles'),
        api.get('/settings/permissions')
      ]);
      const extract = (res) => {
        if (res.status !== 'fulfilled') return null;
        let data = res.value.data;
        
        // Handle Laravel Resource wrapping
        if (data && !Array.isArray(data) && Array.isArray(data.data)) {
          data = data.data;
        }

        // Handle indexed objects (e.g. {"0": {...}, "1": {...}})
        if (data && !Array.isArray(data) && typeof data === 'object') {
          const keys = Object.keys(data);
          if (keys.length > 0 && keys.every(k => !isNaN(k))) {
            return Object.values(data);
          }
        }

        return data;
      };

      const [rawProfile, company, users, roles, permissions] = results.map(extract);

      // /settings/profile returns { success: true, user: { id, name, email, ... } }
      const profile = rawProfile?.user || rawProfile;

      // Backend Inconsistency Fix: Ensure permissions are always objects with IDs
      // Scavenge IDs from roles if the master list only has names (common if backend fix not applied)
      const normalizedPermissions = Array.isArray(permissions) 
        ? permissions.map(p => {
            if (typeof p !== 'string') return p;
            // Scavenge the integer ID from roles if it exists there
            const matchingPerm = roles?.flatMap(r => r.permissions || []).find(rp => rp.name === p);
            return matchingPerm ? { id: matchingPerm.id, name: p } : { id: p, name: p };
          })
        : [];


      set((state) => ({ 
        profile: profile || state.profile,
        company: company || state.company,
        users: Array.isArray(users) ? users : state.users,
        roles: Array.isArray(roles) ? roles : state.roles,
        permissions: normalizedPermissions.length > 0 ? normalizedPermissions : state.permissions,
        isLoading: false 
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateProfile: async (data) => {
    
    set({ isLoading: true });
    try {
      const response = await api.patch('/settings/profile', data);
      set({ profile: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addCompany: async (data) => {
    if (data instanceof FormData) {
      console.log('addCompany FormData:', Object.fromEntries(data.entries()));
    } else {
      console.log('addCompany data:', data);
    }

    set({ isLoading: true });
    try {
      const isFormData = data instanceof FormData;
      const config = isFormData ? {
        headers: { 'Content-Type': 'multipart/form-data' }
      } : {};
 
      const response = await api.post('/settings/company', data, config);
      console.log('addCompany response:', response.data);
      
      const store = useSettingsStore.getState();
      await store.fetchSettings();
      
      set({ isLoading: false });
      return response.data;
    } catch (err) {
      console.error('addCompany error:', err.response?.data || err.message);
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateCompany: async (data) => {
    if (data instanceof FormData) {
      console.log('updateCompany FormData:', Object.fromEntries(data.entries()));
    } else {
      console.log('updateCompany data:', data);
    }

    set({ isLoading: true });
    try {
      const isFormData = data instanceof FormData;
      
      // If image is present, we might need to use POST with _method=PATCH for certain backend setups
      const config = isFormData ? {
        headers: { 'Content-Type': 'multipart/form-data' }
      } : {};

      const response = await api.patch('/settings/company', data, config);
      console.log('updateCompany response:', response.data);
      
      // Refresh all settings to ensure everything is in sync
      const store = useSettingsStore.getState();
      await store.fetchSettings();
      
      set({ isLoading: false });
      return response.data;
    } catch (err) {
      console.error('updateCompany error:', err.response?.data || err.message);
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Role CRUD
  createRole: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/settings/roles', data);
      set((state) => ({ roles: Array.isArray(state.roles) ? [...state.roles, response.data] : [response.data], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateRole: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/settings/roles/${id}`, data);
      set((state) => ({
        roles: state.roles.map((r) => (r.id === id ? response.data : r)),
        isLoading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  deleteRole: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/settings/roles/${id}`);
      set((state) => ({
        roles: state.roles.filter((r) => r.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Permission CRUD
  createPermission: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/settings/permissions', data);
      set((state) => ({ permissions: Array.isArray(state.permissions) ? [...state.permissions, response.data] : [response.data], isLoading: false }));
      return { success: true, data: response.data };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  updatePermission: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/settings/permissions/${id}`, data);
      set((state) => ({
        permissions: state.permissions.map((p) => (p.id === id ? response.data : p)),
        isLoading: false
      }));
      return { success: true, data: response.data };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deletePermission: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/settings/permissions/${id}`);
      set((state) => ({
        permissions: state.permissions.filter((p) => p.id !== id),
        isLoading: false
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  // Assign Permissions to Role
  assignPermissionsToRole: async (roleId, permissionIds) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/settings/roles/${roleId}/permissions`, { permissions: permissionIds });
      
      // Refresh roles to get updated permissions
      const rolesRes = await api.get('/settings/roles');
      let rolesData = rolesRes.data;
      if (rolesData && !Array.isArray(rolesData) && Array.isArray(rolesData.data)) {
        rolesData = rolesData.data;
      }
      
      set({ roles: Array.isArray(rolesData) ? rolesData : [], isLoading: false });
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useSettingsStore;
