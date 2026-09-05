import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Sprout,
  TrendingUp,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Droplet,
  Calendar,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AIInsightCard } from '../../components/agriculture/AIInsightCard';
import { cropRecommendationService } from '../../services/cropRecommendationService';
import type { CropSuitabilityResult } from '../../services/cropRecommendationService';

export const AICropRecommendationPage: React.FC = () => {
  const navigate = useNavigate();

  // Soil & Farm Inputs
  const [soilType, setSoilType] = useState<'Alluvial' | 'Black' | 'Red' | 'Sandy Loam'>('Alluvial');
  const [nitrogen, setNitrogen] = useState<number>(240);
  const [phosphorus, setPhosphorus] = useState<number>(45);
  const [potassium, setPotassium] = useState<number>(180);
  const [soilPh, setSoilPh] = useState<number>(6.8);
  const [waterSource, setWaterSource] = useState<'Borewell' | 'Canal' | 'Rainfed'>('Borewell');
  const [areaAcres, setAreaAcres] = useState<number>(2.5);
  const [budgetInr, setBudgetInr] = useState<number>(50000);

  const [results, setResults] = useState<CropSuitabilityResult[]>([]);

  const handleRunRecommendation = () => {
    const data = cropRecommendationService.getRecommendations({
      soilType,
      nitrogenKgHa: nitrogen,
      phosphorusKgHa: phosphorus,
      potassiumKgHa: potassium,
      soilPh,
      waterSource,
      areaAcres,
      budgetInr,
    });
    setResults(data);
  };

  useEffect(() => {
    handleRunRecommendation();
  }, []);

  const topMatch = results[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">AI Crop Selection & Suitability Engine</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              SASYAM AI 2.0
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Precision soil-to-market crop matching based on lab NPK values, irrigation source, land acreage, and regional mandi prices.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/crops')}>
            <Sprout className="w-4 h-4 mr-1.5 text-emerald-600" />
            My Active Crops
          </Button>
        </div>
      </div>

      {/* Inputs Section */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#2F6B45]" />
            <h3 className="text-lg font-bold text-[#173B2A]">Field Parameters & Lab Soil NPK Test Values</h3>
          </div>
          <span className="text-xs text-gray-400">Jaunpur Plot #1 Soil Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Soil & Water */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Soil Classification</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
              >
                <option value="Alluvial">Alluvial Soil (Purvanchal Plain)</option>
                <option value="Black">Black Soil (Regur)</option>
                <option value="Red">Red Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Water / Irrigation Source</label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
              >
                <option value="Borewell">Borewell Drip / Tube Well</option>
                <option value="Canal">Canal System</option>
                <option value="Rainfed">Rainfed Monsoon</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600">Lab Soil pH Level</label>
                <span className="text-xs font-bold text-emerald-800">{soilPh} pH</span>
              </div>
              <input
                type="range"
                min={5.0}
                max={8.5}
                step={0.1}
                value={soilPh}
                onChange={(e) => setSoilPh(Number(e.target.value))}
                className="w-full accent-[#2F6B45]"
              />
            </div>
          </div>

          {/* NPK Sliders */}
          <div className="space-y-3 bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Nitrogen (N):</span>
              <span className="font-bold text-emerald-800">{nitrogen} kg/ha</span>
            </div>
            <input
              type="range"
              min={100}
              max={400}
              value={nitrogen}
              onChange={(e) => setNitrogen(Number(e.target.value))}
              className="w-full accent-[#2F6B45]"
            />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Phosphorus (P):</span>
              <span className="font-bold text-emerald-800">{phosphorus} kg/ha</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={phosphorus}
              onChange={(e) => setPhosphorus(Number(e.target.value))}
              className="w-full accent-[#2F6B45]"
            />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Potassium (K):</span>
              <span className="font-bold text-emerald-800">{potassium} kg/ha</span>
            </div>
            <input
              type="range"
              min={100}
              max={300}
              value={potassium}
              onChange={(e) => setPotassium(Number(e.target.value))}
              className="w-full accent-[#2F6B45]"
            />
          </div>

          {/* Land & Budget */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-600">Land Area (Acres)</label>
                <span className="text-xs font-bold text-[#2F6B45]">{areaAcres} Acres</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={20}
                step={0.5}
                value={areaAcres}
                onChange={(e) => setAreaAcres(Number(e.target.value))}
                className="w-full accent-[#2F6B45]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Available Input Budget (₹)</label>
              <input
                type="number"
                step="5000"
                value={budgetInr}
                onChange={(e) => setBudgetInr(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
              />
            </div>

            <Button variant="primary" className="w-full justify-center mt-2" onClick={handleRunRecommendation}>
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
              Recalculate AI Crop Match
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Hero AI Recommendation Banner */}
      {topMatch && (
        <AIInsightCard
          title="TOP RECOMMENDED CROP MATCH"
          recommendation={`${topMatch.cropName} (${topMatch.variety}) — ${topMatch.suitabilityScore}% SUITABILITY MATCH`}
          confidenceScore={Math.round(topMatch.suitabilityScore)}
          variant="primary"
          reasoning={topMatch.reasoning}
          actionLabel="Start Sowing Crop"
          onAction={() => navigate('/farmer/crops/new')}
        />
      )}

      {/* Ranked Recommendations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#173B2A] flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#2F6B45]" />
          Ranked Crop Suitability Analysis ({results.length} Candidates)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((crop) => (
            <Card
              key={crop.id}
              className="p-5 bg-white border border-gray-200 flex flex-col justify-between hover:border-[#2F6B45] transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-[#173B2A]">{crop.cropName}</h4>
                    <span className="text-xs text-gray-500">{crop.variety}</span>
                  </div>
                  <Badge
                    variant={
                      crop.suitabilityScore >= 90
                        ? 'success'
                        : crop.suitabilityScore >= 85
                        ? 'warning'
                        : 'neutral'
                    }
                  >
                    {crop.suitabilityScore}% MATCH
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs mb-4">
                  <div>
                    <span className="text-gray-400 block flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Duration
                    </span>
                    <span className="font-bold text-gray-800">{crop.growingDurationDays} Days</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block flex items-center gap-1">
                      <Droplet className="w-3 h-3" />
                      Water
                    </span>
                    <span className="font-bold text-gray-800">{crop.waterRequirement}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Yield/Acre
                    </span>
                    <span className="font-bold text-emerald-700">{crop.expectedYieldPerAcreKg.toLocaleString()} kg</span>
                  </div>
                </div>

                {/* Financial Forecast */}
                <div className="bg-[#F7F5ED] p-3.5 rounded-xl border border-[#DCE9D8] space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Gross Revenue ({areaAcres} Acres):</span>
                    <span className="font-bold text-[#173B2A]">₹{crop.estimatedGrossRevenueInr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#DCE9D8]">
                    <span className="text-gray-600">Estimated Net Profit:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      ₹{crop.estimatedNetProfitInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Explainable AI Rationale */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  <span className="font-semibold text-gray-800 block">AI Match Rationale:</span>
                  {crop.reasoning.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Risk Profile: {crop.riskLevel}</span>
                <Button variant="primary" size="sm" onClick={() => navigate('/farmer/crops/new')}>
                  Cultivate {crop.cropName}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
