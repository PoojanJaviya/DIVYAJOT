import React from 'react';
import { Link } from 'react-router-dom';

const CTABanner: React.FC = () => (
  <section className="py-20" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #f97316 100%)' }}>
    <div className="max-w-3xl mx-auto px-6 text-center">
      <h2 className="font-poppins font-extrabold text-white mb-5"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        Ready to Create Change?
      </h2>
      <p className="text-white/90 text-lg mb-10 leading-relaxed">
        Join thousands of donors, volunteers, and partners building a more equitable India —
        one community at a time.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/donate"
          className="bg-white text-teal-600 hover:bg-white/90 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          ❤️ Donate Today
        </Link>
        <Link
          to="/volunteer"
          className="bg-transparent border-2 border-white/70 text-white font-bold py-4 px-10 rounded-xl text-lg hover:bg-white/15 transition-all duration-200"
        >
          🤝 Volunteer with Us
        </Link>
      </div>
    </div>
  </section>
);

export default CTABanner;
