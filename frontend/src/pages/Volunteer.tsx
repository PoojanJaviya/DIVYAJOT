import React from 'react';
import { Helmet } from 'react-helmet-async';
import VolunteerForm from '@/components/volunteer/VolunteerForm';
import CTABanner from '@/components/home/CTABanner';

const BENEFITS = [
  { icon: '🏆', title: 'Certificate of Appreciation', desc: 'Official certification — valuable for students and professionals alike.' },
  { icon: '🌐', title: 'Nationwide Network',          desc: 'Connect with 800+ volunteers, NGO leaders, and social changemakers.' },
  { icon: '📈', title: 'Skill Development',           desc: 'Leadership, project management, and community outreach training.' },
  { icon: '❤️', title: 'Real Impact',                 desc: 'See the direct change your efforts create — from meals to school enrollments.' },
];

const Volunteer: React.FC = () => (
  <>
    <Helmet>
      <title>Volunteer – DIVYAJOT</title>
      <meta name="description" content="Join DIVYAJOT as a volunteer. Register online and our coordinator will reach out within 48 hours." />
    </Helmet>

    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Become a Volunteer</h1>
        <p className="text-white/80 text-lg">Every hour you give changes a life. Join our family of 800+ changemakers.</p>
      </div>
    </div>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info side */}
          <div>
            <span className="section-badge">Join the Movement</span>
            <h2 className="section-title text-3xl md:text-4xl mb-5">Why Volunteer With Us?</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Whether you're a student, professional, or retiree — there's a meaningful role for you
              in our growing family of change-makers. Every skill counts, every hour matters.
            </p>

            <div className="space-y-5 mb-8">
              {BENEFITS.map(b => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{b.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{b.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <blockquote className="text-gray-700 text-sm leading-relaxed italic mb-3">
                "Volunteering with DIVYAJOT transformed my outlook on life. The smiles on
                the faces of the children we helped are something I'll carry forever."
              </blockquote>
              <cite className="text-teal-600 text-sm font-semibold not-italic">
                — Meera Joshi, Volunteer since 2021, Ahmedabad
              </cite>
            </div>
          </div>

          {/* Form side */}
          <VolunteerForm />
        </div>
      </div>
    </section>

    <CTABanner />
  </>
);

export default Volunteer;
