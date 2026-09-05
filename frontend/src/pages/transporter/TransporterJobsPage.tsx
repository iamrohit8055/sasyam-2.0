import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  MapPin,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { transporterDashboardService } from '../../services/transporterDashboardService';
import type { PickupJob } from '../../services/transporterDashboardService';

export const TransporterJobsPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<PickupJob[]>([]);

  useEffect(() => {
    setJobs(transporterDashboardService.getAvailableJobs());
  }, []);

  const openJobsCount = jobs.filter((j) => j.status === 'OPEN').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Farm Freight Pickup Jobs Board</h1>
            <Badge variant="warning" className="flex items-center gap-1">
              {openJobsCount} OPEN JOBS AVAILABLE
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Discover regional agricultural transport jobs, accept pickup requests, and earn guaranteed freight fares.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/transporter/dashboard')}>
            <Truck className="w-4 h-4 mr-1.5 text-emerald-600" />
            Transporter Dashboard
          </Button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge variant="brand" className="text-[10px]">
                    JOB #{job.id}
                  </Badge>
                  <h3 className="font-bold text-lg text-[#173B2A] mt-1">{job.cropName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Offered Fare</span>
                  <span className="text-xl font-extrabold text-[#173B2A]">
                    ₹{job.offeredFreightFare.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="my-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-800">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Pickup Point:</strong> {job.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Navigation className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span><strong>Destination:</strong> {job.destinationLocation} ({job.distanceKm} km)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 text-gray-500">
                  <span>Required Fleet: {job.requestedVehicleType}</span>
                  <span>Pickup Date: {job.pickupDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <Badge variant={job.status === 'OPEN' ? 'success' : 'neutral'}>
                {job.status}
              </Badge>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/transporter/dashboard')}
              >
                Accept Freight Job
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
