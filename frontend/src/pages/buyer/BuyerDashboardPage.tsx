import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Plus,
  Navigation,
  FileText,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { buyerService } from '../../services/buyerService';
import type { BuyerProcurementOrder, BuyerRFQ } from '../../services/buyerService';

export const BuyerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<BuyerProcurementOrder[]>([]);
  const [rfqs, setRfqs] = useState<BuyerRFQ[]>([]);
  const [summary, setSummary] = useState({
    escrowBalance: 245000,
    activeOrdersCount: 1,
    totalVolumeKg: 4000,
    totalSpent: 94750,
    verifiedFarmersCount: 18,
  });

  // RFQ Modal State
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqCrop, setRfqCrop] = useState('Tomato');
  const [rfqGrade, setRfqGrade] = useState('Grade A');
  const [rfqQuintals, setRfqQuintals] = useState<number>(50);
  const [rfqOfferedPrice, setRfqOfferedPrice] = useState<number>(27.0);
  const [rfqLocation, setRfqLocation] = useState('Varanasi Central Mandi Hub');

  useEffect(() => {
    setOrders(buyerService.getProcurementOrders());
    setRfqs(buyerService.getRFQs());
    setSummary(buyerService.getSummary());
  }, []);

  const handleCreateRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    buyerService.createRFQ({
      cropName: rfqCrop,
      requiredGrade: rfqGrade,
      quantityQuintals: rfqQuintals,
      offeredPricePerKg: rfqOfferedPrice,
      deliveryLocation: rfqLocation,
      expiryDate: expiry.toISOString().split('T')[0],
    });

    setRfqs(buyerService.getRFQs());
    setIsRfqModalOpen(false);
    alert(`Bulk procurement RFQ for ${rfqQuintals} Qtl of ${rfqCrop} broadcast to regional farmers!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Wholesale Procurement & Buyer Portal</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SASYAM Escrow Protected
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Source fresh produce directly from verified farmers in UP with zero middleman commissions and live cold-chain tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/marketplace')}>
            <ShoppingBag className="w-4 h-4 mr-1.5 text-emerald-600" />
            Browse Produce Exchange
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsRfqModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Broadcast Bulk RFQ
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Escrow Protected Balance"
          value={`₹${summary.escrowBalance.toLocaleString('en-IN')}`}
          subtitle="Instant T+0 Release on Gate Pass"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Active Procurement Orders"
          value={`${summary.activeOrdersCount} In-Transit`}
          subtitle="Live Cold-Chain GPS Tracking"
          icon={<Truck className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Total Volume Procured"
          value={`${summary.totalVolumeKg.toLocaleString('en-IN')} kg`}
          subtitle={`Total Value: ₹${summary.totalSpent.toLocaleString('en-IN')}`}
          icon={<ShoppingBag className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Verified Farmer Network"
          value={`${summary.verifiedFarmersCount} Farmers`}
          subtitle="Direct Sourcing Network"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* SECTION 1: ACTIVE ORDERS */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2F6B45]" />
            <h3 className="text-lg font-bold text-[#173B2A]">Active Procurement Orders</h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/marketplace')}>
            Find More Produce
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F5ED] text-xs uppercase font-bold text-[#173B2A]">
              <tr>
                <th className="p-3 rounded-l-lg">Order ID & Crop</th>
                <th className="p-3">Farmer & Location</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total Value</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-[#173B2A] block">{ord.cropName}</span>
                    <span className="text-xs text-gray-400 font-mono">{ord.id}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-gray-900 block">{ord.farmerName}</span>
                    <span className="text-xs text-gray-500">{ord.farmerLocation}</span>
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    {ord.quantityKg.toLocaleString('en-IN')} kg
                  </td>
                  <td className="p-3 font-bold text-[#173B2A]">
                    ₹{ord.totalPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <Badge variant={ord.status === 'IN_TRANSIT' ? 'success' : 'neutral'}>
                      {ord.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/farmer/transport/${ord.shipmentId}`)}
                    >
                      <Navigation className="w-3.5 h-3.5 mr-1" />
                      Track Live GPS
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SECTION 2: RFQ REQUESTS */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-700" />
            <h3 className="text-lg font-bold text-[#173B2A]">Broadcast Request for Quotation (RFQs)</h3>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsRfqModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Post New Bulk RFQ
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-[#173B2A]">
                    {rfq.cropName} ({rfq.requiredGrade})
                  </span>
                  <Badge variant="warning">{rfq.bidsCount} Bids Received</Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div className="flex justify-between">
                    <span>Required Quantity:</span>
                    <span className="font-bold text-gray-900">{rfq.quantityQuintals} Quintals ({rfq.quantityQuintals * 100} kg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offered Max Rate:</span>
                    <span className="font-bold text-emerald-700">₹{rfq.offeredPricePerKg.toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Delivery Location:</span>
                    <span className="font-medium text-gray-800">{rfq.deliveryLocation}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Expires: {rfq.expiryDate}
                </span>
                <span className="text-emerald-700 font-semibold cursor-pointer hover:underline" onClick={() => alert(`Reviewing ${rfq.bidsCount} farmer bids for ${rfq.cropName}...`)}>
                  Review Bids & Confirm
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Broadcast RFQ Modal */}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Broadcast Bulk RFQ to Farmers</h3>
                <p className="text-xs text-gray-500">Get direct competitive quotes from regional crop clusters</p>
              </div>
              <button
                onClick={() => setIsRfqModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRFQ} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Crop Name</label>
                  <select
                    value={rfqCrop}
                    onChange={(e) => setRfqCrop(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Onion">Onion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Required Quality Grade</label>
                  <select
                    value={rfqGrade}
                    onChange={(e) => setRfqGrade(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Volume (Quintals)</label>
                  <input
                    type="number"
                    min={10}
                    value={rfqQuintals}
                    onChange={(e) => setRfqQuintals(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">= {rfqQuintals * 100} kg</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Target Offered Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.50"
                    value={rfqOfferedPrice}
                    onChange={(e) => setRfqOfferedPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Destination Hub</label>
                <input
                  type="text"
                  value={rfqLocation}
                  onChange={(e) => setRfqLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Contracted Budget:</span>
                  <span className="font-extrabold text-[#173B2A] text-sm">
                    ₹{(rfqQuintals * 100 * rfqOfferedPrice).toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 block">Funds automatically reserved in SASYAM Escrow upon bid acceptance.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsRfqModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Broadcast RFQ to Farmers
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
