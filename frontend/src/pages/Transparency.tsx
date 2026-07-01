import React from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import SectionHeader from '@/components/ui/SectionHeader';

const DOCS = [
  { icon: '📄', title: 'Registration Certificate',  desc: 'Societies Registration Act, 1860. Certificate number and details available for verification.',       year: '2016' },
  { icon: '📋', title: '80G Certificate',            desc: 'Section 80G certification enabling donors to claim full tax deduction on contributions.',            year: '2024' },
  { icon: '📑', title: '12AA Certificate',           desc: 'Income Tax Section 12AA registration confirming our status as a charitable organization.',          year: '2024' },
  { icon: '📊', title: 'Annual Report 2023–24',      desc: 'Comprehensive report covering activities, beneficiaries, financials, and program outcomes.',         year: '2024' },
  { icon: '💰', title: 'Audited Financial Report',   desc: 'CA-audited financial statements including balance sheet, income & expenditure, utilization cert.',   year: '2024' },
  { icon: '🔍', title: 'FCRA Registration',          desc: 'Foreign Contribution Regulation Act registration enabling acceptance of international donations.',    year: '2023' },
];

const FINANCIAL = [
  { label: 'Total Donations FY24',  value: '₹47.3 Lakhs' },
  { label: 'Program Expenditure',   value: '₹44.5 Lakhs (94%)' },
  { label: 'Admin & Overhead',      value: '₹2.8 Lakhs (6%)'   },
  { label: 'Beneficiaries Reached', value: '50,247'            },
];

const Transparency: React.FC = () => (
  <>
    <Helmet>
      <title>Transparency & Reports – DIVYAJOT</title>
      <meta name="description" content="Download certificates, annual reports, and financial statements. DIVYAJOT is fully transparent about its operations." />
    </Helmet>

    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Transparency & Reports</h1>
        <p className="text-white/80 text-lg">We believe accountability builds trust. All documents publicly available.</p>
      </div>
    </div>

    {/* Financial summary */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="Financials FY24" title="How We Use Your Donations" center />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {FINANCIAL.map(f => (
            <div key={f.label} className="bg-teal-50 rounded-2xl p-6 text-center border border-teal-100">
              <div className="font-poppins font-bold text-teal-600 text-xl mb-2">{f.value}</div>
              <div className="text-gray-600 text-sm">{f.label}</div>
            </div>
          ))}
        </div>

        {/* Spending bar */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
            <span>Program Expenditure</span>
            <span>94%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" style={{ width: '94%' }} />
          </div>
          <p className="text-gray-500 text-sm text-center">
            94 paise of every rupee donated directly reaches our beneficiaries. Only 6% goes towards administrative costs.
          </p>
        </div>
      </div>
    </section>

    {/* Documents */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="Documents" title="Download Certificates & Reports" center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOCS.map(d => (
            <div key={d.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all duration-300 flex flex-col gap-3">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl">{d.icon}</div>
              <div>
                <h4 className="font-poppins font-bold text-gray-900 mb-1">{d.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{d.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">Issued: {d.year}</span>
                <button
                  onClick={() => toast.success(`Downloading ${d.title}…`)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                >
                  ⬇️ Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Registration banner */}
        <div className="bg-teal-500 rounded-2xl p-8 mt-10 flex flex-wrap justify-between items-center gap-6">
          <div>
            <h3 className="font-poppins font-bold text-white text-xl mb-1">Verified & Certified Organisation</h3>
            <p className="text-white/80 text-sm">All certificates independently verifiable on government portals</p>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'PAN',         val: 'AABTS1234Z'      },
              { label: 'Reg. No.',    val: 'GJ/AHM/2016/001' },
              { label: 'Founded',     val: '2016'             },
              { label: '80G Valid',   val: 'Till 2027'        },
            ].map(d => (
              <div key={d.label} className="text-center">
                <div className="text-white/60 text-xs uppercase tracking-widest mb-1">{d.label}</div>
                <div className="text-white font-bold font-mono text-sm">{d.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Transparency;
