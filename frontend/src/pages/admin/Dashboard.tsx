import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/services/api';

interface Stats {
  totalDonations: number; totalDonationAmount: number;
  totalVolunteers: number; pendingVolunteers: number;
  totalBeneficiaries: number; newContacts: number;
}

const MONTHLY = [
  { m:'Jan',amt:85000 },{ m:'Feb',amt:92000 },{ m:'Mar',amt:110000 },
  { m:'Apr',amt:98000 },{ m:'May',amt:130000 },{ m:'Jun',amt:145000 },
];

const QUICK_LINKS = [
  { icon:'💰', label:'Donations',  path:'/admin/donations',  color:'bg-teal-50 text-teal-600'  },
  { icon:'🤝', label:'Volunteers', path:'/admin/volunteers', color:'bg-amber-50 text-amber-600' },
  { icon:'📅', label:'Events',     path:'/admin/events',     color:'bg-blue-50 text-blue-600'   },
  { icon:'📩', label:'Contacts',   path:'/admin/contacts',   color:'bg-purple-50 text-purple-600'},
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get('/admin/stats')
      .then(r => setStats(r.data))
      .catch(() => setStats({
        totalDonations: 284, totalDonationAmount: 4730000,
        totalVolunteers: 820, pendingVolunteers: 12,
        totalBeneficiaries: 50247, newContacts: 8,
      }));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Total Donations',     value: stats ? `₹${(stats.totalDonationAmount/100000).toFixed(1)}L` : '—', sub:`${stats?.totalDonations || 0} transactions`,   icon:'💰', color:'border-l-teal-500'  },
          { label:'Active Volunteers',   value: stats?.totalVolunteers || '—',   sub:`${stats?.pendingVolunteers || 0} pending approval`, icon:'🤝', color:'border-l-amber-400' },
          { label:'Total Beneficiaries', value: stats?.totalBeneficiaries?.toLocaleString('en-IN') || '—', sub:'All time', icon:'👥', color:'border-l-blue-400'  },
          { label:'New Contacts',        value: stats?.newContacts || '—',        sub:'Awaiting reply',  icon:'📩', color:'border-l-purple-400'},
        ].map(c => (
          <div key={c.label} className={`bg-white rounded-xl p-5 border border-gray-200 border-l-4 ${c.color}`}>
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl">{c.icon}</span>
            </div>
            <div className="font-poppins font-bold text-2xl text-gray-900 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-5">Donations (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY}>
              <XAxis dataKey="m" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Donations']} />
              <Bar dataKey="amt" fill="#0F766E" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-5">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(q => (
              <Link
                key={q.path}
                to={q.path}
                className={`${q.color} rounded-xl p-4 text-center hover:opacity-80 transition-opacity`}
              >
                <div className="text-2xl mb-1">{q.icon}</div>
                <div className="text-xs font-semibold">{q.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-5">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon:'💰', text:'New donation of ₹2,500 from Ankit Shah',      time:'2 min ago'  },
            { icon:'🤝', text:'Meera Joshi registered as a volunteer',        time:'15 min ago' },
            { icon:'📩', text:'New contact query from Ravi Patel (Donation)', time:'1 hr ago'   },
            { icon:'📅', text:'Bhojan Seva event updated for Dec 25',         time:'3 hr ago'   },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <span className="text-xl">{a.icon}</span>
              <span className="text-sm text-gray-700 flex-1">{a.text}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
