import api from './api';

export interface DonationPayload {
  amount: number;
  frequency: 'ONE_TIME' | 'MONTHLY';
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  cause?: string;
  message?: string;
}

export const donationService = {
  createOrder: (payload: DonationPayload) =>
    api.post('/donations/create-order', payload),

  verifyPayment: (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => api.post('/donations/verify', data),

  getAll: (params?: Record<string, string | number>) =>
    api.get('/donations', { params }),

  getById: (id: string) => api.get(`/donations/${id}`),

  getMyDonations: () => api.get('/donations/my'),

  downloadReceipt: (id: string) =>
    api.get(`/donations/${id}/receipt`, { responseType: 'blob' }),
};
