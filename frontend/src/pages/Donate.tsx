import React from 'react';
import { Helmet } from 'react-helmet-async';
import DonateWidget from '@/components/donate/DonateWidget';

const TRUST_ITEMS = [
  { icon: '📄', title: '80G Certified',      desc: 'Claim full tax deduction on your donation under Section 80G.' },
  { icon: '🔍', title: '100% Transparent',   desc: 'Annual audit reports and financial statements publicly available.' },
  { icon: '🛡️', title: 'Secure Gateway',    desc: 'Razorpay PCI-DSS Level 1 certified — your data is always safe.' },
  { icon: '📧', title: 'Instant Receipt',    desc: 'Tax receipt and thank-you email sent immediately after donation.' },
];

const Donate: React.FC = () => (
  <>
    <Helmet>
      <title>Donate – DIVYAJOT</title>
      <meta name="description" content="Donate to DIVYAJOT. Support child rights, education, healthcare, and food programs. 80G tax benefits available." />
    </Helmet>

    {/* Hero */}
    <div
      className="pt-18 text-white py-20"
      style={{ background: 'linear-gradient(135deg,#0F766E 0%,#0a5954 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Make a Difference Today</h1>
        <p className="text-white/80 text-lg">
          Every rupee you give reaches a family, feeds a child, or puts a student through school.
          100% transparent · 80G tax benefits.
        </p>
      </div>
    </div>

    {/* Donate widget */}
    <section
      className="py-20"
      style={{ background: 'linear-gradient(135deg,#0F766E 0%,#0a5954 100%)' }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <DonateWidget />
      </div>
    </section>

    {/* Trust signals */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-poppins font-bold text-gray-900 text-2xl text-center mb-12">
          Why Donors Trust Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map(t => (
            <div key={t.title} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-4xl mb-4">{t.icon}</div>
              <h3 className="font-poppins font-bold text-gray-900 mb-2">{t.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Registration details */}
    <section className="py-10 bg-teal-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div>
            <h3 className="font-poppins font-bold text-white text-lg mb-1">Verified & Certified Organisation</h3>
            <p className="text-white/80 text-sm">All certificates independently verifiable on government portals</p>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'PAN Number',   val: 'AABTS1234Z'      },
              { label: 'Reg. Number',  val: 'GJ/AHM/2016/001' },
              { label: '80G Valid',    val: 'Till 2027'        },
            ].map(d => (
              <div key={d.label} className="text-center">
                <div className="text-white/60 text-xs uppercase tracking-widest mb-1">{d.label}</div>
                <div className="text-white font-bold font-mono">{d.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Donate;
