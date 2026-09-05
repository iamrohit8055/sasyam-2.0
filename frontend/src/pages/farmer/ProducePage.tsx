import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Boxes,
  Clock,
  Scale,
  Factory,
  Store,
  Truck,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { harvestService } from '../../services/harvestService';
import type { ProduceBatch } from '../../types';

export const ProducePage: React.FC = () => {
  const navigate = useNavigate();
  const [produce, setProduce] = useState<ProduceBatch[]>([]);

  useEffect(() => {
    setProduce(harvestService.getProduce());
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[#8A6745]" />
            Harvested Produce Inventory & Shelf-Life Monitor
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track produce freshness, spoilage risk, safe selling windows & profit maximization actions
          </p>
        </div>

        <Link to="/farmer/harvests">
          <Button variant="primary" size="sm" leftIcon={<Boxes className="w-4 h-4" />}>
            Record New Harvest
          </Button>
        </Link>
      </div>

      {/* Produce Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {produce.map((item) => {
          const isHighRisk = item.spoilageRisk === 'HIGH' || item.spoilageRisk === 'CRITICAL';

          return (
            <Card
              key={item.id}
              className={`p-6 bg-white space-y-5 border-2 transition-all relative overflow-hidden ${
                isHighRisk ? 'border-[#C94B45]/40 shadow-md' : 'border-[#173B2A]/10'
              }`}
            >
              {/* Header Title & Risk Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#173B2A]">{item.cropName}</h3>
                    <Badge variant="success" className="text-[10px]">{item.qualityGrade}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Variety: {item.variety} • Quantity: <strong className="text-gray-800 font-mono text-sm">{item.quantityKg.toLocaleString()} kg</strong>
                  </p>
                </div>

                <Badge variant={isHighRisk ? 'danger' : 'success'} className="text-xs py-1 px-2.5">
                  Risk: {item.spoilageRisk}
                </Badge>
              </div>

              {/* Freshness Bar & Selling Window */}
              <div className="p-4 rounded-2xl bg-[#F7F5ED] space-y-3 border border-gray-200">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#173B2A] flex items-center gap-1.5">
                    Freshness Meter
                  </span>
                  <span className={isHighRisk ? 'text-rose-700 font-mono font-bold' : 'text-emerald-700 font-mono font-bold'}>
                    {item.freshnessPercent}% Fresh
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isHighRisk ? 'bg-[#C94B45]' : 'bg-[#2F6B45]'
                    }`}
                    style={{ width: `${item.freshnessPercent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Safe Selling Window:
                  </span>
                  <span className="font-mono font-bold text-[#173B2A] bg-white px-2 py-0.5 rounded border border-gray-200">
                    {item.safeSellingWindowDays} Days Remaining
                  </span>
                </div>
              </div>

              {/* Storage Info & Mandi Price */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#DCE9D8]/40 p-3.5 rounded-xl border border-[#2F6B45]/10">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Storage Condition</span>
                  <span className="font-bold text-[#173B2A]">{item.storageCondition}</span>
                  <span className="text-[10px] text-gray-500 block truncate">{item.storageLocation}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Current Mandi Price</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">₹{item.currentMarketPricePerKg}/kg</span>
                  <span className="text-[10px] text-emerald-700 block font-semibold">Est: ₹{(item.quantityKg * item.currentMarketPricePerKg).toLocaleString()}</span>
                </div>
              </div>

              {/* SASYAM Recommended Action Callout */}
              <div className="p-3.5 rounded-xl bg-[#173B2A] text-white space-y-1.5">
                <div className="flex items-center gap-1.5 text-yellow-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>✦ SASYAM ACTION RECOMMENDATION</span>
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  {item.recommendedAction === 'SELL_NOW'
                    ? 'Sell within 48 hours to Azadpur Mandi to prevent spoilage and gain +₹3,000 extra net profit.'
                    : 'Store in Cold Storage. Prices are expected to jump +15% over the next 2 weeks.'}
                </p>
              </div>

              {/* Interactive Multi-Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/farmer/sell-decision')}
                  leftIcon={<Scale className="w-3.5 h-3.5" />}
                  className="w-full text-xs py-2 justify-center font-bold"
                >
                  Sell / Store
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/marketplace')}
                  leftIcon={<Store className="w-3.5 h-3.5" />}
                  className="w-full text-xs py-2 justify-center font-semibold"
                >
                  List Produce
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/farmer/processing')}
                  leftIcon={<Factory className="w-3.5 h-3.5" />}
                  className="w-full text-xs py-2 justify-center font-semibold"
                >
                  Process
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/farmer/transport')}
                  leftIcon={<Truck className="w-3.5 h-3.5 text-[#2F6B45]" />}
                  className="w-full text-xs py-2 justify-center font-semibold"
                >
                  Transport
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
