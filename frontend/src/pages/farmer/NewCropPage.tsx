import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cropService } from '../../services/cropService';
import type { GrowthStage, CropHealthStatus } from '../../types';

export const NewCropPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('Tomato');
  const [variety, setVariety] = useState('Hybrid Abhilash');
  const [farmName, setFarmName] = useState('Green Valley Estate');
  const [areaAcres, setAreaAcres] = useState<number>(1.5);
  const [plantingDate, setPlantingDate] = useState('2026-06-10');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-09-07');
  const [growthStage, setGrowthStage] = useState<GrowthStage>('Vegetative');
  const [healthStatus, setHealthStatus] = useState<CropHealthStatus>('OPTIMAL');
  const [expectedYieldKg, setExpectedYieldKg] = useState<number>(1500);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cropService.addCrop({
      farmId: 'farm_01',
      farmName,
      name,
      variety,
      areaAcres: Number(areaAcres),
      plantingDate,
      expectedHarvestDate,
      growthStage,
      healthStatus,
      expectedYieldKg: Number(expectedYieldKg),
      notes,
    });

    navigate('/farmer/crops');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link to="/farmer/crops">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Crops
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight">Record New Crop</h1>
          <p className="text-xs text-gray-500">Register a planted crop batch for growth & harvest tracking</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-white border border-[#173B2A]/10 shadow-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Crop Name</label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
              >
                <option value="Tomato">Tomato</option>
                <option value="Wheat">Wheat</option>
                <option value="Mustard">Mustard</option>
                <option value="Potato">Potato</option>
                <option value="Onion">Onion</option>
                <option value="Paddy">Paddy / Rice</option>
                <option value="Chickpea">Chickpea</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Crop Variety</label>
              <input
                type="text"
                placeholder="e.g. Hybrid Abhilash / PBW 343"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Farm Allocation</label>
              <select
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
              >
                <option value="Green Valley Estate">Green Valley Estate (Jaunpur)</option>
                <option value="Surya Organic Farm">Surya Organic Farm (Varanasi)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Cultivation Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={areaAcres}
                onChange={(e) => setAreaAcres(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Planting Date</label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Expected Harvest Date</label>
              <input
                type="date"
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Current Growth Stage</label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value as GrowthStage)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
              >
                <option value="Sowing">Sowing</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Fruiting">Fruiting</option>
                <option value="Mature">Mature (Ready)</option>
                <option value="Harvested">Harvested</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Health Indicator</label>
              <select
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value as CropHealthStatus)}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
              >
                <option value="OPTIMAL">Optimal</option>
                <option value="GOOD">Good</option>
                <option value="NEEDS_ATTENTION">Needs Attention</option>
                <option value="HIGH_RISK">High Risk</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#173B2A] mb-1">Est. Total Yield (kg)</label>
              <input
                type="number"
                value={expectedYieldKg}
                onChange={(e) => setExpectedYieldKg(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#173B2A] mb-1">Field Notes / Fertilizers Applied</label>
            <textarea
              rows={3}
              placeholder="e.g. Organic compost applied. Drip irrigation scheduled every 3 days."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:ring-2 focus:ring-[#173B2A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <Link to="/farmer/crops">
              <Button variant="ghost" size="md">Cancel</Button>
            </Link>
            <Button variant="primary" size="md" type="submit" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
              Save Crop Record
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
