import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Star,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { logisticsService } from '../../services/logisticsService';
import type { Transporter } from '../../services/logisticsService';

export const TransporterFleetPage: React.FC = () => {
  const [fleet, setFleet] = useState<Transporter[]>([]);

  useEffect(() => {
    setFleet(logisticsService.getTransporters());
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Transporter Fleet & Vehicle Management</h1>
            <Badge variant="success" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              COMMERCIAL PERMIT VERIFIED
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Manage your agricultural vehicle fleet, calibrate cold-chain reefer sensors, and assign drivers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => alert('Add New Vehicle Modal...')}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Vehicle to Fleet
          </Button>
        </div>
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fleet.map((item) => (
          <Card key={item.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="brand" className="font-mono text-xs">
                  {item.vehicleNumber}
                </Badge>
                <Badge variant={item.refrigerated ? 'success' : 'neutral'}>
                  {item.refrigerated ? 'COLD REEFER' : 'DRY FREIGHT'}
                </Badge>
              </div>

              <h3 className="font-bold text-lg text-[#173B2A]">{item.companyName}</h3>
              <p className="text-xs text-gray-500">{item.vehicleType.replace('_', ' ')} • Payload: {item.capacityQuintals} Qtl</p>

              <div className="my-3 bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Freight Rate:</span>
                  <span className="font-bold text-gray-900">₹{item.baseRatePerKm} / km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight Surcharge:</span>
                  <span className="font-bold text-gray-900">₹{item.perQuintalRatePerKm} / Qtl / km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Driver Name:</span>
                  <span className="font-semibold text-emerald-800">{item.driverName}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {item.rating} ({item.totalTrips} Trips)
              </span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                OPERATIONAL
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
