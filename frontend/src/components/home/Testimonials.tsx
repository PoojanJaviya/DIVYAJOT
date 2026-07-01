import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TESTIMONIALS } from '@/utils/constants';
import SectionHeader from '@/components/ui/SectionHeader';

const AVATAR_COLORS = ['bg-teal-500','bg-amber-400','bg-purple-500'];

const Testimonials: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Testimonials"
          title="Voices of Change"
          description="From beneficiaries to donors to volunteers — hear what the DIVYAJOT family has to say."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-gray-50 rounded-2xl p-7 border border-gray-100"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-teal-100 font-poppins font-black text-7xl leading-none mb-3">"</div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-5">{t.message}</p>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
