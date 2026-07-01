import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { formatCurrency, formatDate } from '@/utils/helpers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Donation {
  id: string; donorName: string; donorEmail: string;
  amount: number; status: string; frequency: string;
  cause?: string; createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: 'bg-green-100 text-green-700',
  PENDING: 'bg-amber-100 text-amber-700',
  FAILED:  'bg-red-100 text-red-700',
};

const DUMMY: Donation[] = [
  { id:'1', donorName:'Ankit Shah',    donorEmail:'ankit@email.com',  amount:2500,  status:'SUCCESS', frequency:'ONE_TIME', cause:'Education',   createdAt:'2024-12-01' },
  { id:'2', donorName:'Priya Mehta',   donorEmail:'priya@email.com',  amount:1000,  status:'SUCCESS', frequency:'MONTHLY',  cause:'Healthcare',  createdAt:'2024-11-30' },
  { id:'3', donorName:'Ravi Patel',    donorEmail:'ravi@email.com',   amount:5000,  status:'PENDING', frequency:'ONE_TIME', cause:'Food',        createdAt:'2024-11-29' },
  { id:'4', donorName:'Sunita Verma',  donorEmail:'sunita@email.com', amount:10000, status:'SUCCESS', frequency:'ONE_TIME', cause:'Child Rights',createdAt:'2024-11-28' },
];

const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');

  useEffect(() => {
    api.get('/donations')
      .then(r => setDonations(r.data.donations || DUMMY))
      .catch(() => setDonations(DUMMY))
      .finally(() => setLoading(false));
  }, []);

  const filtered = donations.filter(d =>
    d.donorName.toLowerCase().includes(search.toLowerCase()) ||
    d.donorEmail.toLowerCase().includes(search.toLowerCase())
  );

  const total = donations.filter(d => d.status === 'SUCCESS').reduce((s, d) => s + d.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900">Donation Management</h1>
          <p className="text-gray-500 text-sm">Total collected: <strong className="text-teal-600">{formatCurrency(total)}</strong></p>
        </div>
        <button className="btn-primary text-sm py-2">Export CSV</button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by donor name or email…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field mb-6 max-w-sm"
      />

      {loading ? <LoadingSpinner /> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Donor','Email','Amount','Frequency','Cause','Status','Date','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{d.donorName}</td>
                  <td className="px-4 py-3 text-gray-500">{d.donorEmail}</td>
                  <td className="px-4 py-3 font-semibold text-teal-600">{formatCurrency(d.amount)}</td>
                  <td className="px-4 py-3 text-gray-500">{d.frequency === 'ONE_TIME' ? 'One-time' : 'Monthly'}</td>
                  <td className="px-4 py-3 text-gray-500">{d.cause || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[d.status] || 'bg-gray-100 text-gray-600'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(d.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button className="text-teal-600 hover:text-teal-800 text-xs font-semibold">Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No donations found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Donations;
