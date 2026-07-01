import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { contactService, ContactPayload } from '@/services/contactService';

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactPayload>();

  const onSubmit = async (data: ContactPayload) => {
    setLoading(true);
    try {
      await contactService.send(data);
      toast.success(`Message sent! We'll reply to ${data.email} within 24 hours.`);
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
      <h3 className="font-poppins font-bold text-gray-900 text-xl mb-6">Send a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input {...register('name', { required: true })} className="input-field" placeholder="Your name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} className="input-field" placeholder="your@email.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input {...register('phone')} className="input-field" placeholder="+91 9876543210" />
        </div>
        <div>
          <label className="form-label">Subject</label>
          <select {...register('subject')} className="input-field">
            <option value="">Select a topic</option>
            <option>Donation Inquiry</option>
            <option>Volunteer Registration</option>
            <option>Partnership / CSR</option>
            <option>Media / Press</option>
            <option>General Query</option>
          </select>
        </div>
        <div>
          <label className="form-label">Message *</label>
          <textarea
            {...register('message', { required: true })}
            className="input-field resize-none h-32"
            placeholder="Tell us how we can help..."
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">Required</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending…
            </span>
          ) : 'Send Message →'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
