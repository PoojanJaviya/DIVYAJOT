import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

interface LoginForm { email: string; password: string; }

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-poppins font-bold text-xl mx-auto mb-4">SS</div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">DIVYAJOT Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Email Address</label>
            <input
              {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
              type="email"
              className="input-field"
              placeholder="admin@divyajotfoundation.org"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="input-field"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password required</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading
              ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</span>
              : 'Sign In →'
            }
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
          <strong>Demo credentials:</strong><br />
          Email: admin@divyajotfoundation.org<br />
          Password: Admin@2024!
        </div>
      </div>
    </div>
  );
};

export default Login;
