export interface SasyamNotification {
  id: string;
  title: string;
  message: string;
  type: 'WEATHER_ALERT' | 'PRICE_SURGE' | 'DISEASE_WARNING' | 'SHIPMENT_UPDATE' | 'PAYMENT_ESCROW';
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

const INITIAL_NOTIFICATIONS: SasyamNotification[] = [
  {
    id: 'notif_01',
    title: 'Unseasonal Monsoon Rain Alert',
    message: 'Jaunpur district expecting 45mm rainfall in next 36 hours. Cover open tomato batches and secure field drainage.',
    type: 'WEATHER_ALERT',
    urgency: 'HIGH',
    timestamp: '10 mins ago',
    isRead: false,
    actionUrl: '/farmer/crops',
    actionText: 'View Crop Actions',
  },
  {
    id: 'notif_02',
    title: 'Tomato Mandi Price Surge (+14.2%)',
    message: 'Azadpur Mandi (Delhi) price surged to ₹27.50/kg due to Himachal Pradesh road blockade.',
    type: 'PRICE_SURGE',
    urgency: 'HIGH',
    timestamp: '45 mins ago',
    isRead: false,
    actionUrl: '/farmer/sell-decision',
    actionText: 'Evaluate Sell Now',
  },
  {
    id: 'notif_03',
    title: 'Cold-Chain Shipment In-Transit',
    message: 'Consignment LOG-2026-8821 crossed Agra Expressway Km 210. Refrigerator temp stable at 4.2°C.',
    type: 'SHIPMENT_UPDATE',
    urgency: 'MEDIUM',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/farmer/transport/shp_01',
    actionText: 'Track Live GPS',
  },
  {
    id: 'notif_04',
    title: 'SASYAM Escrow Deposit Confirmed',
    message: 'Payment of ₹39,750 locked in Escrow by BigBasket Varanasi for Tomato Batch #prod_01.',
    type: 'PAYMENT_ESCROW',
    urgency: 'LOW',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/farmer/produce',
    actionText: 'Inspect Produce Inventory',
  },
];

class NotificationService {
  private readonly KEY = 'sasyam_notifications';

  public getNotifications(): SasyamNotification[] {
    const saved = localStorage.getItem(this.KEY);
    if (!saved) {
      localStorage.setItem(this.KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(saved);
  }

  public markAsRead(id: string): SasyamNotification[] {
    const notifications = this.getNotifications();
    const item = notifications.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
      localStorage.setItem(this.KEY, JSON.stringify(notifications));
    }
    return notifications;
  }

  public markAllAsRead(): SasyamNotification[] {
    const notifications = this.getNotifications();
    notifications.forEach((n) => (n.isRead = true));
    localStorage.setItem(this.KEY, JSON.stringify(notifications));
    return notifications;
  }

  public clearAll(): SasyamNotification[] {
    localStorage.setItem(this.KEY, JSON.stringify([]));
    return [];
  }

  public getUnreadCount(): number {
    const notifications = this.getNotifications();
    return notifications.filter((n) => !n.isRead).length;
  }
}

export const notificationService = new NotificationService();
