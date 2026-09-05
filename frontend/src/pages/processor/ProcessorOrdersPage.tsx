import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  FileCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { processorDashboardService } from '../../services/processorDashboardService';
import type { ProcessingContract } from '../../services/processingService';

export const ProcessorOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<ProcessingContract[]>([]);

  useEffect(() => {
    setContracts(processorDashboardService.getContracts());
  }, []);

  const totalValue = contracts.reduce((sum, c) => sum + c.totalValue, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Food Processor Supply Contracts & Orders</h1>
            <Badge variant="warning" className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Gate Check Verified Payouts
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Monitor raw produce supply allocations from farmers, inspect plant gate quality checks, and release payouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/processor/dashboard')}>
            <Factory className="w-4 h-4 mr-1.5 text-purple-700" />
            Processor Dashboard
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Supply Contracts"
          value={`${contracts.length} Allocations`}
          subtitle="Grade B & Grade C Produce"
          icon={<FileCheck className="w-5 h-5 text-purple-700" />}
        />
        <StatCard
          title="Total Contract Value"
          value={`₹${totalValue.toLocaleString('en-IN')}`}
          subtitle="Instant Gate Payout"
          icon={<Zap className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          title="Quality Pass Rate"
          value="100% Passed"
          subtitle="Zero Spoilage Rejections"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        />
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {contract.id}
                  </span>
                  <Badge variant="success">{contract.status}</Badge>
                </div>

                <h3 className="text-lg font-bold text-[#173B2A]">{contract.processorName}</h3>

                <p className="text-sm text-gray-600">
                  Target Crop: <span className="font-bold text-gray-900">{contract.cropName}</span> • Quantity:{' '}
                  <span className="font-bold text-gray-900">{contract.allocatedQuantityKg.toLocaleString('en-IN')} kg</span>
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                  <span>Allocated Date: {contract.allocatedDate}</span>
                  <span>Contract Rate: ₹{contract.contractPricePerKg.toFixed(2)}/kg</span>
                </div>
              </div>

              <div className="text-left md:text-right space-y-1">
                <span className="text-xs text-gray-500 block">Total Contract Payout</span>
                <div className="text-2xl font-extrabold text-[#173B2A]">
                  ₹{contract.totalValue.toLocaleString('en-IN')}
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Gate Check Verified
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
