import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/services/api';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('Subscribed! Impact updates coming your way 📬');
      setEmail('');
    } catch {
      toast.error('Could not subscribe. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center text-white font-poppins font-bold text-base">SS</div>
              <span className="font-poppins font-bold text-white text-base">DIVYAJOT</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Empowering Change, Transforming Lives. A registered NGO serving underprivileged communities across Gujarat since 2016.
            </p>
            <div className="flex gap-2">
              {['📘','📸','▶️','💼','💬'].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white/8 hover:bg-teal-500 text-base transition-colors duration-200">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-white text-xs uppercase tracking-widest mb-5">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[['Home','/'],['About Us','/about'],['Our Causes','/causes'],['Activities','/activities'],['Gallery','/gallery'],['Contact','/contact']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm hover:text-white transition-colors duration-200">{label}</Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-poppins font-bold text-white text-xs uppercase tracking-widest mb-5">Support Us</h4>
            <div className="flex flex-col gap-2.5">
              {[['Donate Online','/donate'],['Volunteer','/volunteer'],['Transparency','/transparency'],['Blog & News','/blog']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm hover:text-white transition-colors duration-200">{label}</Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-bold text-white text-xs uppercase tracking-widest mb-3">Newsletter</h4>
            <p className="text-sm mb-4">Get monthly impact updates.</p>
            <form onSubmit={handleNewsletter} className="flex overflow-hidden rounded-lg">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-700 text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                {loading ? '...' : 'Join'}
              </button>
            </form>
            <div className="mt-6 text-sm space-y-1">
              <p>📧 info@divyajotfoundation.org</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Ahmedabad, Gujarat</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© 2024 DIVYAJOT · 80G Certified · PAN: AABTS1234Z</p>
          <div className="flex gap-5">
            {['Privacy Policy','Terms of Use','Refund Policy'].map(label => (
              <a key={label} href="#" className="text-xs hover:text-white transition-colors duration-200">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
