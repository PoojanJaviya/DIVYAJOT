export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export const formatNumber = (num: number): string =>
  new Intl.NumberFormat('en-IN').format(num);

export const formatDate = (date: string | Date): string =>
  new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));

export const slugify = (text: string): string =>
  text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

export const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.slice(0, maxLength) + '…' : text;

export const generateReceiptNumber = (): string =>
  `SSF-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export const loadRazorpayScript = (): Promise<boolean> =>
  new Promise(resolve => {
    if (document.getElementById('razorpay-sdk')) return resolve(true);
    const script = document.createElement('script');
    script.id  = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
