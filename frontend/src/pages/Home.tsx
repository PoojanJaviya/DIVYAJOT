import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import Mission from '@/components/home/Mission';
import CauseCards from '@/components/home/CauseCards';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import BackToTop from '@/components/ui/BackToTop';
import { ACTIVITIES } from '@/utils/constants';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';

const Home: React.FC = () => (
  <>
    <Helmet>
      <title>DIVYAJOT – Empowering Change, Transforming Lives</title>
      <meta name="description" content="A registered NGO dedicated to child rights, women empowerment, education, healthcare, and community development across Gujarat, India." />
    </Helmet>

    <Hero />
    <StatsBar />
    <Mission />
    <CauseCards />

    {/* Activities preview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
          <SectionHeader badge="Activities" title="What We Do on the Ground" />
          <Link to="/activities" className="btn-secondary text-sm py-2 px-4">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.slice(0, 3).map(a => (
            <div key={a.id} className="card overflow-hidden">
              <div className="h-44 bg-teal-50 flex items-center justify-center text-5xl">{a.icon}</div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase tracking-wide mb-2">{a.tag}</span>
                <h3 className="font-poppins font-bold text-gray-900 text-base mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{a.description}</p>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>📅 {a.date}</span>
                  <span>👥 {a.beneficiaries}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Testimonials />
    <CTABanner />
    <BackToTop />
  </>
);

export default Home;
