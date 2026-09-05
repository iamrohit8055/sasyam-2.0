import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Phone, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('FARMER');
  const [identifier, setIdentifier] = useState('+91 98765 43210');
  const [password, setPassword] = useState('demo1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(identifier, role);
      setIsLoading(false);

      if (role === 'FARMER') navigate('/farmer/dashboard');
      else if (role === 'BUYER') navigate('/buyer/dashboard');
      else if (role === 'TRANSPORTER') navigate('/transporter/dashboard');
      else if (role === 'PROCESSOR') navigate('/processor/dashboard');
      else navigate('/admin/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F7F5ED] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#173B2A] flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-[#173B2A]">SASYAM</span>
          </Link>
          <h2 className="text-xl font-bold text-[#173B2A]">Login to your SASYAM Workspace</h2>
          <p className="text-xs text-gray-500">Access crop intelligence, market analysis & transportation</p>
        </div>

        <Card className="p-6 space-y-5 bg-white border border-[#173B2A]/10 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Select */}
            <div>
              <label className="block text-xs font-bold text-[#173B2A] uppercase mb-1.5">Select Role</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F5ED] rounded-xl text-xs font-medium">
                {(['FARMER', 'BUYER', 'TRANSPORTER', 'PROCESSOR', 'ADMIN'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-1.5 px-2 rounded-lg transition text-[11px] font-bold ${
                      role === r ? 'bg-[#173B2A] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile / Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number or Email</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In as {role}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#2F6B45] hover:underline">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
