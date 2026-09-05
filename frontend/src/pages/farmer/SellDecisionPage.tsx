import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Warehouse,
  Factory,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AIInsightCard } from '../../components/agriculture/AIInsightCard';
import { decisionEngineService } from '../../services/decisionEngineService';
import type { DecisionAnalysis } from '../../services/decisionEngineService';
import type { ProduceBatch } from '../../types';

export const SellDecisionPage: React.FC = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<ProduceBatch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [storageDays, setStorageDays] = useState<number>(14);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);

  useEffect(() => {
    const list = decisionEngineService.getProduceBatches();
    setBatches(list);
    if (list.length > 0) {
      setSelectedBatchId(list[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedBatchId) {
      const result = decisionEngineService.analyzeBatch(selectedBatchId, storageDays);
      setAnalysis(result);
    }
  }, [selectedBatchId, storageDays]);

  const selectedBatch = batches.find((b) => b.id === selectedBatchId);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Sell Now vs Store? Decision Engine</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              SASYAM AI 2.0
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Real-time financial tradeoff engine balancing Mandi prices, storage costs, and spoilage risk curves.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/storage')}>
            <Warehouse className="w-4 h-4 mr-1.5" />
            My Warehouses
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/markets')}>
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Live Mandi Prices
          </Button>
        </div>
      </div>

      {/* Produce Selector Toolbar */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Select Harvested Batch
            </label>
            <select
              value={selectedBatchId}
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="w-full text-sm font-medium border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45] focus:outline-none"
            >
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.cropName} ({b.variety}) — {b.quantityKg} kg ({b.storageCondition})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-500 uppercase">
                Simulated Holding Period
              </label>
              <span className="text-xs font-bold text-[#2F6B45]">{storageDays} Days</span>
            </div>
            <input
              type="range"
              min={7}
              max={60}
              step={7}
              value={storageDays}
              onChange={(e) => setStorageDays(Number(e.target.value))}
              className="w-full accent-[#2F6B45] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>7 Days</span>
              <span>14 Days</span>
              <span>30 Days</span>
              <span>60 Days</span>
            </div>
          </div>

          {selectedBatch && (
            <div className="bg-[#F7F5ED] p-3 rounded-lg flex items-center justify-between border border-[#DCE9D8]">
              <div>
                <span className="text-xs text-gray-500 block">Batch Quality & Freshness</span>
                <span className="text-sm font-bold text-[#173B2A]">
                  {selectedBatch.qualityGrade} • {selectedBatch.freshnessPercent}% Fresh
                </span>
              </div>
              <Badge variant={selectedBatch.freshnessPercent > 80 ? 'success' : 'danger'}>
                {selectedBatch.spoilageRisk} SPOILAGE RISK
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {analysis && (
        <>
          {/* Main AI Hero Recommendation Banner */}
          <AIInsightCard
            title="SASYAM AI DECISION RECOMMENDATION"
            recommendation={analysis.recommendationTitle}
            confidenceScore={analysis.confidenceScore}
            variant={
              analysis.recommendation === 'SELL_NOW'
                ? 'urgent'
                : analysis.recommendation === 'STORE'
                ? 'primary'
                : 'highlight'
            }
            reasoning={[
              analysis.recommendationReasoning,
              `Best Mandi Option: ${analysis.bestImmediateMandiName} (Current Net: ₹${analysis.currentNetRealizationPerKg.toFixed(2)}/kg)`,
              `Storage Option: ${analysis.warehouseName} (Projected Rate: ₹${analysis.projectedFuturePricePerKg.toFixed(2)}/kg after ${analysis.recommendedStorageDays} days)`,
            ]}
            actionLabel={analysis.recommendation === 'STORE' ? 'Book Cold Storage' : 'Sell at Mandi Now'}
            onAction={() => navigate(analysis.recommendation === 'STORE' ? '/farmer/storage' : '/farmer/markets')}
          />

          {/* 3-Way Financial Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Option 1: Sell Immediately */}
            <Card
              className={`p-5 flex flex-col justify-between transition-all ${
                analysis.recommendation === 'SELL_NOW'
                  ? 'ring-2 ring-rose-500 bg-rose-50/20'
                  : 'bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 rounded-lg text-[#2F6B45]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Option A: Sell Today</h3>
                      <span className="text-xs text-gray-500">Immediate Mandi Liquidate</span>
                    </div>
                  </div>
                  {analysis.recommendation === 'SELL_NOW' && (
                    <Badge variant="danger">TOP CHOICE</Badge>
                  )}
                </div>

                <div className="my-4 bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Quoted Price:</span>
                    <span className="font-semibold text-gray-900">₹{analysis.currentQuotedPricePerKg.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Net Realization:</span>
                    <span className="font-semibold text-emerald-700">₹{analysis.currentNetRealizationPerKg.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Target Mandi:</span>
                    <span className="font-medium text-gray-700">{analysis.bestImmediateMandiName}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-gray-500 block">Total Immediate Net Revenue</span>
                  <div className="text-2xl font-bold text-[#173B2A]">
                    ₹{analysis.immediateTotalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <span className="text-[11px] text-gray-400">Zero storage fees & zero cash delay</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant={analysis.recommendation === 'SELL_NOW' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  onClick={() => navigate('/farmer/markets')}
                >
                  Sell at Mandi Now
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Option 2: Store & Hold (Cold Storage) */}
            <Card
              className={`p-5 flex flex-col justify-between transition-all ${
                analysis.recommendation === 'STORE'
                  ? 'ring-2 ring-[#2F6B45] bg-[#F7F5ED]/40 shadow-md'
                  : 'bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-800">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Option B: Store & Hold</h3>
                      <span className="text-xs text-gray-500">Cold Storage for {storageDays} Days</span>
                    </div>
                  </div>
                  {analysis.recommendation === 'STORE' && (
                    <Badge variant="success">RECOMMENDED</Badge>
                  )}
                </div>

                <div className="my-4 bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Projected Price:</span>
                    <span className="font-semibold text-emerald-700">₹{analysis.projectedFuturePricePerKg.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Storage & Handling:</span>
                    <span className="font-semibold text-rose-600">-₹{analysis.storageCostPerKgTotal.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Expected Spoilage:</span>
                    <span className="font-semibold text-amber-700">{analysis.expectedSpoilagePercent.toFixed(1)}% Volume Loss</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 block">Total Stored Net Revenue</span>
                    {analysis.netProfitDeltaIfStored > 0 ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        +₹{analysis.netProfitDeltaIfStored.toLocaleString('en-IN', { maximumFractionDigits: 0 })} EXTRA
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        -₹{Math.abs(analysis.netProfitDeltaIfStored).toLocaleString('en-IN', { maximumFractionDigits: 0 })} LOSS
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-[#173B2A]">
                    ₹{analysis.storedTotalNetRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <span className="text-[11px] text-gray-400">Net after warehouse fees & spoilage</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant={analysis.recommendation === 'STORE' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  onClick={() => navigate('/farmer/storage')}
                >
                  Book Cold Storage
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </Card>

            {/* Option 3: Food Processing Allocation */}
            <Card
              className={`p-5 flex flex-col justify-between transition-all ${
                analysis.recommendation === 'PROCESS'
                  ? 'ring-2 ring-purple-600 bg-purple-50/20'
                  : 'bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-800">
                      <Factory className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Option C: Value-Add</h3>
                      <span className="text-xs text-gray-500">Sell to Agro Processor</span>
                    </div>
                  </div>
                  {analysis.recommendation === 'PROCESS' && (
                    <Badge variant="warning">BEST FOR GRADE C</Badge>
                  )}
                </div>

                <div className="my-4 bg-gray-50 p-3 rounded-lg space-y-2 border border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Processor Payout:</span>
                    <span className="font-semibold text-gray-900">₹{analysis.processorPayoutPerKg.toFixed(2)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Spoilage Risk:</span>
                    <span className="font-semibold text-emerald-700">0% (Instant Buyout)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Target Processor:</span>
                    <span className="font-medium text-gray-700">{analysis.processorName}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-gray-500 block">Total Guaranteed Processing Payout</span>
                  <div className="text-2xl font-bold text-[#173B2A]">
                    ₹{analysis.processingNetRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                  <span className="text-[11px] text-gray-400">Guaranteed contractual buyout</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant={analysis.recommendation === 'PROCESS' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  onClick={() => navigate('/farmer/processing')}
                >
                  Allocate to Processor
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Explainable AI Factor Breakdown */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-[#2F6B45]" />
              <h3 className="text-lg font-bold text-[#173B2A]">Explainable AI Decision Factors</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.keyDrivers.map((driver, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      driver.impact === 'POSITIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : driver.impact === 'NEGATIVE'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {driver.impact === 'POSITIVE' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : driver.impact === 'NEGATIVE' ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : (
                      <HelpCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{driver.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{driver.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Prices updated hourly from Agmarknet & local Mandi WebSockets feed.</span>
              </div>
              <div className="font-mono bg-[#F7F5ED] px-3 py-1 rounded-md border border-[#DCE9D8] text-[#173B2A]">
                Formula: Net Stored Profit = (Usable Volume × Projected Mandi Rate) - Holding Fees
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
