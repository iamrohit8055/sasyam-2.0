import type { User, UserRole } from '../types';

const TOKEN_KEY = 'sasyam_auth_token';
const USER_KEY = 'sasyam_auth_user';

// Initial Mock Seed Users for instant demo testing across roles
const DEMO_USERS: Record<UserRole, User> = {
  FARMER: {
    id: 'usr_farmer_01',
    name: 'Rohit Kumar',
    phone: '+91 98765 43210',
    email: 'rohit.farmer@sasyam.in',
    role: 'FARMER',
    location: 'Jaunpur, Uttar Pradesh',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
    isVerified: true,
  },
  BUYER: {
    id: 'usr_buyer_01',
    name: 'Anish Foods Wholesalers',
    phone: '+91 98123 45678',
    email: 'buying@anishfoods.com',
    role: 'BUYER',
    location: 'Azadpur Mandi, Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isVerified: true,
  },
  TRANSPORTER: {
    id: 'usr_transporter_01',
    name: 'Raj Logistics & Logistics',
    phone: '+91 97654 32109',
    email: 'dispatch@rajlogistics.in',
    role: 'TRANSPORTER',
    location: 'Varanasi, Uttar Pradesh',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true,
  },
  PROCESSOR: {
    id: 'usr_processor_01',
    name: 'AgriPure Sauce & Purees',
    phone: '+91 95432 10987',
    email: 'procurement@agripure.in',
    role: 'PROCESSOR',
    location: 'Kanpur Industrial Area, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true,
  },
  ADMIN: {
    id: 'usr_admin_01',
    name: 'SASYAM Admin Command',
    phone: '+91 90000 00000',
    email: 'admin@sasyam.in',
    role: 'ADMIN',
    location: 'Headquarters, New Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    isVerified: true,
  },
};

export const authService = {
  getCurrentUser(): User | null {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return DEMO_USERS.FARMER; // Default fallback for seamless demo
    try {
      return JSON.parse(data);
    } catch {
      return DEMO_USERS.FARMER;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || 'mock_jwt_token_sasyam_active';
  },

  login(identifier: string, role: UserRole): { user: User; token: string } {
    const user: User = DEMO_USERS[role] || {
      id: `usr_${Date.now()}`,
      name: identifier.includes('@') ? identifier.split('@')[0] : 'User ' + identifier.slice(-4),
      phone: identifier,
      role,
      location: 'India',
      isVerified: true,
    };

    const token = `jwt_token_${role.toLowerCase()}_${Date.now()}`;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);

    return { user, token };
  },

  register(name: string, phone: string, role: UserRole, location: string): { user: User; token: string } {
    const user: User = {
      id: `usr_${Date.now()}`,
      name,
      phone,
      role,
      location,
      isVerified: false,
    };

    const token = `jwt_token_${role.toLowerCase()}_${Date.now()}`;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);

    return { user, token };
  },

  switchRole(role: UserRole): User {
    const user = DEMO_USERS[role];
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  },

  logout(): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
};
