import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Phone, Lock, User as UserIcon, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>('FARMER');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      register(name, phone, role, location);
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
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#173B2A] flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-[#173B2A]">SASYAM</span>
          </Link>
          <h2 className="text-xl font-bold text-[#173B2A]">Create SASYAM Account</h2>
          <p className="text-xs text-gray-500">Join the digital agriculture supply chain network</p>
        </div>

        <Card className="p-6 space-y-5 bg-white border border-[#173B2A]/10 shadow-lg">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#173B2A] uppercase mb-1.5">Register As</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {(['FARMER', 'BUYER', 'TRANSPORTER', 'PROCESSOR'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 rounded-xl border transition text-center ${
                      role === r
                        ? 'bg-[#173B2A] text-white border-[#173B2A]'
                        : 'bg-[#F7F5ED] text-gray-700 border-gray-200 hover:bg-[#DCE9D8]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Rohit Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location / District</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Jaunpur, Uttar Pradesh"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
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
              Complete Registration
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#2F6B45] hover:underline">
              Log in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
