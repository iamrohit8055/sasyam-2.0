import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  Wheat,
  Boxes,
  TrendingUp,
  Truck,
  Sparkles,
  CloudRain,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  Scan,
  Scale,
  Factory,
  MapPin,
} from 'lucide-react';
import { StatCard } from '../../components/agriculture/StatCard';
import { AIInsightCard } from '../../components/agriculture/AIInsightCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { farmerService } from '../../services/farmerService';
import type { FarmerDashboardSummary } from '../../services/farmerService';
import type { Crop, MarketPrice, ProduceBatch } from '../../types';

export const FarmerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [summary, setSummary] = useState<FarmerDashboardSummary | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [produce, setProduce] = useState<ProduceBatch[]>([]);
  const [markets, setMarkets] = useState<MarketPrice[]>([]);
  const [cropFilter, setCropFilter] = useState<'ALL' | 'MATURE' | 'GROWING'>('ALL');

  useEffect(() => {
    setSummary(farmerService.getSummary());
    setCrops(farmerService.getCrops());
    setProduce(farmerService.getProduce());
    setMarkets(farmerService.getMarketPrices());
  }, []);

  const filteredCrops = crops.filter((c) => {
    if (cropFilter === 'MATURE') return c.growthStage === 'Mature';
    if (cropFilter === 'GROWING') return c.growthStage !== 'Mature';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#173B2A] tracking-tight">
              Good morning, {user?.name || 'Rohit Kumar'} 👋
            </h1>
            <Badge variant="success" className="text-[10px]">Verified Farmer</Badge>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#2F6B45]" />
            <span>Farm: <strong className="text-gray-800">Green Valley Estate</strong> ({user?.location || 'Jaunpur, UP'})</span>
            <span>• 4.5 Acres • Soil: Alluvial</span>
          </p>
        </div>

        {/* Quick Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/farmer/recommendations">
            <Button variant="secondary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#2F6B45]" />}>
              Crop Advisor
            </Button>
          </Link>
          <Link to="/farmer/disease-detection">
            <Button variant="outline" size="sm" leftIcon={<Scan className="w-3.5 h-3.5" />}>
              Scan Disease
            </Button>
          </Link>
          <Link to="/farmer/crops/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Add Crop
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Crops"
          value={`${summary?.activeCropsCount || 3} Crops`}
          subtitle="Tomato, Potato, Wheat"
          icon={<Sprout className="w-5 h-5 text-[#173B2A]" />}
        />
        <StatCard
          title="Upcoming Harvest"
          value="1,500 kg"
          subtitle="Tomato (Mature stage)"
          change="Harvest in 2 Days"
          changeType="positive"
          icon={<Wheat className="w-5 h-5 text-amber-700" />}
        />
        <StatCard
          title="Stored Produce"
          value="900 kg"
          subtitle="Potato (Cold Storage)"
          change="Spoilage Risk: Low"
          changeType="neutral"
          icon={<Boxes className="w-5 h-5 text-[#8A6745]" />}
        />
        <StatCard
          title="Est. Net Realization"
          value={`₹${(summary?.estimatedNetRevenue || 44200).toLocaleString()}`}
          subtitle="Best mandi realization"
          change="+18.4% net gain"
          changeType="positive"
          icon={<TrendingUp className="w-5 h-5 text-emerald-700" />}
        />
      </div>

      {/* Flagship SASYAM AI Recommendation Card */}
      <AIInsightCard
        title="SASYAM DECISION ENGINE"
        recommendation="Consider harvesting Tomato batch within 48 hours & sell at Market B (Azadpur)."
        confidenceScore={94}
        reasoning={[
          'Heavy rainfall predicted in Jaunpur district in 3 days — risk of waterlogging damage',
          'Azadpur Mandi price is up +8.2% this week (₹27/kg vs ₹24/kg local mandi)',
          'Net Realization: ₹24/kg after ₹3/kg transport cost yields +₹3,000 extra net profit',
        ]}
        actionLabel="Run Sell vs Store Engine"
        onAction={() => navigate('/farmer/sell-decision')}
        secondaryActionLabel="Book Verified Transport"
        onSecondaryAction={() => navigate('/farmer/transport')}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Crops Section (8 cols) */}
        <Card className="lg:col-span-8 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#173B2A]">Active Crop Lifecycle</h3>
              <p className="text-xs text-gray-500">Field monitoring, growth stages, and harvest windows</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#F7F5ED] p-1 rounded-xl text-xs font-semibold">
              {(['ALL', 'MATURE', 'GROWING'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setCropFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    cropFilter === filter ? 'bg-[#173B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Crop / Variety</th>
                  <th className="py-2.5 px-3">Field</th>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3">Health Status</th>
                  <th className="py-2.5 px-3 text-right">Est. Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filteredCrops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-[#F7F5ED]/50 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#173B2A]">{crop.name}</div>
                      <div className="text-[10px] text-gray-500">{crop.variety} • {crop.areaAcres} Acres</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600 font-medium">North Field</td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={crop.growthStage === 'Mature' ? 'warning' : 'info'}
                        className="text-[10px]"
                      >
                        {crop.growthStage}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {crop.healthStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#173B2A]">
                      {crop.expectedYieldKg.toLocaleString()} kg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Showing {filteredCrops.length} active crops</span>
            <Link to="/farmer/crops" className="font-bold text-[#2F6B45] hover:underline flex items-center gap-1">
              Manage All Crops <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* Sidebar Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Weather Alert Widget */}
          <Card className="p-4 bg-amber-50/70 border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-amber-900">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-amber-600 animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-wider">Weather Alert</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">Tomorrow</span>
            </div>
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              28mm heavy rainfall forecast for Jaunpur district. SASYAM advises harvesting mature tomato crop immediately.
            </p>
          </Card>

          {/* Stored Produce & Spoilage Monitor */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Harvested Inventory</h4>
              <span className="text-[10px] text-gray-500 font-semibold">{produce.length} Batches</span>
            </div>

            {produce.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-[#F7F5ED] space-y-2 text-xs border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#173B2A]">{p.cropName} ({p.quantityKg.toLocaleString()} kg)</span>
                  <Badge variant={p.spoilageRisk === 'HIGH' ? 'danger' : 'success'} className="text-[10px]">
                    Risk: {p.spoilageRisk}
                  </Badge>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600">
                  <span>Freshness: <strong>{p.freshnessPercent}%</strong></span>
                  <span>Selling Window: <strong>{p.safeSellingWindowDays} Days</strong></span>
                </div>
                <Link to="/farmer/sell-decision">
                  <Button variant="outline" size="sm" className="w-full text-xs justify-center py-1 mt-1 font-semibold">
                    Evaluate Selling vs Storage
                  </Button>
                </Link>
              </div>
            ))}
          </Card>

          {/* Live Mandi Market Price Snapshot */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Live Mandi Snapshot</h4>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Live Realization</span>
            </div>

            <div className="space-y-2">
              {markets.map((m) => (
                <div key={m.id} className={`p-2.5 rounded-xl text-xs flex justify-between items-center transition ${m.isRecommended ? 'bg-emerald-50 border border-emerald-200' : 'bg-[#F7F5ED]'}`}>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[#173B2A]">
                      <span>{m.cropName}</span>
                      {m.isRecommended && <span className="text-[10px] text-emerald-700 bg-emerald-200 px-1 rounded">★ Best</span>}
                    </div>
                    <p className="text-[10px] text-gray-500">{m.marketName} • {m.distanceKm} km</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-[#173B2A]">₹{m.pricePerKg}/kg</p>
                    <p className="text-[10px] font-bold text-emerald-700">Net: ₹{m.estimatedNetPricePerKg}/kg</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/farmer/markets" className="block text-center text-xs font-bold text-[#2F6B45] hover:underline pt-1">
              Compare All Nearby Mandis →
            </Link>
          </Card>
        </div>
      </div>

      {/* Action Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          onClick={() => navigate('/farmer/sell-decision')}
          className="p-4 bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white hover:-translate-y-1 cursor-pointer transition shadow-md space-y-2"
        >
          <div className="flex items-center justify-between">
            <Scale className="w-5 h-5 text-emerald-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">Flagship</span>
          </div>
          <h4 className="text-sm font-bold">Sell Now vs Store Engine</h4>
          <p className="text-xs text-emerald-100/80">Calculate net realization, storage costs & spoilage probability.</p>
        </Card>

        <Card
          onClick={() => navigate('/farmer/disease-detection')}
          className="p-4 bg-white hover:border-[#2F6B45]/40 hover:-translate-y-1 cursor-pointer transition shadow-xs space-y-2 border border-gray-200"
        >
          <div className="p-2 rounded-lg bg-[#DCE9D8] text-[#173B2A] w-fit">
            <Scan className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#173B2A]">Disease AI Scanner</h4>
          <p className="text-xs text-gray-500">Scan crop leaves to detect diseases and receive organic action steps.</p>
        </Card>

        <Card
          onClick={() => navigate('/farmer/processing')}
          className="p-4 bg-white hover:border-[#2F6B45]/40 hover:-translate-y-1 cursor-pointer transition shadow-xs space-y-2 border border-gray-200"
        >
          <div className="p-2 rounded-lg bg-purple-100 text-purple-800 w-fit">
            <Factory className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#173B2A]">Processing Allocation</h4>
          <p className="text-xs text-gray-500">Split produce between fresh mandi sale and food processors.</p>
        </Card>

        <Card
          onClick={() => navigate('/farmer/transport')}
          className="p-4 bg-white hover:border-[#2F6B45]/40 hover:-translate-y-1 cursor-pointer transition shadow-xs space-y-2 border border-gray-200"
        >
          <div className="p-2 rounded-lg bg-blue-100 text-blue-800 w-fit">
            <Truck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#173B2A]">Book & Track Transport</h4>
          <p className="text-xs text-gray-500">Match verified trucks, compare quotes, and track live GPS location.</p>
        </Card>
      </div>

      {/* Recent Activity Timeline */}
      <Card className="p-5 space-y-4">
        <h3 className="text-base font-bold text-[#173B2A]">Recent Supply-Chain Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-[#F7F5ED] space-y-1 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[#2F6B45] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Harvest Logged</span>
            </div>
            <p className="text-gray-600">1,500 kg Tomato recorded in produce inventory.</p>
            <span className="text-[10px] text-gray-400">Yesterday, 4:30 PM</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F5ED] space-y-1 border border-gray-100">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
              <Clock className="w-4 h-4" />
              <span>Buyer Offer</span>
            </div>
            <p className="text-gray-600">Fresh Foods Ltd offered ₹26/kg for 1,000 kg.</p>
            <span className="text-[10px] text-gray-400">Today, 9:15 AM</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F5ED] space-y-1 border border-gray-100">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
              <Truck className="w-4 h-4" />
              <span>Transporter Matched</span>
            </div>
            <p className="text-gray-600">Truck UP-65-AB-1234 matched for pickup.</p>
            <span className="text-[10px] text-gray-400">Today, 10:00 AM</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>SASYAM Advice</span>
            </div>
            <p className="text-emerald-900">Sell tomato batch within 48 hours.</p>
            <span className="text-[10px] text-emerald-700">Updated 10m ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
