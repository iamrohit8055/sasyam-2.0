import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  FileCheck,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { processingService } from '../../services/processingService';
import type { ProcessingRequirement, ProcessingContract } from '../../services/processingService';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'DEMANDS' | 'MY_CONTRACTS'>('DEMANDS');
  const [requirements, setRequirements] = useState<ProcessingRequirement[]>([]);
  const [farmerContracts, setFarmerContracts] = useState<ProcessingContract[]>([]);

  // Allocation Modal State
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<ProcessingRequirement | null>(null);
  const [allocateCropName, setAllocateCropName] = useState('Tomato');
  const [allocateQuantityKg, setAllocateQuantityKg] = useState<number>(500);

  useEffect(() => {
    setRequirements(processingService.getRequirements());
    setFarmerContracts(processingService.getFarmerContracts());
  }, []);

  const handleOpenAllocation = (req: ProcessingRequirement) => {
    setSelectedRequirement(req);
    setAllocateCropName(req.targetCrop);
    setAllocateQuantityKg(req.minBatchQuantityKg);
    setIsAllocationOpen(true);
  };

  const handleConfirmAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequirement) return;

    processingService.allocateProduce(
      selectedRequirement.id,
      allocateCropName,
      allocateQuantityKg
    );

    setFarmerContracts(processingService.getFarmerContracts());
    setIsAllocationOpen(false);
    alert(`Successfully allocated ${allocateQuantityKg} kg of ${allocateCropName} to ${selectedRequirement.processorName}!`);
  };

  const totalContractValue = farmerContracts.reduce((acc, c) => acc + c.totalValue, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Value-Add Food Processing Contracts</h1>
            <Badge variant="warning" className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Guaranteed Gate Payout
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Monetize Grade B & Grade C produce directly through food processing clusters (sauce, paste, wafers, dehydration).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/sell-decision')}>
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
            AI Decision Engine
          </Button>
          <Button variant="primary" size="sm" onClick={() => setActiveTab('DEMANDS')}>
            <Factory className="w-4 h-4 mr-1.5" />
            Browse Open Processor Demands
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Processor Demands"
          value={`${requirements.length} Open Buyers`}
          subtitle="Tomato, Potato, Onion"
          icon={<Factory className="w-5 h-5 text-purple-700" />}
        />
        <StatCard
          title="My Allocated Contracts"
          value={`${farmerContracts.length} Contracts`}
          subtitle={`Total Value: ₹${totalContractValue.toLocaleString('en-IN')}`}
          icon={<FileCheck className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Spoilage Risk"
          value="0% (Zero Risk)"
          subtitle="Instant buyout at plant gate"
          icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Payment Speed"
          value="T+0 Instant"
          subtitle="Direct UPI / NEFT on gate pass"
          icon={<Zap className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('DEMANDS')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'DEMANDS'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Factory className="w-4 h-4" />
          Open Processor Demands ({requirements.length})
        </button>
        <button
          onClick={() => setActiveTab('MY_CONTRACTS')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'MY_CONTRACTS'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          My Allocated Contracts ({farmerContracts.length})
        </button>
      </div>

      {/* TAB 1: DEMANDS */}
      {activeTab === 'DEMANDS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((req) => (
            <Card
              key={req.id}
              className="p-5 bg-white border border-gray-200 flex flex-col justify-between hover:border-[#2F6B45] transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-[#173B2A]">{req.processorName}</h3>
                    <p className="text-xs text-gray-500">{req.facilityLocation}</p>
                  </div>
                  {req.isHighDemand && (
                    <Badge variant="warning" className="text-[10px]">
                      HIGH DEMAND
                    </Badge>
                  )}
                </div>

                <div className="my-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Target Crop:</span>
                    <span className="font-bold text-gray-900">{req.targetCrop} ({req.requiredGrade})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">End Product:</span>
                    <span className="font-semibold text-purple-700">{req.endProduct}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Contract Rate:</span>
                    <span className="font-extrabold text-[#173B2A] text-sm">₹{req.contractPricePerKg.toFixed(2)} / kg</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-gray-200 text-gray-600">
                    <span>Batch Quantity Limit:</span>
                    <span>{req.minBatchQuantityKg.toLocaleString()} kg – {req.maxBatchQuantityKg.toLocaleString()} kg</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Payout: {req.paymentTerms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Delivery Deadline: {req.deliveryDeadline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {req.contactPhone}
                </span>
                <Button variant="primary" size="sm" onClick={() => handleOpenAllocation(req)}>
                  Allocate Produce Batch
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 2: MY CONTRACTS */}
      {activeTab === 'MY_CONTRACTS' && (
        <div className="space-y-4">
          {farmerContracts.length === 0 ? (
            <Card className="p-8 text-center bg-white border border-gray-200">
              <Factory className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No Processing Contracts Allocated Yet</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                You haven't allocated produce to food processing units yet.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('DEMANDS')}>
                Browse Open Food Processor Demands
              </Button>
            </Card>
          ) : (
            farmerContracts.map((contract) => (
              <Card key={contract.id} className="p-5 bg-white border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{contract.status}</Badge>
                      <span className="text-xs text-gray-400 font-mono">ID: {contract.id}</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#173B2A]">{contract.processorName}</h3>
                    <p className="text-sm text-gray-600">
                      Crop: <span className="font-bold text-gray-900">{contract.cropName}</span> • Quantity:{' '}
                      <span className="font-bold text-gray-900">{contract.allocatedQuantityKg.toLocaleString()} kg</span>
                    </p>
                    <span className="text-xs text-gray-400 block">Allocated Date: {contract.allocatedDate}</span>
                  </div>

                  <div className="text-left md:text-right space-y-1">
                    <span className="text-xs text-gray-500 block">Total Guaranteed Contract Value</span>
                    <div className="text-2xl font-bold text-[#173B2A]">
                      ₹{contract.totalValue.toLocaleString('en-IN')}
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Rate: ₹{contract.contractPricePerKg.toFixed(2)}/kg
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Allocation Modal */}
      {isAllocationOpen && selectedRequirement && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Allocate Produce to Processor</h3>
                <p className="text-xs text-gray-500">{selectedRequirement.processorName}</p>
              </div>
              <button
                onClick={() => setIsAllocationOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAllocation} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Crop Type</label>
                <input
                  type="text"
                  value={allocateCropName}
                  onChange={(e) => setAllocateCropName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 font-bold"
                  readOnly
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-600">Allocate Quantity (kg)</label>
                  <span className="text-xs text-gray-400">
                    Min: {selectedRequirement.minBatchQuantityKg} kg
                  </span>
                </div>
                <input
                  type="number"
                  min={selectedRequirement.minBatchQuantityKg}
                  max={selectedRequirement.maxBatchQuantityKg}
                  value={allocateQuantityKg}
                  onChange={(e) => setAllocateQuantityKg(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Contract Rate:</span>
                  <span className="font-semibold text-gray-900">₹{selectedRequirement.contractPricePerKg.toFixed(2)} / kg</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-[#DCE9D8]">
                  <span className="text-gray-600">Total Payout at Gate Check:</span>
                  <span className="font-extrabold text-[#173B2A] text-sm">
                    ₹{(allocateQuantityKg * selectedRequirement.contractPricePerKg).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAllocationOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Contract Allocation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
