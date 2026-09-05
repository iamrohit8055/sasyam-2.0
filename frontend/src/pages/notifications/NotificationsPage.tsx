import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CloudRain,
  TrendingUp,
  Truck,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  CheckCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { notificationService } from '../../services/notificationService';
import type { SasyamNotification } from '../../services/notificationService';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<SasyamNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UNREAD' | 'WEATHER' | 'PRICE' | 'LOGISTICS'>('ALL');

  useEffect(() => {
    setNotifications(notificationService.getNotifications());
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notificationService.markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notificationService.markAllAsRead());
  };

  const handleClearAll = () => {
    setNotifications(notificationService.clearAll());
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const weatherCount = notifications.filter((n) => n.type === 'WEATHER_ALERT').length;
  const priceCount = notifications.filter((n) => n.type === 'PRICE_SURGE').length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'UNREAD') return !n.isRead;
    if (activeFilter === 'WEATHER') return n.type === 'WEATHER_ALERT';
    if (activeFilter === 'PRICE') return n.type === 'PRICE_SURGE';
    if (activeFilter === 'LOGISTICS') return n.type === 'SHIPMENT_UPDATE' || n.type === 'PAYMENT_ESCROW';
    return true;
  });

  const getNotificationIcon = (type: SasyamNotification['type']) => {
    switch (type) {
      case 'WEATHER_ALERT':
        return <CloudRain className="w-5 h-5 text-amber-600" />;
      case 'PRICE_SURGE':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'DISEASE_WARNING':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'SHIPMENT_UPDATE':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'PAYMENT_ESCROW':
        return <ShieldCheck className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">SASYAM Alert & Notification Center</h1>
            {unreadCount > 0 && (
              <Badge variant="danger" className="flex items-center gap-1">
                {unreadCount} NEW UNREAD ALERTS
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Real-time weather warnings, mandi price surges, cold-chain GPS updates, and escrow payment notifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-1 text-emerald-600" />
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            <Trash2 className="w-4 h-4 mr-1 text-rose-600" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Stat Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Notifications"
          value={`${notifications.length} Alerts`}
          subtitle={`${unreadCount} Unread Action Items`}
          icon={<Bell className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Weather Warnings"
          value={`${weatherCount} Active`}
          subtitle="Jaunpur District Forecast"
          icon={<CloudRain className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title="Price Surge Spikes"
          value={`${priceCount} Spikes`}
          subtitle="Azadpur & Regional Mandis"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Logistics & Escrow"
          value="Live Synced"
          subtitle="Real-time WebSockets Feed"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 flex flex-wrap gap-2 sm:gap-4">
        {[
          { id: 'ALL', label: `All Alerts (${notifications.length})` },
          { id: 'UNREAD', label: `Unread (${unreadCount})` },
          { id: 'WEATHER', label: `Weather Alerts (${weatherCount})` },
          { id: 'PRICE', label: `Price Surges (${priceCount})` },
          { id: 'LOGISTICS', label: `Logistics & Escrow` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeFilter === tab.id
                ? 'border-[#2F6B45] text-[#2F6B45]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center bg-white border border-gray-200">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">No Notifications in this Category</h3>
            <p className="text-sm text-gray-500 mt-1">All catch-up alerts have been cleared.</p>
          </Card>
        ) : (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`p-4 transition-all ${
                !notif.isRead
                  ? 'bg-white border-l-4 border-l-[#2F6B45] border-gray-200 shadow-sm'
                  : 'bg-gray-50/70 border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl flex-shrink-0 ${
                      notif.type === 'WEATHER_ALERT'
                        ? 'bg-amber-100'
                        : notif.type === 'PRICE_SURGE'
                        ? 'bg-emerald-100'
                        : notif.type === 'DISEASE_WARNING'
                        ? 'bg-rose-100'
                        : notif.type === 'SHIPMENT_UPDATE'
                        ? 'bg-blue-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#173B2A]">{notif.title}</h4>
                      <Badge
                        variant={
                          notif.urgency === 'HIGH'
                            ? 'danger'
                            : notif.urgency === 'MEDIUM'
                            ? 'warning'
                            : 'neutral'
                        }
                        className="text-[10px]"
                      >
                        {notif.urgency} URGENCY
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{notif.message}</p>
                    <span className="text-xs text-gray-400 block pt-1">{notif.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                  {notif.actionUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        handleMarkAsRead(notif.id);
                        navigate(notif.actionUrl!);
                      }}
                    >
                      {notif.actionText || 'View Details'}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}

                  {!notif.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
