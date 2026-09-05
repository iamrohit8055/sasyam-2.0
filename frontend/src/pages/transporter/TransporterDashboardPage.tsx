import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  MapPin,
  Navigation,
  CheckCircle2,
  Star,
  Thermometer,
  Radio,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { transporterDashboardService } from '../../services/transporterDashboardService';
import type { PickupJob } from '../../services/transporterDashboardService';
import { logisticsService } from '../../services/logisticsService';
import type { Shipment } from '../../services/logisticsService';

export const TransporterDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<PickupJob[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [summary, setSummary] = useState({
    totalEarnings: 148390,
    activeVehiclesCount: 1,
    completedTripsCount: 184,
    onTimeRating: 4.9,
  });

  // Accept Job Modal State
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<PickupJob | null>(null);
  const [assignVehicle, setAssignVehicle] = useState('UP 62 AT 4921 (Reefer Van)');
  const [assignDriver, setAssignDriver] = useState('Ramesh Singh');

  useEffect(() => {
    setJobs(transporterDashboardService.getAvailableJobs());
    setShipments(logisticsService.getShipments());
    setSummary(transporterDashboardService.getSummary());
  }, []);

  const handleOpenAccept = (job: PickupJob) => {
    setSelectedJob(job);
    setIsAcceptOpen(true);
  };

  const handleConfirmAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    transporterDashboardService.acceptJob(selectedJob.id, assignVehicle, assignDriver);
    setJobs(transporterDashboardService.getAvailableJobs());
    setShipments(logisticsService.getShipments());
    setIsAcceptOpen(false);
    alert(`Pickup Job #${selectedJob.id} accepted! Assigned driver ${assignDriver} notified.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Transporter Fleet Operator Portal</h1>
            <Badge variant="success" className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              GPS & IoT Active
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Accept farm pickup requests, monitor cold-chain reefer temperatures, and track active deliveries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/transport')}>
            <Truck className="w-4 h-4 mr-1.5 text-emerald-600" />
            Transporter Network
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Freight Earnings"
          value={`₹${summary.totalEarnings.toLocaleString('en-IN')}`}
          subtitle="SASYAM Escrow Guaranteed"
          icon={<Truck className="w-5 h-5 text-emerald-700" />}
        />
        <StatCard
          title="Active Fleet Vehicles"
          value={`${summary.activeVehiclesCount} On Road`}
          subtitle="Live Cold-Chain GPS Tracking"
          icon={<Navigation className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Completed Deliveries"
          value={`${summary.completedTripsCount} Trips`}
          subtitle="99.2% On-Time Record"
          icon={<CheckCircle2 className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Fleet Rating"
          value={`${summary.onTimeRating} ★`}
          subtitle="Verified Driver Network"
          icon={<Star className="w-5 h-5 text-amber-500 fill-amber-400" />}
        />
      </div>

      {/* SECTION 1: ACTIVE DISPATCHES */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2F6B45]" />
            <h3 className="text-lg font-bold text-[#173B2A]">Active Freight Dispatches</h3>
          </div>
          <Badge variant="brand">LIVE WEBSOCKETS</Badge>
        </div>

        {shipments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">No active shipments in transit.</p>
        ) : (
          shipments.map((shp) => (
            <div key={shp.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {shp.trackingNumber}
                  </span>
                  <Badge variant="success">{shp.status.replace('_', ' ')}</Badge>
                  {shp.temperatureReading && (
                    <Badge variant="info" className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-blue-600" />
                      {shp.temperatureReading}
                    </Badge>
                  )}
                </div>
                <h4 className="font-bold text-base text-[#173B2A]">{shp.cropName}</h4>
                <p className="text-xs text-gray-600">
                  {shp.pickupLocation} → <span className="font-bold text-gray-900">{shp.destinationLocation} ({shp.distanceKm} km)</span>
                </p>
                <span className="text-xs text-gray-400 block">
                  Driver: {shp.driverName} • Vehicle: {shp.vehicleNumber}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right mr-2 hidden sm:block">
                  <span className="text-xs text-gray-500 block">Freight Fare</span>
                  <span className="text-lg font-bold text-[#173B2A]">₹{shp.totalFreightCost.toLocaleString('en-IN')}</span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/farmer/transport/${shp.id}`)}
                >
                  <Navigation className="w-3.5 h-3.5 mr-1" />
                  View GPS Map
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

      {/* SECTION 2: OPEN PICKUP JOBS BOARD */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-[#173B2A]">Available Farm Pickup Jobs</h3>
          </div>
          <Badge variant="neutral">Open Opportunities</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.filter((j) => j.status === 'OPEN').map((job) => (
            <div key={job.id} className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#2F6B45] transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-base text-[#173B2A]">{job.cropName}</h4>
                  <Badge variant="warning">₹{job.offeredFreightFare.toLocaleString('en-IN')}</Badge>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 my-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate"><strong>Pickup:</strong> {job.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate"><strong>Drop:</strong> {job.destinationLocation} ({job.distanceKm} km)</span>
                  </div>
                  <div className="flex justify-between pt-1 text-gray-500 border-t border-gray-200">
                    <span>Requested Fleet: {job.requestedVehicleType}</span>
                    <span>Pickup: {job.pickupDate}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center"
                onClick={() => handleOpenAccept(job)}
              >
                Accept Freight Job & Assign Driver
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Accept Job Modal */}
      {isAcceptOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Accept Pickup Job #{selectedJob.id}</h3>
                <p className="text-xs text-gray-500">{selectedJob.cropName} ({selectedJob.distanceKm} km)</p>
              </div>
              <button
                onClick={() => setIsAcceptOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAccept} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Assign Fleet Vehicle</label>
                <select
                  value={assignVehicle}
                  onChange={(e) => setAssignVehicle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                >
                  <option value="UP 62 AT 4921 (Reefer Cold Van)">UP 62 AT 4921 (Reefer Cold Van)</option>
                  <option value="UP 65 CT 8812 (Mini-Truck)">UP 65 CT 8812 (Mini-Truck)</option>
                  <option value="UP 50 B 9901 (10-Ton Lorry)">UP 50 B 9901 (10-Ton Lorry)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Assign Driver</label>
                <input
                  type="text"
                  value={assignDriver}
                  onChange={(e) => setAssignDriver(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Guaranteed Freight Payout:</span>
                  <span className="font-extrabold text-[#173B2A] text-sm">
                    ₹{selectedJob.offeredFreightFare.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 block">Funds locked in SASYAM Escrow, released instantly upon gate drop pass.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAcceptOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Acceptance & Dispatch Driver
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
