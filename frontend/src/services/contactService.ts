import api from './api';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const contactService = {
  send: (payload: ContactPayload) => api.post('/contact', payload),
  getAll: (params?: Record<string, string | number>) =>
    api.get('/contact', { params }),
  updateStatus: (id: string, status: string) =>
    api.patch(`/contact/${id}/status`, { status }),
};
