import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Wheat,
  Scan,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cropService } from '../../services/cropService';
import type { Crop, GrowthStage } from '../../types';

export const CropDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [crop, setCrop] = useState<Crop | null>(null);

  const stages: GrowthStage[] = ['Sowing', 'Vegetative', 'Flowering', 'Fruiting', 'Mature', 'Harvested'];

  useEffect(() => {
    if (id) {
      const found = cropService.getCropById(id);
      if (found) setCrop(found);
    }
  }, [id]);

  const handleStageChange = (newStage: GrowthStage) => {
    if (!id) return;
    const updated = cropService.updateCropStage(id, newStage, crop?.healthStatus || 'OPTIMAL');
    if (updated) setCrop(updated);
  };

  if (!crop) {
    return (
      <div className="space-y-4">
        <Link to="/farmer/crops">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Crops
          </Button>
        </Link>
        <Card className="p-8 text-center text-gray-500">
          Crop record not found.
        </Card>
      </div>
    );
  }

  const currentStageIndex = stages.indexOf(crop.growthStage);

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/farmer/crops">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              All Crops
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#173B2A] tracking-tight">{crop.name}</h1>
              <Badge variant="success" className="text-[10px]">{crop.variety}</Badge>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#2F6B45]" />
              {crop.farmName} • Area: {crop.areaAcres} Acres
            </p>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/farmer/disease-detection">
            <Button variant="outline" size="sm" leftIcon={<Scan className="w-3.5 h-3.5 text-[#2F6B45]" />}>
              Scan Crop Disease
            </Button>
          </Link>
          <Link to="/farmer/harvests">
            <Button variant="primary" size="sm" leftIcon={<Wheat className="w-3.5 h-3.5" />}>
              Record Harvest
            </Button>
          </Link>
        </div>
      </div>

      {/* Growth Progress Timeline */}
      <Card className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#173B2A]">Crop Growth Timeline & Progress</h3>
          <span className="text-xs font-semibold text-[#2F6B45]">Current: {crop.growthStage} Stage</span>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-6 gap-2 pt-2">
          {stages.map((stage, idx) => {
            const isPassed = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <button
                key={stage}
                onClick={() => handleStageChange(stage)}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                  isCurrent
                    ? 'bg-[#173B2A] text-white border-[#173B2A] ring-2 ring-[#2F6B45]'
                    : isPassed
                    ? 'bg-[#DCE9D8] text-[#173B2A] border-[#2F6B45]/20 font-medium'
                    : 'bg-[#F7F5ED] text-gray-400 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="text-[10px] font-mono uppercase font-bold">Step {idx + 1}</span>
                <span className="text-xs font-bold truncate w-full">{stage}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Main Grid: Crop Specs & Weather Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Specs Card (7 cols) */}
        <Card className="lg:col-span-7 p-6 bg-white space-y-4">
          <h3 className="text-base font-bold text-[#173B2A]">Cultivation Metrics</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Planting Date</span>
              <span className="font-mono font-bold text-[#173B2A]">{crop.plantingDate}</span>
            </div>

            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Est. Harvest Date</span>
              <span className="font-mono font-bold text-amber-800">{crop.expectedHarvestDate}</span>
            </div>

            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Est. Yield Volume</span>
              <span className="font-mono font-bold text-[#173B2A]">{crop.expectedYieldKg.toLocaleString()} kg</span>
            </div>

            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Health Status</span>
              <span className="font-bold text-emerald-700">{crop.healthStatus}</span>
            </div>

            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Est. Revenue</span>
              <span className="font-mono font-bold text-emerald-800">
                ₹{(crop.expectedYieldKg * 24).toLocaleString()}
              </span>
            </div>

            <div className="bg-[#F7F5ED] p-3 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium block uppercase">Irrigation Source</span>
              <span className="font-bold text-[#173B2A]">Drip Irrigation</span>
            </div>
          </div>

          {crop.notes && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase text-[10px] text-amber-700">Field Notes & Advisory:</p>
              <p className="leading-relaxed">{crop.notes}</p>
            </div>
          )}
        </Card>

        {/* Weather & Next Step Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/20 text-yellow-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                ✦ SASYAM Crop Advisory
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">
              {crop.growthStage === 'Mature'
                ? 'Harvest Window Active'
                : 'Optimal Growth Trajectory'}
            </h4>

            <p className="text-xs text-emerald-100 leading-relaxed">
              {crop.growthStage === 'Mature'
                ? 'Rainfall predicted tomorrow poses waterlogging risk. Harvest now & ship to Azadpur Mandi for ₹24/kg net realization.'
                : 'Canopy coverage is strong. Maintain drip irrigation every 3 days. Soil moisture is optimal.'}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <Link to="/farmer/sell-decision">
                <Button variant="secondary" size="sm" className="w-full justify-center bg-white text-[#173B2A] font-bold">
                  Run Sell vs Store Engine
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
