import { create } from 'zustand';
import api from '../api/axios';

const usePaymentStore = create((set) => ({
  payments: [],
  isLoading: false,
  error: null,

  fetchPayments: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/payments');
      const data = response.data?.data || response.data || [];
      set({ payments: Array.isArray(data) ? data : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addPayment: async (paymentData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/payments', paymentData);
      const newPayment = response.data?.data || response.data;
      
      // After payment is added, update the booking's paid_amount
      if (paymentData.booking_id && paymentData.amount) {
        try {
          // Fetch the booking to get current paid_amount
          const bookingResponse = await api.get(`/bookings/${paymentData.booking_id}`);
          const booking = bookingResponse.data?.data || bookingResponse.data;
          
          if (booking) {
            const currentPaid = parseFloat(booking.paid_amount || 0);
            const newPaid = currentPaid + parseFloat(paymentData.amount);
            const total = parseFloat(booking.total_amount || 0);
            const remaining = Math.max(0, total - newPaid);
            
            // Update booking with new paid amount
            await api.put(`/bookings/${paymentData.booking_id}`, {
              ...booking,
              paid_amount: newPaid,
              remaining_amount: remaining,
            });
          }
        } catch (updateError) {
          console.error('Failed to update booking paid_amount:', updateError);
        }
      }
      
      set((state) => ({
        payments: [newPayment, ...state.payments],
        isLoading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchPaymentsByBooking: async (bookingId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/payments/booking/${bookingId}`);
      const data = response.data?.data || response.data || [];
      const paymentsArray = Array.isArray(data) ? data : [];
      set({ payments: paymentsArray, isLoading: false });
      return paymentsArray;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return [];
    }
  }
}));

export default usePaymentStore;
