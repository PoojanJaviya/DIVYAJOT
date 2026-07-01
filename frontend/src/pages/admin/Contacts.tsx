import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { formatDate } from '@/utils/helpers';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Contact {
  id: string; name: string; email: string;
  subject?: string; message: string; status: string; createdAt: string;
}

const DUMMY: Contact[] = [
  { id:'1', name:'Ravi Patel',   email:'ravi@email.com',  subject:'Donation Inquiry',  message:'I want to donate ₹50,000 for the education program.',                    status:'NEW',         createdAt:'2024-12-01' },
  { id:'2', name:'Anita Sharma', email:'anita@email.com', subject:'Volunteer',          message:'I am a doctor and want to join your health camp programs.',               status:'IN_PROGRESS', createdAt:'2024-11-30' },
  { id:'3', name:'Rohit Kumar',  email:'rohit@email.com', subject:'Partnership / CSR',  message:'Our company wants to partner for CSR activities. Please share details.',  status:'NEW',         createdAt:'2024-11-29' },
];

const STATUS_COLORS: Record<string,string> = {
  NEW:         'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED:    'bg-green-100 text-green-700',
  SPAM:        'bg-gray-100 text-gray-500',
};

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.get('/contact')
      .then(r => setContacts(r.data.messages || DUMMY))
      .catch(() => setContacts(DUMMY))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/contact/${id}/status`, { status });
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900">Contact Queries</h1>
          <p className="text-gray-500 text-sm">{contacts.filter(c => c.status === 'NEW').length} new messages</p>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    <span className="text-gray-400 text-sm">{c.email}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </div>
                  {c.subject && <p className="text-sm text-teal-600 font-medium mb-1">{c.subject}</p>}
                  <p className={`text-sm text-gray-600 ${expanded === c.id ? '' : 'line-clamp-1'}`}>{c.message}</p>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} className="text-xs text-gray-400 hover:text-teal-600">
                      {expanded === c.id ? 'Show less' : 'Read more'}
                    </button>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {c.status === 'NEW' && (
                    <button onClick={() => updateStatus(c.id,'IN_PROGRESS')} className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors">
                      In Progress
                    </button>
                  )}
                  {c.status !== 'RESOLVED' && (
                    <button onClick={() => updateStatus(c.id,'RESOLVED')} className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
