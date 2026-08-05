import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple auth: admin@navian.com / admin123
    if (email === 'admin@navian.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-mid-purple flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-dark-purple mb-2">
              NAVIAN Admin
            </h1>
            <p className="text-soft-ink/60">Manage your products and store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark-purple mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-mid-purple" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@navian.com"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-dark-purple/20 rounded-xl focus:outline-none focus:border-dark-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-purple mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-mid-purple" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-dark-purple/20 rounded-xl focus:outline-none focus:border-dark-purple"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-dark-purple to-mid-purple text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
