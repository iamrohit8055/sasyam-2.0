import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Sprout, ChevronDown, Menu, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

export interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onToggleSidebar?: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onToggleSidebar,
  unreadNotificationsCount = 3,
}) => {
  const navigate = useNavigate();
  const { user, switchRole, logout } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const roles: { key: UserRole; label: string; desc: string }[] = [
    { key: 'FARMER', label: 'Farmer Dashboard', desc: 'Manage crops, harvests & sales' },
    { key: 'BUYER', label: 'Buyer Dashboard', desc: 'Discover produce & place orders' },
    { key: 'TRANSPORTER', label: 'Transporter Dashboard', desc: 'Manage vehicles & deliveries' },
    { key: 'PROCESSOR', label: 'Processor Dashboard', desc: 'Source crops for processing' },
    { key: 'ADMIN', label: 'Admin Command', desc: 'Platform monitoring & verification' },
  ];

  const handleRoleSelect = (roleKey: UserRole) => {
    switchRole(roleKey);
    onRoleChange(roleKey);
    setIsRoleDropdownOpen(false);

    if (roleKey === 'FARMER') navigate('/farmer/dashboard');
    else if (roleKey === 'BUYER') navigate('/buyer/dashboard');
    else if (roleKey === 'TRANSPORTER') navigate('/transporter/dashboard');
    else if (roleKey === 'PROCESSOR') navigate('/processor/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#173B2A]/10 px-4 md:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Sidebar Toggle + Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-[#173B2A] hover:bg-[#DCE9D8]/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#173B2A] flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#173B2A] font-sans">
                SASYAM
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-[#2F6B45] bg-[#DCE9D8] px-1.5 py-0.5 rounded">
                Agri Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex items-center max-w-md w-full relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search crops, mandis, buyers, transport requests..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F7F5ED] border border-[#173B2A]/10 focus:outline-none focus:ring-2 focus:ring-[#173B2A]/20 transition"
          />
        </div>

        {/* Right Side: Demo Role Switcher + Notifications + Profile */}
        <div className="flex items-center gap-2.5">
          {/* Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DCE9D8]/60 text-[#173B2A] hover:bg-[#DCE9D8] text-xs font-semibold border border-[#2F6B45]/20 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B45]" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-bold">{user?.role || currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#173B2A]/10 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Demo Role Switcher</p>
                </div>
                {roles.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => handleRoleSelect(r.key)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#F7F5ED] flex flex-col transition ${
                      (user?.role || currentRole) === r.key ? 'bg-[#DCE9D8]/40 font-bold text-[#173B2A]' : 'text-gray-700'
                    }`}
                  >
                    <span className="font-medium text-[#173B2A]">{r.label}</span>
                    <span className="text-[10px] text-gray-500">{r.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 rounded-xl text-[#173B2A] hover:bg-[#F7F5ED] border border-gray-200 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C94B45] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 pl-2 border-l border-gray-200 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#173B2A] text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.[0] || 'R'
                )}
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-semibold text-[#173B2A] leading-tight">{user?.name || 'Rohit Kumar'}</p>
                <p className="text-[10px] text-gray-500">{user?.location || 'Jaunpur, UP'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#173B2A]/10 py-2 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="font-bold text-xs text-[#173B2A]">{user?.name}</p>
                  <p className="text-[10px] text-gray-500">{user?.email || user?.phone}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
