import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

const MONTHLY_DATA = [
  { month: 'Jan', activities: 8,  beneficiaries: 1200 },
  { month: 'Feb', activities: 12, beneficiaries: 1800 },
  { month: 'Mar', activities: 10, beneficiaries: 1500 },
  { month: 'Apr', activities: 15, beneficiaries: 2200 },
  { month: 'May', activities: 18, beneficiaries: 2700 },
  { month: 'Jun', activities: 22, beneficiaries: 3300 },
  { month: 'Jul', activities: 20, beneficiaries: 3000 },
  { month: 'Aug', activities: 25, beneficiaries: 3800 },
  { month: 'Sep', activities: 28, beneficiaries: 4200 },
  { month: 'Oct', activities: 24, beneficiaries: 3600 },
  { month: 'Nov', activities: 30, beneficiaries: 4500 },
  { month: 'Dec', activities: 32, beneficiaries: 4800 },
];

const CAUSE_DONATIONS = [
  { name: 'Education',  value: 28, color: '#0F766E' },
  { name: 'Healthcare', value: 22, color: '#F59E0B' },
  { name: 'Food',       value: 18, color: '#3b82f6' },
  { name: 'Women',      value: 15, color: '#8b5cf6' },
  { name: 'Child',      value: 12, color: '#f43f5e' },
  { name: 'Others',     value: 5,  color: '#6b7280' },
];

const VOLUNTEER_GROWTH = [
  { year: '2016', count: 12  },
  { year: '2017', count: 45  },
  { year: '2018', count: 120 },
  { year: '2019', count: 220 },
  { year: '2020', count: 310 },
  { year: '2021', count: 500 },
  { year: '2022', count: 640 },
  { year: '2023', count: 750 },
  { year: '2024', count: 820 },
];

const IMPACT_BOXES = [
  { num: '50,247', label: 'Total Beneficiaries',    icon: '👥' },
  { num: '₹47.3L', label: 'Donations Received FY24',icon: '💰' },
  { num: '12',     label: 'Districts Covered',      icon: '🗺️' },
  { num: '94%',    label: 'Funds to Programs',      icon: '✅' },
];

const Impact: React.FC = () => (
  <>
    <Helmet>
      <title>Impact Dashboard – DIVYAJOT</title>
      <meta name="description" content="Real-time impact metrics, donation charts, and beneficiary data from DIVYAJOT's programs." />
    </Helmet>

    {/* Hero */}
    <div className="pt-18 bg-gray-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 before:content-[''] before:w-1.5 before:h-1.5 before:bg-amber-400 before:rounded-full">
          Impact Dashboard
        </span>
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Numbers That Tell Our Story</h1>
        <p className="text-white/60 text-lg">Updated monthly from ground teams across all program areas.</p>
      </div>
    </div>

    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Impact boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {IMPACT_BOXES.map(b => (
            <div key={b.label} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
              <div className="text-3xl mb-3">{b.icon}</div>
              <div className="font-poppins font-extrabold text-amber-400 text-3xl mb-1">{b.num}</div>
              <div className="text-white/60 text-sm">{b.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly activities */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white/90 font-semibold mb-6">Monthly Activity Count (2024)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
                />
                <Bar dataKey="activities" fill="#0F766E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donations by cause */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white/90 font-semibold mb-6">Donations by Cause Area</h4>
            <div className="flex gap-6 items-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={CAUSE_DONATIONS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {CAUSE_DONATIONS.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {CAUSE_DONATIONS.map(c => (
                  <div key={c.name} className="flex items-center gap-2 text-sm">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-white/70 flex-1">{c.name}</span>
                    <span className="text-white/90 font-semibold">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Beneficiaries */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white/90 font-semibold mb-6">Monthly Beneficiaries Served (2024)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="beneficiaries" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Volunteer growth */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-white/90 font-semibold mb-6">Volunteer Growth (2016–2024)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={VOLUNTEER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                <Line type="monotone" dataKey="count" stroke="#0F766E" strokeWidth={3} dot={{ fill: '#0F766E', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  </>
);

export default Impact;
