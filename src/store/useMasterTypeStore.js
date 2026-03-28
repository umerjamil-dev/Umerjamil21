import { create } from 'zustand';
import api from '../api/axios';

const useMasterTypeStore = create((set) => ({
  masterData: {
    property_type: [],
    status: [],
    agreement_status: [],
    contract_status: [],
    payment_method: [],
    collection_status: [],
    assigned_to: [],
    urgency_level: [],
    lifecycle_status: [],
    lead: [],
    leadsource: []
  },
  loading: false,
  error: null,

  fetchMasterData: async () => {
    set({ loading: true, error: null });
    try {
      const types = [
        'property_type',
        'status',
        'agreement_status',
        'contract_status',
        'payment_method',
        'collection_status',
        'assigned_to',
        'urgency_level',
        'lifecycle_status',
        'lead',
        'leadsource'
      ];

      // Fetch all types in parallel
      const responses = await Promise.all(
        types.map(type => api.get(`/master-types/${type}`))
      );

      // Create the new masterData object
      const newMasterData = {};
      types.forEach((type, index) => {
        // Handle the data mapping based on previous controller logic (?for=) if necessary
        // but the user's snippet uses simple segment pattern: /master-types/${type}
        newMasterData[type] = responses[index].data.requested_names || responses[index].data.data || responses[index].data || [];
      });

      set({ 
        masterData: newMasterData, 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch master data', 
        loading: false 
      });
      console.error('fetchMasterData error:', error);
    }
  }
}));

export default useMasterTypeStore;
