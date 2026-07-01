import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/contact/ContactForm';

const CONTACT_DETAILS = [
  { icon: '📍', title: 'Office Address', lines: ['123, Navrangpura, Near Swastik Cross Roads,', 'Ahmedabad – 380009, Gujarat, India'] },
  { icon: '📞', title: 'Phone',          lines: ['+91 98765 43210', 'Mon–Sat, 9AM–6PM IST'] },
  { icon: '📧', title: 'Email',          lines: ['info@divyajotfoundation.org', 'donations@divyajotfoundation.org'] },
];

const SOCIALS = [
  { icon: '📘', label: 'Facebook'  },
  { icon: '📸', label: 'Instagram' },
  { icon: '🐦', label: 'Twitter'   },
  { icon: '▶️', label: 'YouTube'   },
  { icon: '💼', label: 'LinkedIn'  },
];

const Contact: React.FC = () => (
  <>
    <Helmet>
      <title>Contact Us – DIVYAJOT</title>
      <meta name="description" content="Get in touch with DIVYAJOT. We respond within 24 hours." />
    </Helmet>

    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Get in Touch</h1>
        <p className="text-white/80 text-lg">We'd love to hear from you. Our team responds within 24 hours.</p>
      </div>
    </div>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <div>
            <span className="section-badge">Contact Info</span>
            <h2 className="section-title text-3xl mb-5">We're Here for You</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Whether you want to volunteer, donate, partner with us, or just learn more about our work —
              reach out and our team will get back to you promptly.
            </p>

            <div className="space-y-5 mb-8">
              {CONTACT_DETAILS.map(c => (
                <div key={c.title} className="flex gap-4">
                  <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{c.title}</h4>
                    {c.lines.map((l, i) => <p key={i} className="text-gray-500 text-sm">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl h-52 flex items-center justify-center text-5xl mb-6">
              🗺️
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <button
                  key={s.label}
                  title={s.label}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center text-lg transition-colors duration-200"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  </>
);

export default Contact;
