import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MV_CARDS = [
  { icon: '🎯', color: 'border-teal-500',  title: 'Our Mission',  body: 'To empower marginalized communities through sustainable programs in education, healthcare, nutrition, and livelihood — enabling every individual to live with dignity, equality, and hope.' },
  { icon: '🌟', color: 'border-amber-400', title: 'Our Vision',   body: 'An India where no child goes to bed hungry, no woman faces inequality, no elderly person is abandoned, and every citizen has access to quality education and healthcare.' },
  { icon: '📋', color: 'border-red-400',   title: 'Registration', body: 'Registered under Societies Registration Act 1860. 80G & 12AA certified. All donations eligible for tax deduction under Section 80G of the Income Tax Act.' },
];

const Mission: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Our Story</span>
            <h2 className="section-title text-3xl md:text-4xl mb-6">
              Born from Compassion,<br />Built on Service
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-5">
              DIVYAJOT was established in 2016 by a group of passionate social workers
              who witnessed the widening gap between opportunity and need in rural Gujarat. What
              began as weekly food distributions has grown into a comprehensive community development
              organization serving 50,000+ beneficiaries.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our founder, guided by the belief that every life deserves dignity, assembled a team of
              educators, healthcare workers, and community leaders to address root causes of poverty —
              not just symptoms.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Transparency','Community First','Inclusion','Sustainability','Accountability'].map(v => (
                <span key={v}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border-2 border-teal-500 text-teal-600 bg-teal-50"
                >
                  {v}
                </span>
              ))}
            </div>

            <Link to="/causes" className="btn-primary">Explore Our Work →</Link>
          </motion.div>

          {/* Right — MV cards */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {MV_CARDS.map(c => (
              <div
                key={c.title}
                className={`bg-white rounded-2xl p-7 border-l-4 ${c.color} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-poppins font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
