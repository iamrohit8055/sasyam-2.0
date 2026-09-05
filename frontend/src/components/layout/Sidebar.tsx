import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Sprout,
  Sparkles,
  Scan,
  Wheat,
  Boxes,
  TrendingUp,
  Scale,
  Store,
  Factory,
  Truck,
  Bell,
  Shield,
  HelpCircle,
} from 'lucide-react';
import type { UserRole } from '../../types';
import { cn } from '../../utils/cn';

export interface SidebarProps {
  currentRole: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRole, isOpen = true, onClose }) => {
  const farmerNav: NavItem[] = [
    { label: 'Overview', to: '/farmer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Farms', to: '/farmer/farms', icon: <MapPin className="w-4 h-4" /> },
    { label: 'Crop Advisory', to: '/farmer/crops', icon: <Sprout className="w-4 h-4" /> },
    { label: 'AI Crop Recommendation', to: '/farmer/recommendations', icon: <Sparkles className="w-4 h-4 text-emerald-600" />, badge: 'AI' },
    { label: 'Disease Scanner', to: '/farmer/disease-detection', icon: <Scan className="w-4 h-4" /> },
    { label: 'Harvest Records', to: '/farmer/harvests', icon: <Wheat className="w-4 h-4" /> },
    { label: 'Produce Inventory', to: '/farmer/produce', icon: <Boxes className="w-4 h-4" /> },
    { label: 'Market Intelligence', to: '/farmer/markets', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Sell vs Store Engine', to: '/farmer/sell-decision', icon: <Scale className="w-4 h-4 text-amber-600" />, badge: 'Flagship' },
    { label: 'Processing Allocation', to: '/farmer/processing', icon: <Factory className="w-4 h-4" /> },
    { label: 'Produce Marketplace', to: '/marketplace', icon: <Store className="w-4 h-4" /> },
    { label: 'Transport & Tracking', to: '/farmer/transport', icon: <Truck className="w-4 h-4" /> },
    { label: 'Notifications', to: '/notifications', icon: <Bell className="w-4 h-4" /> },
  ];

  const buyerNav: NavItem[] = [
    { label: 'Buyer Dashboard', to: '/buyer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Browse Produce Exchange', to: '/buyer/marketplace', icon: <Store className="w-4 h-4" /> },
    { label: 'Purchase Orders', to: '/buyer/orders', icon: <Boxes className="w-4 h-4" /> },
    { label: 'Track Shipments', to: '/farmer/transport', icon: <Truck className="w-4 h-4" /> },
  ];

  const transporterNav: NavItem[] = [
    { label: 'Transporter Dashboard', to: '/transporter/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Available Jobs', to: '/transporter/jobs', icon: <Truck className="w-4 h-4" /> },
    { label: 'Fleet & Vehicles', to: '/transporter/vehicle', icon: <Boxes className="w-4 h-4" /> },
  ];

  const processorNav: NavItem[] = [
    { label: 'Processor Dashboard', to: '/processor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Crop Requirements', to: '/processor/requirements', icon: <Factory className="w-4 h-4" /> },
    { label: 'Processing Orders', to: '/processor/orders', icon: <Boxes className="w-4 h-4" /> },
  ];

  const adminNav: NavItem[] = [
    { label: 'Admin Command', to: '/admin/dashboard', icon: <Shield className="w-4 h-4" /> },
    { label: 'Platform Analytics', to: '/farmer/markets', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const navMap: Record<UserRole, NavItem[]> = {
    FARMER: farmerNav,
    BUYER: buyerNav,
    TRANSPORTER: transporterNav,
    PROCESSOR: processorNav,
    ADMIN: adminNav,
  };

  const navItems = navMap[currentRole] || farmerNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#173B2A]/10 flex flex-col justify-between transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-[10px] uppercase font-extrabold tracking-widest text-[#2F6B45]/80 mb-2">
              {currentRole} WORKSPACE
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-[#173B2A] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:bg-[#DCE9D8]/50 hover:text-[#173B2A]'
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-100 bg-[#F7F5ED]/50 space-y-1">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 rounded-xl hover:bg-white transition"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>SASYAM Portal</span>
          </NavLink>
          <div className="px-3 py-2 text-[10px] text-gray-400">
            SASYAM v1.0 • Field to Market
          </div>
        </div>
      </aside>
    </>
  );
};
