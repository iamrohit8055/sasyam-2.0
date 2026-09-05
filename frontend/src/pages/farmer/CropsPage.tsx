import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Plus,
  Search,
  Trash2,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cropService } from '../../services/cropService';
import type { Crop } from '../../types';

export const CropsPage: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<'ALL' | 'ACTIVE' | 'MATURE' | 'HARVESTED'>('ALL');

  useEffect(() => {
    setCrops(cropService.getCrops());
  }, []);

  const handleDeleteCrop = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this crop record?')) {
      cropService.deleteCrop(id);
      setCrops(crops.filter((c) => c.id !== id));
    }
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (stageFilter === 'ACTIVE') return crop.growthStage !== 'Harvested';
    if (stageFilter === 'MATURE') return crop.growthStage === 'Mature';
    if (stageFilter === 'HARVESTED') return crop.growthStage === 'Harvested';
    return true;
  });

  const totalYieldEst = crops
    .filter((c) => c.growthStage !== 'Harvested')
    .reduce((acc, c) => acc + c.expectedYieldKg, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight flex items-center gap-2">
            <Sprout className="w-6 h-6 text-[#2F6B45]" />
            Crop Lifecycle & Advisory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitor active crops, growth timelines, health indicators & expected harvest yields
          </p>
        </div>

        <Link to="/farmer/crops/new">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            Record New Crop
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Active Cultivated Crops</p>
          <p className="text-2xl font-bold text-[#173B2A] font-mono">
            {crops.filter((c) => c.growthStage !== 'Harvested').length} Crops
          </p>
          <p className="text-[10px] text-gray-400">Tomato, Wheat, Mustard</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Est. Upcoming Yield</p>
          <p className="text-2xl font-bold text-[#2F6B45] font-mono">
            {totalYieldEst.toLocaleString()} kg
          </p>
          <p className="text-[10px] text-gray-400">Across 4.5 Total Acres</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Mature Ready Crops</p>
          <p className="text-2xl font-bold text-amber-700 font-mono">
            {crops.filter((c) => c.growthStage === 'Mature').length} Crop
          </p>
          <p className="text-[10px] text-amber-600 font-semibold">Harvest window active</p>
        </Card>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#173B2A]/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search crop, variety, or farm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#F7F5ED] p-1 rounded-xl text-xs font-semibold w-full sm:w-auto justify-center">
          {(['ALL', 'ACTIVE', 'MATURE', 'HARVESTED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStageFilter(filter)}
              className={`px-3 py-1 rounded-lg transition ${
                stageFilter === filter ? 'bg-[#173B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Crops List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCrops.map((crop) => (
          <Link key={crop.id} to={`/farmer/crops/${crop.id}`} className="block group">
            <Card className="p-6 bg-white space-y-4 hover:border-[#2F6B45]/40 hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#173B2A] group-hover:text-[#2F6B45] transition">
                      {crop.name}
                    </h3>
                    <Badge variant={crop.growthStage === 'Mature' ? 'warning' : 'info'} className="text-[10px]">
                      {crop.growthStage}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {crop.variety} • <strong className="text-gray-700">{crop.areaAcres} Acres</strong>
                  </p>
                </div>

                <button
                  onClick={(e) => handleDeleteCrop(crop.id, e)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Remove crop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Specs Box */}
              <div className="grid grid-cols-3 gap-2 bg-[#F7F5ED] p-3 rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Farm</span>
                  <span className="font-bold text-[#173B2A] truncate block">{crop.farmName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Health Status</span>
                  <span className="font-bold text-emerald-700 block">{crop.healthStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Est. Yield</span>
                  <span className="font-mono font-bold text-[#173B2A] block">{crop.expectedYieldKg.toLocaleString()} kg</span>
                </div>
              </div>

              {/* Dates & Action Bar */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Harvest: <strong className="text-gray-800">{crop.expectedHarvestDate}</strong></span>
                </div>

                <span className="font-bold text-[#2F6B45] group-hover:translate-x-0.5 transition inline-flex items-center gap-1">
                  Timeline & Details →
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
