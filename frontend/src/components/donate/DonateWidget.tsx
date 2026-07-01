import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { donationService } from '@/services/donationService';
import { loadRazorpayScript, RAZORPAY_KEY } from '@/utils/helpers';

type Frequency = 'ONE_TIME' | 'MONTHLY';
type PayMethod = 'razorpay' | 'upi';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

interface FormData {
  name: string;
  email: string;
  phone?: string;
  cause?: string;
  message?: string;
}

const DonateWidget: React.FC = () => {
  const [amount, setAmount]       = useState(1000);
  const [custom, setCustom]       = useState('');
  const [freq, setFreq]           = useState<Frequency>('ONE_TIME');
  const [payMethod, setPayMethod] = useState<PayMethod>('razorpay');
  const [loading, setLoading]     = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const selectedAmount = custom ? parseInt(custom) || 0 : amount;

  const onSubmit = async (data: FormData) => {
    if (selectedAmount < 1) { toast.error('Please enter a valid amount'); return; }

    if (payMethod === 'upi') {
      toast.success('Use UPI ID: divyajotfoundation@upi or scan the QR code below');
      return;
    }

    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) { toast.error('Could not load payment gateway'); return; }

      const orderRes = await donationService.createOrder({
        amount: selectedAmount,
        frequency: freq,
        donorName: data.name,
        donorEmail: data.email,
        donorPhone: data.phone,
        cause: data.cause,
        message: data.message,
      });

      const { orderId, amount: orderAmount, currency } = orderRes.data;

      const options = {
        key: RAZORPAY_KEY,
        amount: orderAmount,
        currency,
        name: 'DIVYAJOT',
        description: `${freq === 'ONE_TIME' ? 'One-time' : 'Monthly'} Donation`,
        order_id: orderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await donationService.verifyPayment(response);
            toast.success(`🎉 Thank you ${data.name}! Your donation of ₹${selectedAmount.toLocaleString('en-IN')} is confirmed. Receipt sent to ${data.email}.`);
          } catch {
            toast.error('Payment verification failed. Please contact us.');
          }
        },
        prefill: { name: data.name, email: data.email, contact: data.phone || '' },
        theme: { color: '#0F766E' },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Could not initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto">
      <h2 className="font-poppins font-bold text-gray-900 text-2xl mb-2">Make a Difference Today</h2>
      <p className="text-gray-500 text-sm mb-6">Your donation is transparent and eligible for 80G tax deduction</p>

      {/* Frequency tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        {(['ONE_TIME','MONTHLY'] as Frequency[]).map(f => (
          <button
            key={f}
            onClick={() => setFreq(f)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              freq === f ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            {f === 'ONE_TIME' ? 'One-Time' : 'Monthly Recurring'}
          </button>
        ))}
      </div>

      {/* 80G badge */}
      <div className="flex items-center gap-3 bg-amber-50 text-amber-800 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
        <span className="text-xl">📄</span>
        80G Certified · Full tax receipt sent instantly via email
      </div>

      {/* Amount presets */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {PRESET_AMOUNTS.map(a => (
          <button
            key={a}
            onClick={() => { setAmount(a); setCustom(''); }}
            className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
              amount === a && !custom
                ? 'border-teal-500 bg-teal-50 text-teal-600'
                : 'border-gray-200 text-gray-700 hover:border-teal-400'
            }`}
          >
            ₹{a >= 1000 ? (a / 1000) + 'K' : a}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
        <input
          type="number"
          placeholder="Enter custom amount"
          value={custom}
          onChange={e => { setCustom(e.target.value); setAmount(0); }}
          className="input-field pl-8 text-lg font-bold"
        />
      </div>

      <div className="text-center mb-6 text-sm text-gray-500">
        Selected: <strong className="text-teal-600">₹{selectedAmount.toLocaleString('en-IN')}</strong>
        {' · '}
        <span>{freq === 'ONE_TIME' ? 'One-Time' : 'Monthly Recurring'}</span>
      </div>

      {/* Donor details form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input {...register('name', { required: true })} className="input-field" placeholder="Your name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
          </div>
          <div>
            <label className="form-label">Email *</label>
            <input {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} className="input-field" placeholder="your@email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Phone</label>
            <input {...register('phone')} className="input-field" placeholder="+91 9876543210" />
          </div>
          <div>
            <label className="form-label">Donate For</label>
            <select {...register('cause')} className="input-field">
              <option value="">Where needed most</option>
              <option>Child Rights</option>
              <option>Women Empowerment</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Food Distribution</option>
            </select>
          </div>
        </div>

        {/* Payment method */}
        <div className="grid grid-cols-2 gap-4">
          {(['razorpay','upi'] as PayMethod[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setPayMethod(m)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                payMethod === m ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-400'
              }`}
            >
              <div className="text-3xl mb-1">{m === 'razorpay' ? '💳' : '📱'}</div>
              <div className="text-sm font-semibold text-gray-900">{m === 'razorpay' ? 'Card / UPI / Net Banking' : 'Scan QR Code'}</div>
              <div className="text-xs text-gray-500">{m === 'razorpay' ? 'Razorpay Gateway' : 'Any UPI App'}</div>
            </button>
          ))}
        </div>

        {/* UPI QR */}
        {payMethod === 'upi' && (
          <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
            <div className="w-36 h-36 mx-auto bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center text-5xl mb-3">📱</div>
            <div className="text-sm font-semibold text-gray-700">UPI ID: divyajotfoundation@upi</div>
            <div className="text-xs text-gray-400 mt-1">PhonePe · GPay · Paytm · BHIM</div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || selectedAmount < 1}
          className="btn-primary w-full justify-center py-4 text-base"
        >
          {loading ? (
            <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing…</span>
          ) : (
            `❤️ Donate ₹${selectedAmount.toLocaleString('en-IN')} via ${payMethod === 'razorpay' ? 'Razorpay' : 'UPI'}`
          )}
        </button>

        <p className="text-center text-xs text-gray-400">🔒 Secured by Razorpay · SSL Encrypted · No card data stored</p>
      </form>
    </div>
  );
};

export default DonateWidget;
