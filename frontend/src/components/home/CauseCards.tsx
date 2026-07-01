import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CAUSES } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';
import SectionHeader from '@/components/ui/SectionHeader';

const BG_COLORS: Record<string, string> = {
  'child-rights':       'bg-teal-50',
  'women-empowerment':  'bg-pink-50',
  'old-age-support':    'bg-amber-50',
  'education':          'bg-blue-50',
  'healthcare':         'bg-green-50',
  'food-distribution':  'bg-yellow-50',
  'disaster-relief':    'bg-red-50',
  'animal-welfare':     'bg-purple-50',
};

const CauseCards: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Our Causes"
          title="Eight Pillars of Positive Change"
          description="Every cause we champion is backed by on-ground research, community trust, and measurable impact."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAUSES.map((cause, i) => {
            const pct = Math.round((cause.raised / cause.target) * 100);
            return (
              <motion.div
                key={cause.id}
                className="card overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <div className={`h-44 ${BG_COLORS[cause.id]} flex items-center justify-center text-5xl`}>
                  {cause.icon}
                </div>
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 text-base mb-2">{cause.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{cause.description}</p>

                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #0F766E, #F59E0B)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{cause.beneficiaries.toLocaleString('en-IN')} helped</span>
                    <strong className="text-teal-600">{formatCurrency(cause.raised)} raised</strong>
                  </div>

                  <Link
                    to="/donate"
                    className="mt-4 w-full text-center py-2 text-sm font-semibold text-teal-600 border border-teal-500 rounded-lg hover:bg-teal-50 transition-colors duration-200 block"
                  >
                    Support This Cause
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CauseCards;
