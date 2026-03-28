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
  }
}));

export default useSettingsStore;
