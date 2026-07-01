import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TEAM } from '@/utils/constants';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const TIMELINE = [
  { year: '2016', title: 'Foundation Established', desc: 'Registered under Societies Act with a small team of 10 volunteers.' },
  { year: '2017', title: 'Bhojan Seva Launched',   desc: 'Daily community kitchen started — 50 meals per day from day one.' },
  { year: '2018', title: '80G & 12AA Certified',   desc: 'Received income tax certifications enabling tax-deductible donations.' },
  { year: '2019', title: 'Expanded to 5 Districts',desc: 'Programs scaled to Ahmedabad, Gandhinagar, Rajkot, Surat, and Vadodara.' },
  { year: '2020', title: 'COVID-19 Relief',        desc: 'Distributed 1.2 lakh meals and 8,000 ration kits during lockdown.' },
  { year: '2021', title: '500 Volunteers Milestone',desc: 'Volunteer network crossed 500, covering 80+ villages.' },
  { year: '2022', title: 'Digital Transformation', desc: 'Launched online donation portal and volunteer management system.' },
  { year: '2024', title: '50,000 Beneficiaries',   desc: 'Crossed 50,000 cumulative beneficiaries served across all programs.' },
];

const About: React.FC = () => (
  <>
    <Helmet>
      <title>About Us – DIVYAJOT</title>
      <meta name="description" content="Learn about DIVYAJOT's story, mission, vision, leadership team, and our journey since 2016." />
    </Helmet>

    {/* Hero */}
    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Our Story</h1>
        <p className="text-white/80 text-lg leading-relaxed">
          Born from compassion, built on service — a decade of transforming communities across Gujarat.
        </p>
      </div>
    </div>

    {/* Story */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeader badge="Foundation Story" title="How It All Began" />
          <p className="text-gray-500 leading-relaxed mb-5">
            In 2016,  a social worker from Ahmedabad — gathered eight like-minded friends
            around a dining table. Each had witnessed the crushing weight of poverty on families just
            a few kilometers from their own comfortable homes. That evening, DIVYAJOT was born.
          </p>
          <p className="text-gray-500 leading-relaxed mb-5">
            The name "Saya" means "shadow" in Sanskrit — a protective shade that shelters those in need.
            It was chosen deliberately: not a spotlight, but a quiet presence that makes life possible.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Today, eight years later, DIVYAJOT employs 24 full-time staff, commands a
            volunteer army of 800+, and has directly served over 50,000 beneficiaries across
            12 districts of Gujarat.
          </p>
        </div>
        <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
          <div className="grid grid-cols-2 gap-6">
            {[
              { num: '2016', label: 'Year Founded'          },
              { num: '24',   label: 'Full-time Staff'       },
              { num: '12',   label: 'Districts Covered'     },
              { num: '94%',  label: 'Funds to Programs'     },
            ].map(s => (
              <div key={s.label} className="text-center p-4">
                <div className="font-poppins font-extrabold text-4xl text-teal-600 mb-1">{s.num}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader badge="Journey" title="Our Growth Timeline" center />
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block" />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                className={`flex gap-6 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="flex-1 md:text-right">
                  {i % 2 === 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                      <div className="font-poppins font-bold text-teal-600 mb-1">{t.year}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
                      <p className="text-gray-500 text-sm">{t.desc}</p>
                    </div>
                  )}
                </div>
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 z-10 mt-3">
                  {t.year.slice(2)}
                </div>
                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                      <div className="font-poppins font-bold text-teal-600 mb-1">{t.year}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
                      <p className="text-gray-500 text-sm">{t.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="Leadership" title="The People Behind the Mission" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map(m => (
            <div key={m.name} className="text-center">
              <div className={`w-24 h-24 ${m.color} rounded-full flex items-center justify-center text-white font-poppins font-bold text-2xl mx-auto mb-4`}>
                {m.initials}
              </div>
              <div className="font-poppins font-bold text-gray-900 text-base mb-1">{m.name}</div>
              <div className="text-teal-600 text-sm font-semibold mb-2">{m.role}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABanner />
  </>
);

export default About;
