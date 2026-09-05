import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  ShieldCheck,
  Truck,
  Navigation,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { buyerService } from '../../services/buyerService';
import type { BuyerProcurementOrder } from '../../services/buyerService';

export const BuyerOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<BuyerProcurementOrder[]>([]);

  useEffect(() => {
    setOrders(buyerService.getProcurementOrders());
  }, []);

  const totalValue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Buyer Purchase & Procurement Orders</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SASYAM Escrow Protected
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Track confirmed wholesale purchase orders, monitor cold-chain delivery progress, and view escrow release receipts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => navigate('/marketplace')}>
            <Boxes className="w-4 h-4 mr-1.5" />
            Browse Produce Exchange
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders Placed"
          value={`${orders.length} Orders`}
          subtitle="Direct Farm Procurement"
          icon={<Boxes className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Total Procurement Value"
          value={`₹${totalValue.toLocaleString('en-IN')}`}
          subtitle="SASYAM Escrow Secured"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Active Deliveries"
          value={`${orders.filter((o) => o.status !== 'COMPLETED').length} In-Transit`}
          subtitle="Live Cold-Chain Tracking"
          icon={<Truck className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((ord) => (
          <Card key={ord.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ord.id}
                  </span>
                  <Badge variant={ord.status === 'IN_TRANSIT' ? 'success' : 'neutral'}>
                    {ord.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant="neutral" className="text-xs">
                    {ord.qualityGrade}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-[#173B2A]">
                  {ord.cropName} ({ord.variety}) — {ord.quantityKg.toLocaleString('en-IN')} kg
                </h3>

                <p className="text-xs text-gray-600">
                  Farmer: <span className="font-bold text-gray-900">{ord.farmerName}</span> ({ord.farmerLocation})
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                  <span>Order Date: {ord.orderDate}</span>
                  <span>Tracking Ref: {ord.trackingNumber}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="text-xs text-gray-500 block">Total Order Payout</span>
                  <span className="text-2xl font-extrabold text-[#173B2A]">
                    ₹{ord.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/farmer/transport/${ord.shipmentId}`)}
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  Track Live GPS Cargo
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
