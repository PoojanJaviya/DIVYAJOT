import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-18"
    style={{ background: 'linear-gradient(135deg,#074743 0%,#0F766E 45%,#1a8a82 75%,#074743 100%)' }}
  >
    {/* Background decorations */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10" />
      <div className="absolute top-1/2 right-[-60px] -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/6" />
      <div className="absolute top-1/3 left-[10%] w-64 h-64 rounded-full bg-amber-400/5 blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse-slow" />
          Registered NGO · Serving Since 2016
        </div>

        <h1 className="font-poppins font-extrabold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
        >
          Empowering Change,{' '}
          <span className="text-amber-400">Transforming Lives</span>{' '}
          Across India
        </h1>

        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
          DIVYAJOT works tirelessly to uplift underprivileged communities through
          education, healthcare, nutrition, and livelihood programs that create lasting change.
        </p>

        <div className="flex gap-4 flex-wrap mb-14">
          <Link to="/donate" className="btn-amber btn-xl px-8 py-4 text-base">
            ❤️ Donate Now
          </Link>
          <Link to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white border-2 border-white/30 hover:bg-white/15 transition-all duration-200"
          >
            Learn Our Story
          </Link>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { num: '50K+', label: 'Lives Impacted' },
            { num: '120+', label: 'Villages Reached' },
            { num: '800+', label: 'Volunteers' },
            { num: '8',    label: 'Cause Areas' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl p-4">
              <div className="font-poppins font-bold text-white text-2xl">{s.num}</div>
              <div className="text-white/70 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — Info cards */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Active causes card */}
        <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
          <div className="font-poppins font-bold text-gray-900 text-base mb-4">Our Active Causes</div>
          <div className="space-y-3">
            {[
              { icon: '👶', label: 'Child Rights',        pct: 85, color: 'bg-teal-500' },
              { icon: '👩', label: 'Women Empowerment',   pct: 72, color: 'bg-amber-400' },
              { icon: '📚', label: 'Education Support',   pct: 90, color: 'bg-teal-500' },
              { icon: '🏥', label: 'Healthcare',          pct: 65, color: 'bg-red-400' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-sm flex-shrink-0">{c.icon}</div>
                <span className="text-sm text-gray-600 flex-1">{c.label}</span>
                <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                </div>
                <span className="text-xs font-semibold text-teal-600 w-8">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">🍱</div>
            <div className="text-white">
              <div className="font-poppins font-bold text-xl">2,400</div>
              <div className="text-xs text-white/70">Meals served this month</div>
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
            <div className="text-white">
              <div className="font-poppins font-bold text-xl">380</div>
              <div className="text-xs text-white/70">Students on scholarships</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
