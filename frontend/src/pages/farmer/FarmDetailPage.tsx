import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  Plus,
  Activity,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { farmService } from '../../services/farmService';
import type { SoilHealth, YieldHistoryItem } from '../../services/farmService';
import type { Farm, Field } from '../../types';

export const FarmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [soil, setSoil] = useState<SoilHealth | null>(null);
  const [history, setHistory] = useState<YieldHistoryItem[]>([]);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  // Add Field Form State
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState<number>(1.0);
  const [fieldSoil, setFieldSoil] = useState<Field['soilType']>('Alluvial');
  const [waterSource, setWaterSource] = useState<Field['waterSource']>('Drip Irrigation');

  useEffect(() => {
    if (id) {
      const foundFarm = farmService.getFarmById(id);
      if (foundFarm) {
        setFarm(foundFarm);
        setSoil(farmService.getSoilHealth(id));
        setHistory(farmService.getYieldHistory(id));
      }
    }
  }, [id]);

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !fieldName) return;

    const newField = farmService.addField(id, {
      name: fieldName,
      areaAcres: Number(fieldArea),
      soilType: fieldSoil,
      waterSource,
    });

    if (farm) {
      setFarm({ ...farm, fields: [...farm.fields, newField] });
    }
    setIsAddFieldModalOpen(false);
    setFieldName('');
  };

  if (!farm) {
    return (
      <div className="space-y-4">
        <Link to="/farmer/farms">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Farms
          </Button>
        </Link>
        <Card className="p-8 text-center text-gray-500">
          Farm profile not found.
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/farmer/farms">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              All Farms
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#173B2A] tracking-tight">{farm.name}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#2F6B45]" />
              {farm.location} • Latitude: {farm.latitude}, Longitude: {farm.longitude}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddFieldModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Field Boundary
        </Button>
      </div>

      {/* Farm Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Total Farm Area</span>
          <p className="text-2xl font-black text-[#173B2A] font-mono">{farm.totalAreaAcres} Acres</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Soil Profile</span>
          <p className="text-2xl font-black text-[#2F6B45]">{farm.soilType}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Irrigation Setup</span>
          <p className="text-base font-bold text-[#173B2A] truncate">{farm.irrigationType}</p>
        </Card>
        <Card className="p-4 bg-white space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Soil Health Rating</span>
          <p className="text-2xl font-black text-emerald-700">{soil?.rating || 'GOOD'}</p>
        </Card>
      </div>

      {/* Main Grid: Soil Test Report & Fields List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Soil Health Analysis Card (5 cols) */}
        <Card className="lg:col-span-5 p-5 space-y-4 bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/20 text-emerald-300">
                <Activity className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white">Soil NPK & Health Card</h3>
            </div>
            <Badge variant="brand" className="bg-white/20 text-white border-white/20">
              Lab Verified
            </Badge>
          </div>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Alluvial soil with optimal pH for nightshade (Tomatoes, Potatoes) and cereal crops (Wheat, Rice).
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">pH Value</span>
              <span className="text-xl font-bold font-mono text-yellow-300">{soil?.pH}</span>
              <span className="text-[10px] text-emerald-100 block">Slightly Acidic (Optimal)</span>
            </div>

            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Nitrogen (N)</span>
              <span className="text-xl font-bold font-mono text-white">{soil?.nitrogenKgPerHa} kg/ha</span>
              <span className="text-[10px] text-emerald-100 block">Medium High</span>
            </div>

            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Phosphorus (P)</span>
              <span className="text-xl font-bold font-mono text-white">{soil?.phosphorusKgPerHa} kg/ha</span>
              <span className="text-[10px] text-emerald-100 block">Adequate</span>
            </div>

            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Potassium (K)</span>
              <span className="text-xl font-bold font-mono text-white">{soil?.potassiumKgPerHa} kg/ha</span>
              <span className="text-[10px] text-emerald-100 block">High Capacity</span>
            </div>
          </div>

          <Link to="/farmer/recommendations">
            <Button variant="secondary" size="sm" className="w-full justify-center bg-white text-[#173B2A] font-bold mt-2">
              Run AI Crop Suitability Check
            </Button>
          </Link>
        </Card>

        {/* Fields List (7 cols) */}
        <Card className="lg:col-span-7 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#173B2A]">Mapped Fields ({farm.fields?.length || 0})</h3>
              <p className="text-xs text-gray-500">Individual plots mapped with water sources</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddFieldModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Field
            </Button>
          </div>

          <div className="space-y-3">
            {farm.fields?.map((field) => (
              <div key={field.id} className="p-4 rounded-xl bg-[#F7F5ED] border border-gray-200 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#173B2A]">{field.name}</span>
                    <Badge variant="success" className="text-[10px]">{field.areaAcres} Acres</Badge>
                  </div>
                  <p className="text-gray-500">
                    Soil: <strong className="text-gray-700">{field.soilType}</strong> • Water Source: <strong className="text-gray-700">{field.waterSource}</strong>
                  </p>
                </div>

                <Link to="/farmer/crops/new">
                  <Button variant="ghost" size="sm" className="text-[#2F6B45] font-semibold">
                    + Assign Crop
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Yield Performance History Table */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#173B2A]">Historical Yield & Revenue Track Record</h3>
            <p className="text-xs text-gray-500">Past harvest records and market price realization per crop</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Season / Year</th>
                <th className="py-2.5 px-3">Crop Cultivated</th>
                <th className="py-2.5 px-3 text-right">Yield Achieved</th>
                <th className="py-2.5 px-3 text-right">Yield / Acre</th>
                <th className="py-2.5 px-3 text-right">Mandi Price Achieved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F5ED]/50 transition">
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#173B2A]">{item.season} {item.year}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-700">{item.cropName}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#173B2A]">
                    {item.yieldAchievedKg.toLocaleString()} kg
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-gray-600">
                    {item.yieldPerAcreKg.toLocaleString()} kg/ac
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-800">
                    ₹{item.marketPriceAchievedPerKg}/kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Add Field */}
      {isAddFieldModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#173B2A]">Add Field to {farm.name}</h3>
              <button onClick={() => setIsAddFieldModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddField} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Field Name / Plot Identifier</label>
                <input
                  type="text"
                  placeholder="e.g. West Field #4"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Field Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Soil Type</label>
                  <select
                    value={fieldSoil}
                    onChange={(e) => setFieldSoil(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  >
                    <option value="Alluvial">Alluvial Soil</option>
                    <option value="Black">Black Soil</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay">Clay Soil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Water Source / Irrigation</label>
                <select
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Borewell">Borewell</option>
                  <option value="Canal">Canal Water</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddFieldModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Field
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
