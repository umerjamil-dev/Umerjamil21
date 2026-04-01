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
      const [profile, company, users, roles, permissions] = await Promise.all([
        api.get('/settings/profile'),
        api.get('/settings/company'),
        api.get('/settings/users'),
        api.get('/settings/roles'),
        api.get('/settings/permissions')
      ]);
      set({ 
        profile: profile.data,
        company: company.data,
        users: users.data,
        roles: roles.data,
        permissions: permissions.data,
        isLoading: false 
      });
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

  updateCompany: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.patch('/settings/company', data);
      set({ company: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Role CRUD
  createRole: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/settings/roles', data);
      set((state) => ({ roles: [...state.roles, response.data], isLoading: false }));
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
      set((state) => ({ permissions: [...state.permissions, response.data], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Assign Permissions to Role
  assignPermissionsToRole: async (roleId, permissionIds) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/settings/roles/${roleId}/permissions`, { permissions: permissionIds });
      // Refresh settings to get updated role-permission associations
      const rolesRes = await api.get('/settings/roles');
      set({ roles: rolesRes.data, isLoading: false });
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useSettingsStore;
