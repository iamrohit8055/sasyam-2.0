import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sprout, Store, Truck, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

export const MobileNav: React.FC = () => {
  const items = [
    { label: 'Home', to: '/farmer/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Crops', to: '/farmer/crops', icon: <Sprout className="w-5 h-5" /> },
    { label: 'Market', to: '/farmer/markets', icon: <Store className="w-5 h-5" /> },
    { label: 'Transport', to: '/farmer/transport', icon: <Truck className="w-5 h-5" /> },
    { label: 'Alerts', to: '/notifications', icon: <Bell className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#173B2A]/10 px-2 py-1.5 shadow-lg">
      <nav className="flex items-center justify-around">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[10px] font-medium transition',
                isActive
                  ? 'text-[#173B2A] font-bold bg-[#DCE9D8]/60'
                  : 'text-gray-500 hover:text-gray-900'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
