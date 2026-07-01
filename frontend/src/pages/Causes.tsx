import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CAUSES } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const BG: Record<string, string> = {
  'child-rights': 'from-teal-100 to-teal-200', 'women-empowerment': 'from-pink-100 to-pink-200',
  'old-age-support': 'from-amber-100 to-amber-200', 'education': 'from-blue-100 to-blue-200',
  'healthcare': 'from-green-100 to-green-200', 'food-distribution': 'from-yellow-100 to-yellow-200',
  'disaster-relief': 'from-red-100 to-red-200', 'animal-welfare': 'from-purple-100 to-purple-200',
};

const Causes: React.FC = () => (
  <>
    <Helmet>
      <title>Our Causes – DIVYAJOT</title>
      <meta name="description" content="Explore our 8 active cause areas: Child Rights, Women Empowerment, Education, Healthcare, Food Distribution, and more." />
    </Helmet>

    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Our Causes</h1>
        <p className="text-white/80 text-lg">Eight pillars of positive change — every cause backed by measurable impact.</p>
      </div>
    </div>

    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="All Causes" title="Choose a Cause to Support" center />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CAUSES.map((c, i) => {
            const pct = Math.round((c.raised / c.target) * 100);
            return (
              <motion.div
                key={c.id}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <div className={`h-48 bg-gradient-to-br ${BG[c.id]} flex items-center justify-center text-6xl`}>
                  {c.icon}
                </div>
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 text-base mb-2">{c.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{c.description}</p>

                  <div className="text-xs text-gray-500 mb-2 space-y-1">
                    <div>🎯 Beneficiaries: <strong className="text-gray-800">{c.beneficiaries.toLocaleString('en-IN')}</strong></div>
                    <div>💰 Raised: <strong className="text-teal-600">{formatCurrency(c.raised)}</strong></div>
                  </div>

                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-amber-400" style={{ width: `${pct}%` }} />
                  </div>

                  <Link to="/donate" className="w-full block text-center py-2.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-700 rounded-xl transition-colors duration-200">
                    Donate to this Cause
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <CTABanner />
  </>
);

export default Causes;
