import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Sparkles,
  Scale,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { marketService } from '../../services/marketService';
import type { MandiComparisonItem, PriceTrendPoint } from '../../services/marketService';

export const MarketsPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Potato' | 'Onion'>('Tomato');
  const [quantityKg, setQuantityKg] = useState<number>(1500);
  const [comparison, setComparison] = useState<MandiComparisonItem[]>([]);
  const [trendData, setTrendData] = useState<PriceTrendPoint[]>([]);

  useEffect(() => {
    setComparison(marketService.getMandiComparison(selectedCrop, quantityKg));
    setTrendData(marketService.getPriceTrend(selectedCrop));
  }, [selectedCrop, quantityKg]);

  const bestMandi = comparison.find((m) => m.isRecommended) || comparison[0];
  const localMandi = comparison.find((m) => m.marketName.includes('Jaunpur')) || comparison[1];
  const netProfitAdvantage = (bestMandi?.totalNetRevenue || 0) - (localMandi?.totalNetRevenue || 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#2F6B45]" />
            Market Intelligence & Net Realization Engine
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Compare true net revenue across mandis after deducting truck freight, handling & commissions
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/farmer/sell-decision')}
          leftIcon={<Scale className="w-4 h-4" />}
        >
          Run Sell vs Store Engine
        </Button>
      </div>

      {/* Controls Bar: Crop & Batch Volume Picker */}
      <Card className="p-4 bg-white space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Crop Selector Tabs */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Select Crop to Analyze
            </label>
            <div className="flex items-center gap-1 bg-[#F7F5ED] p-1 rounded-xl text-xs font-bold">
              {(['Tomato', 'Potato', 'Onion'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-4 py-1.5 rounded-lg transition ${
                    selectedCrop === crop ? 'bg-[#173B2A] text-white shadow-xs' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Batch Volume (kg)
            </label>
            <div className="flex items-center gap-2">
              <select
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="py-1.5 px-3 text-xs font-bold rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
              >
                <option value={1000}>1,000 kg (10 Quintals)</option>
                <option value={1500}>1,500 kg (15 Quintals)</option>
                <option value={3000}>3,000 kg (30 Quintals)</option>
                <option value={5000}>5,000 kg (50 Quintals)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommended Mandi Headline Card */}
      {bestMandi && (
        <Card className="p-6 bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white space-y-4 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/20 text-yellow-300">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                ✦ SASYAM BEST MANDI RECOMMENDATION
              </span>
            </div>
            <Badge variant="brand" className="bg-white/20 text-white border-white/20 text-xs">
              Highest Net Realization
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2">
              <h3 className="text-2xl font-black text-white">
                Sell at {bestMandi.marketName} ({bestMandi.location})
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {bestMandi.reason} Quoted price is ₹{bestMandi.quotedPricePerKg}/kg minus ₹{bestMandi.transportCostPerKg}/kg transport freight = <strong className="text-yellow-300 font-mono">₹{bestMandi.netRealizationPerKg}/kg Net Realization</strong>.
              </p>
            </div>

            <div className="md:col-span-5 bg-black/20 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-200">Local Mandi Net Revenue:</span>
                <span className="font-mono font-semibold">₹{localMandi?.totalNetRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-yellow-300">
                <span>{bestMandi.marketName} Net Revenue:</span>
                <span className="font-mono">₹{bestMandi.totalNetRevenue.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-sm text-emerald-300">
                <span>Net Extra Profit Gain:</span>
                <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white">
                  +₹{netProfitAdvantage > 0 ? netProfitAdvantage.toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Net Realization Mandi Comparison Table */}
      <Card className="p-5 space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#173B2A]">Mandi Comparison Matrix ({selectedCrop} — {quantityKg.toLocaleString()} kg)</h3>
            <p className="text-xs text-gray-500">Net Realization = Quoted Price − Freight − Handling</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Market / Mandi</th>
                <th className="py-2.5 px-3">Distance</th>
                <th className="py-2.5 px-3 text-right">Quoted Price</th>
                <th className="py-2.5 px-3 text-right">Freight Cost</th>
                <th className="py-2.5 px-3 text-right">Net Realization</th>
                <th className="py-2.5 px-3 text-right">Est. Total Revenue</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {comparison.map((item) => (
                <tr
                  key={item.id}
                  className={`transition ${
                    item.isRecommended ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-[#F7F5ED]/50'
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#173B2A] text-sm">{item.marketName}</span>
                      {item.isRecommended && (
                        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                          ★ RECOMMENDED
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500">{item.location} • Demand: {item.demandLevel}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-600">
                    {item.distanceKm} km
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-gray-800">
                    ₹{item.quotedPricePerKg}/kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-rose-700">
                    -₹{item.transportCostPerKg}/kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-800 text-sm">
                    ₹{item.netRealizationPerKg}/kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#173B2A]">
                    ₹{item.totalNetRevenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Button
                      variant={item.isRecommended ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => navigate('/farmer/transport')}
                      className="text-xs py-1 px-2.5"
                    >
                      Book Freight
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 7-Day Historical Price Trend Chart (Recharts) */}
      <Card className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#173B2A]">7-Day Mandi Price Trend ({selectedCrop})</h3>
            <p className="text-xs text-gray-500">Historical price fluctuations across Delhi, Jaunpur & Varanasi mandis</p>
          </div>
          <Badge variant="info" className="text-xs">Live Mandi Feed</Badge>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888888" fontSize={11} />
              <YAxis domain={['auto', 'auto']} stroke="#888888" fontSize={11} unit="₹" />
              <Tooltip
                contentStyle={{ backgroundColor: '#173B2A', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="azadpurPrice" name="Azadpur Mandi (Delhi)" stroke="#2F6B45" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="varanasiPrice" name="Varanasi Central Mandi" stroke="#8A6745" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="localMandiPrice" name="Jaunpur Local Mandi" stroke="#6b7280" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
