import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, settings, isAdminAuthenticated } = useStore();
  const [email, setEmail] = useState('admin@yourbrand.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // If already logged in, go directly to admin dashboard
  if (isAdminAuthenticated) {
    navigate('/admin');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = adminLogin(password);
    if (success) {
      navigate('/admin');
    } else {
      setErrorMsg('Invalid password. Default demo passcode is "admin123".');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto border border-white/20 shadow-md">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight uppercase">
          {settings.brandName || 'SD TRENDYZ'}
        </h2>
        <p className="text-xs text-slate-400">
          Catalog Management & Enquiry Dashboard Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourbrand.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Default demo password is: <code className="text-amber-400 font-mono">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md mt-2"
            >
              <span>Authenticate & Enter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              ← Return to Public Catalog Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
