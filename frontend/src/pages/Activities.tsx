import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ACTIVITIES } from '@/utils/constants';
import SectionHeader from '@/components/ui/SectionHeader';

const FILTERS = [
  { value: 'all',       label: 'All Activities' },
  { value: 'food',      label: 'Food Programs'  },
  { value: 'relief',    label: 'Winter Relief'  },
  { value: 'women',     label: 'Women'          },
  { value: 'education', label: 'Education'      },
  { value: 'health',    label: 'Healthcare'     },
];

const Activities: React.FC = () => {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? ACTIVITIES
    : ACTIVITIES.filter(a => a.category === active);

  return (
    <>
      <Helmet>
        <title>Activities & Events – DIVYAJOT</title>
        <meta name="description" content="Explore our on-ground activities including Bhojan Seva, health camps, education drives, and winter relief programs." />
      </Helmet>

      <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Activities & Events</h1>
          <p className="text-white/80 text-lg">Real programs, real impact — see what we do on the ground every day.</p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="On the Ground" title="Our Active Programs" />

          {/* Filter */}
          <div className="flex gap-2 flex-wrap mb-10">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                  active === f.value
                    ? 'border-teal-500 bg-teal-50 text-teal-600'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-teal-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map(a => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden"
                >
                  <div className="h-44 bg-teal-50 flex items-center justify-center text-5xl">{a.icon}</div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase tracking-wide mb-2">{a.tag}</span>
                    <h3 className="font-poppins font-bold text-gray-900 text-base mb-2">{a.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{a.description}</p>
                    <div className="flex gap-3 text-xs text-gray-400 pt-2 border-t border-gray-100">
                      <span>📅 {a.date}</span>
                      <span>👥 {a.beneficiaries}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No activities found for this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Activities;
