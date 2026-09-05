import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  Plus,
  Clock,
  Zap,
  Package,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { processorDashboardService } from '../../services/processorDashboardService';
import type { ProcessorFacilitySummary } from '../../services/processorDashboardService';
import type { ProcessingRequirement, ProcessingContract } from '../../services/processingService';

export const ProcessorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<ProcessorFacilitySummary | null>(null);
  const [requirements, setRequirements] = useState<ProcessingRequirement[]>([]);
  const [contracts, setContracts] = useState<ProcessingContract[]>([]);

  // Publish Demand Modal State
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [targetCrop, setTargetCrop] = useState('Tomato');
  const [requiredGrade, setRequiredGrade] = useState<'Grade A' | 'Grade B' | 'Grade C' | 'ANY'>('Grade B');
  const [endProduct, setEndProduct] = useState('Tomato Puree & Sauce');
  const [contractPrice, setContractPrice] = useState<number>(23.0);
  const [minBatch, setMinBatch] = useState<number>(500);
  const [maxBatch] = useState<number>(10000);

  useEffect(() => {
    setSummary(processorDashboardService.getSummary());
    setRequirements(processorDashboardService.getRequirements());
    setContracts(processorDashboardService.getContracts());
  }, []);

  const handlePublishDemand = (e: React.FormEvent) => {
    e.preventDefault();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 14);

    const newReq: ProcessingRequirement = {
      id: 'proc_' + Date.now(),
      processorName: summary ? summary.facilityName : 'Varanasi Processing Cluster',
      facilityLocation: summary ? summary.location : 'Varanasi, UP',
      targetCrop,
      requiredGrade,
      endProduct,
      contractPricePerKg: contractPrice,
      minBatchQuantityKg: minBatch,
      maxBatchQuantityKg: maxBatch,
      deliveryDeadline: expiry.toISOString().split('T')[0],
      paymentTerms: 'Instant Gate Check Payout (T+0)',
      isHighDemand: true,
      contactPhone: '+91 94150 12345',
    };

    setRequirements([newReq, ...requirements]);
    setIsPublishOpen(false);
    alert(`Processing demand for ${targetCrop} published to regional farmers!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Food Processing Facility Command Portal</h1>
            <Badge variant="warning" className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Direct Factory Sourcing
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Source Grade B & Grade C produce directly from regional farmers for ketchup, chips, and dehydration manufacturing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/processing')}>
            <Factory className="w-4 h-4 mr-1.5 text-purple-700" />
            Processing Contracts Portal
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsPublishOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Publish Raw Material Demand
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Contracted Produce Volume"
            value={`${summary.totalContractedVolumeKg.toLocaleString('en-IN')} kg`}
            subtitle="Raw Material Sourced"
            icon={<Package className="w-5 h-5 text-purple-700" />}
          />
          <StatCard
            title="Active Farmer Allocations"
            value={`${summary.activeContractsCount} Contracts`}
            subtitle="Grade B & C Certified"
            icon={<FileCheck className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Gate Payouts Released"
            value={`₹${summary.totalPayoutsReleased.toLocaleString('en-IN')}`}
            subtitle="Instant T+0 Release"
            icon={<Zap className="w-5 h-5 text-amber-500" />}
          />
          <StatCard
            title="Yield Efficiency Rate"
            value={`${summary.yieldEfficiencyPercent}%`}
            subtitle="Value-Add Production"
            icon={<TrendingUp className="w-5 h-5 text-[#2F6B45]" />}
          />
        </div>
      )}

      {/* SECTION 1: FARMER ALLOCATIONS */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#2F6B45]" />
            <h3 className="text-lg font-bold text-[#173B2A]">Active Farmer Supply Contracts</h3>
          </div>
          <Badge variant="brand">GATE VERIFIED</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F5ED] text-xs uppercase font-bold text-[#173B2A]">
              <tr>
                <th className="p-3 rounded-l-lg">Contract ID</th>
                <th className="p-3">Processor Facility</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Contract Rate</th>
                <th className="p-3">Total Value</th>
                <th className="p-3 text-right rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3 font-mono text-xs font-bold text-emerald-800">
                    {c.id}
                  </td>
                  <td className="p-3 font-semibold text-gray-900">{c.processorName}</td>
                  <td className="p-3 text-gray-800">{c.cropName}</td>
                  <td className="p-3 font-bold text-gray-900">{c.allocatedQuantityKg.toLocaleString('en-IN')} kg</td>
                  <td className="p-3 font-semibold text-emerald-700">₹{c.contractPricePerKg.toFixed(2)}/kg</td>
                  <td className="p-3 font-extrabold text-[#173B2A]">₹{c.totalValue.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right">
                    <Badge variant="success">{c.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SECTION 2: PUBLISHED DEMANDS */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-purple-700" />
            <h3 className="text-lg font-bold text-[#173B2A]">Published Raw Produce Demands</h3>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsPublishOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Publish New Requirement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-[#173B2A]">
                    {req.targetCrop} ({req.requiredGrade})
                  </span>
                  <Badge variant="warning">₹{req.contractPricePerKg.toFixed(2)} / kg</Badge>
                </div>
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div className="flex justify-between">
                    <span>End Product:</span>
                    <span className="font-semibold text-purple-700">{req.endProduct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Batch Quantity Limits:</span>
                    <span className="font-medium text-gray-800">{req.minBatchQuantityKg.toLocaleString()} kg – {req.maxBatchQuantityKg.toLocaleString()} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payout Terms:</span>
                    <span className="font-bold text-emerald-700">{req.paymentTerms}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Deadline: {req.deliveryDeadline}
                </span>
                <span className="text-emerald-700 font-semibold cursor-pointer hover:underline" onClick={() => alert(`Reviewing farmer allocations for ${req.targetCrop}...`)}>
                  Manage Allocations
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Publish Demand Modal */}
      {isPublishOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Publish Raw Produce Demand</h3>
                <p className="text-xs text-gray-500">Contract directly with regional farmers for food manufacturing</p>
              </div>
              <button
                onClick={() => setIsPublishOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublishDemand} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Target Crop</label>
                  <select
                    value={targetCrop}
                    onChange={(e) => setTargetCrop(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Onion">Onion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Required Quality Grade</label>
                  <select
                    value={requiredGrade}
                    onChange={(e) => setRequiredGrade(e.target.value as any)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                    <option value="ANY">ANY Grade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">End Product Name</label>
                <input
                  type="text"
                  value={endProduct}
                  onChange={(e) => setEndProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  placeholder="e.g. Tomato Puree & Ketchup"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Contract Rate (₹/kg)</label>
                  <input
                    type="number"
                    step="0.50"
                    value={contractPrice}
                    onChange={(e) => setContractPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Min Batch Size (kg)</label>
                  <input
                    type="number"
                    min={100}
                    value={minBatch}
                    onChange={(e) => setMinBatch(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-1 text-xs">
                <span className="font-bold text-[#173B2A] block">Instant Gate Payout Terms:</span>
                <span className="text-gray-600 block">Funds released directly to farmer upon gate quality check.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsPublishOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Publish Contract Demand
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
