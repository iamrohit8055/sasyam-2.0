import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  Sprout,
  Trash2,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { farmService } from '../../services/farmService';
import type { Farm } from '../../types';

export const FarmsPage: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Farm Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [totalAreaAcres, setTotalAreaAcres] = useState<number>(2.5);
  const [soilType, setSoilType] = useState<Farm['soilType']>('Alluvial');
  const [irrigationType, setIrrigationType] = useState('Borewell + Drip');

  useEffect(() => {
    setFarms(farmService.getFarms());
  }, []);

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    const newFarm = farmService.addFarm({
      name,
      location,
      latitude: 25.74,
      longitude: 82.68,
      totalAreaAcres: Number(totalAreaAcres),
      soilType,
      irrigationType,
    });

    setFarms([...farms, newFarm]);
    setIsAddModalOpen(false);
    setName('');
    setLocation('');
  };

  const handleDeleteFarm = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this farm profile?')) {
      farmService.deleteFarm(id);
      setFarms(farms.filter((f) => f.id !== id));
    }
  };

  const totalAcres = farms.reduce((acc, f) => acc + f.totalAreaAcres, 0);

  return (
    <div className="space-y-6">
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#2F6B45]" />
            Farm & Field Profiles
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your land holdings, soil profiles, irrigation infrastructure & active fields
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Farm Profile
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Farms Registered</p>
          <p className="text-2xl font-bold text-[#173B2A] font-mono">{farms.length} Farms</p>
          <p className="text-[10px] text-gray-400">Jaunpur & Varanasi Districts</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Cultivable Area</p>
          <p className="text-2xl font-bold text-[#2F6B45] font-mono">{totalAcres} Acres</p>
          <p className="text-[10px] text-gray-400">Alluvial & Black Soil</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Registered Fields</p>
          <p className="text-2xl font-bold text-[#8A6745] font-mono">
            {farms.reduce((acc, f) => acc + (f.fields?.length || 0), 0)} Fields
          </p>
          <p className="text-[10px] text-gray-400">Mapped boundaries & water sources</p>
        </Card>
      </div>

      {/* Farms List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <Link key={farm.id} to={`/farmer/farms/${farm.id}`} className="block group">
            <Card className="p-6 bg-white space-y-4 hover:border-[#2F6B45]/40 hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#173B2A] group-hover:text-[#2F6B45] transition">
                      {farm.name}
                    </h3>
                    <Badge variant="success" className="text-[10px]">
                      {farm.activeCropsCount} Active Crops
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {farm.location}
                  </p>
                </div>

                <button
                  onClick={(e) => handleDeleteFarm(farm.id, e)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Remove farm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Specs Pill Strip */}
              <div className="grid grid-cols-3 gap-2 bg-[#F7F5ED] p-3 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Total Area</span>
                  <span className="font-mono font-bold text-[#173B2A]">{farm.totalAreaAcres} Acres</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Soil Profile</span>
                  <span className="font-bold text-[#173B2A]">{farm.soilType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Irrigation</span>
                  <span className="font-bold text-[#173B2A] truncate block">{farm.irrigationType}</span>
                </div>
              </div>

              {/* Fields Summary */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold text-gray-500">
                  <span>Fields & Boundaries ({farm.fields?.length || 0})</span>
                  <span className="text-[#2F6B45]">View Soil Report →</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {farm.fields?.map((f) => (
                    <span key={f.id} className="text-[11px] bg-[#DCE9D8]/50 text-[#173B2A] px-2 py-0.5 rounded-lg border border-[#2F6B45]/10">
                      {f.name} ({f.areaAcres} Ac • {f.waterSource})
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Modal: Add New Farm */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#DCE9D8] text-[#173B2A]">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#173B2A]">Register New Farm</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFarm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sunrise Agro Field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Location / District</label>
                <input
                  type="text"
                  placeholder="e.g. Jaunpur Tehsil, Uttar Pradesh"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Total Land (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={totalAreaAcres}
                    onChange={(e) => setTotalAreaAcres(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Primary Soil Type</label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                  >
                    <option value="Alluvial">Alluvial Soil</option>
                    <option value="Black">Black Soil (Regur)</option>
                    <option value="Red">Red & Yellow Soil</option>
                    <option value="Laterite">Laterite Soil</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay">Clay Soil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Irrigation Infrastructure</label>
                <input
                  type="text"
                  placeholder="e.g. Borewell + Drip / Canal Water"
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Farm Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
