import api from './api';

export interface VolunteerPayload {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string;
  interests: string[];
  availability: string;
  bio?: string;
}

export const volunteerService = {
  register: (payload: VolunteerPayload) =>
    api.post('/volunteers/register', payload),

  getAll: (params?: Record<string, string | number>) =>
    api.get('/volunteers', { params }),

  getById: (id: string) => api.get(`/volunteers/${id}`),

  approve: (id: string) => api.patch(`/volunteers/${id}/approve`),

  reject: (id: string, reason?: string) =>
    api.patch(`/volunteers/${id}/reject`, { reason }),
};
