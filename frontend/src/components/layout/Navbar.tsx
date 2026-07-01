import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/utils/constants';

const Navbar: React.FC = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center text-white font-poppins font-bold text-base">
            SS
          </div>
          <div className="leading-tight">
            <div className="font-poppins font-bold text-gray-900 text-base">
              DIVYAJOT
            </div>
            <div className="text-teal-500 text-[10px] font-semibold uppercase tracking-widest">
              Empowering Change
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link to="/volunteer" className="btn-secondary text-sm py-2 px-4">
            Volunteer
          </Link>
          <Link to="/donate" className="btn-primary text-sm py-2 px-4">
            ❤️ Donate Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen border-t border-gray-200 bg-white' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <Link
              to="/volunteer"
              onClick={() => setMenuOpen(false)}
              className="btn-secondary flex-1 justify-center text-sm py-2"
            >
              Volunteer
            </Link>
            <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              className="btn-primary flex-1 justify-center text-sm py-2"
            >
              ❤️ Donate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
