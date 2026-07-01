import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { formatDate } from '@/utils/helpers';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Volunteer {
  id: string; fullName: string; email: string; phone: string;
  city: string; status: string; skills: string; joinedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  APPROVED: 'bg-green-100 text-green-700',
  PENDING:  'bg-amber-100 text-amber-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const DUMMY: Volunteer[] = [
  { id:'1', fullName:'Meera Joshi',   email:'meera@email.com',  phone:'9876543210', city:'Ahmedabad', status:'APPROVED', skills:'Teaching',  joinedAt:'2024-11-01' },
  { id:'2', fullName:'Arjun Sharma',  email:'arjun@email.com',  phone:'9876543211', city:'Surat',     status:'PENDING',  skills:'Healthcare',joinedAt:'2024-12-01' },
  { id:'3', fullName:'Kavya Patel',   email:'kavya@email.com',  phone:'9876543212', city:'Rajkot',    status:'PENDING',  skills:'IT',        joinedAt:'2024-12-02' },
];

const Volunteers: React.FC = () => {
  const [vols, setVols]       = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/volunteers')
      .then(r => setVols(r.data.volunteers || DUMMY))
      .catch(() => setVols(DUMMY))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, action: 'approve' | 'reject') => {
    try {
      await api.patch(`/volunteers/${id}/${action}`);
      setVols(prev => prev.map(v => v.id === id
        ? { ...v, status: action === 'approve' ? 'APPROVED' : 'REJECTED' }
        : v
      ));
      toast.success(`Volunteer ${action === 'approve' ? 'approved' : 'rejected'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900">Volunteer Management</h1>
          <p className="text-gray-500 text-sm">{vols.filter(v => v.status === 'PENDING').length} pending approvals</p>
        </div>
        <button className="btn-primary text-sm py-2">Export CSV</button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name','Email','Phone','City','Skills','Status','Joined','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vols.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{v.fullName}</td>
                  <td className="px-4 py-3 text-gray-500">{v.email}</td>
                  <td className="px-4 py-3 text-gray-500">{v.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{v.city}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">{v.skills}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[v.status]}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(v.joinedAt)}</td>
                  <td className="px-4 py-3">
                    {v.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(v.id,'approve')} className="text-green-600 hover:text-green-800 text-xs font-semibold">Approve</button>
                        <button onClick={() => updateStatus(v.id,'reject')}  className="text-red-500 hover:text-red-700 text-xs font-semibold">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Volunteers;
