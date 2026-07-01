import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { volunteerService, VolunteerPayload } from '@/services/volunteerService';

const INTERESTS = ['Education','Healthcare','Food Programs','Women Empowerment','Disaster Relief','Animal Welfare','IT / Tech Support','Fundraising'];

const VolunteerForm: React.FC = () => {
  const [loading, setLoading]     = useState(false);
  const [selected, setSelected]   = useState<string[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<VolunteerPayload>();

  const toggleInterest = (val: string) =>
    setSelected(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);

  const onSubmit = async (data: VolunteerPayload) => {
    if (selected.length === 0) { toast.error('Please select at least one area of interest'); return; }
    setLoading(true);
    try {
      await volunteerService.register({ ...data, interests: selected });
      toast.success(`🎉 Welcome ${data.fullName}! Your application is submitted. We'll reach out within 48 hours.`);
      reset();
      setSelected([]);
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h3 className="font-poppins font-bold text-gray-900 text-xl mb-1">Register as a Volunteer</h3>
      <p className="text-gray-500 text-sm mb-7">Our coordinator will reach out within 48 hours.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input {...register('fullName', { required: true })} className="input-field" placeholder="Your full name" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <label className="form-label">Email *</label>
            <input {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} className="input-field" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
          </div>
          <div>
            <label className="form-label">Phone *</label>
            <input {...register('phone', { required: true })} className="input-field" placeholder="+91 9876543210" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div>
            <label className="form-label">City *</label>
            <input {...register('city', { required: true })} className="input-field" placeholder="Your city" />
            {errors.city && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
        </div>

        <div>
          <label className="form-label">Professional Skills</label>
          <input {...register('skills')} className="input-field" placeholder="e.g. Teaching, Healthcare, IT, Accounting..." />
        </div>

        <div>
          <label className="form-label">Availability</label>
          <select {...register('availability')} className="input-field">
            <option value="">Select availability</option>
            <option>Weekends only</option>
            <option>Weekdays only</option>
            <option>Both weekdays & weekends</option>
            <option>Full-time (intern/gap year)</option>
          </select>
        </div>

        <div>
          <label className="form-label">Areas of Interest *</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {INTERESTS.map(item => (
              <label key={item} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => toggleInterest(item)}
                  className="accent-teal-500"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="form-label">Message (Optional)</label>
          <textarea {...register('bio')} className="input-field resize-none h-24" placeholder="Tell us about your motivation to volunteer..." />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </span>
          ) : 'Submit Registration →'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
