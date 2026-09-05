import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Truck,
  Phone,
  Thermometer,
  Clock,
  ShieldCheck,
  Navigation,
  QrCode,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { logisticsService } from '../../services/logisticsService';
import type { Shipment } from '../../services/logisticsService';

export const TransportTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    const list = logisticsService.getShipments();
    const found = list.find((s) => s.id === id) || list[0];
    setShipment(found || null);
  }, [id]);

  if (!shipment) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Shipment Not Found</h3>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/farmer/transport')}>
          Back to Transport Management
        </Button>
      </div>
    );
  }

  const checkpoints = [
    { label: 'Farm Pickup Point', location: shipment.pickupLocation, time: '04:30 AM', status: 'COMPLETED' },
    { label: 'Lucknow Ring Road Bypass', location: 'NH-27 Junction, Lucknow', time: '08:15 AM', status: 'COMPLETED' },
    { label: 'Expressway Telemetry Gateway', location: shipment.currentLocation || 'Agra-Lucknow Exp (Km 210)', time: 'CURRENT (62 km/h)', status: 'ACTIVE' },
    { label: 'Destination Mandi Gate', location: shipment.destinationLocation, time: 'ETA 08:00 PM', status: 'PENDING' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/farmer/transport')}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#173B2A] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Transport Overview
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">
              Live GPS Tracking: {shipment.trackingNumber}
            </h1>
            <Badge variant="success" className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              LIVE WEBSOCKETS TELEMETRY
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Real-time GPS route progress, cold-chain temperature telemetry, and digital e-Way Bill gate pass.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => alert(`Calling Driver ${shipment.driverName} at ${shipment.driverPhone}...`)}>
            <Phone className="w-4 h-4 mr-1.5 text-emerald-600" />
            Call Driver ({shipment.driverName})
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Consignment Cargo"
          value={shipment.cropName}
          subtitle={`${shipment.quantityQuintals} Quintals (${shipment.quantityQuintals * 100} kg)`}
          icon={<Truck className="w-5 h-5 text-emerald-700" />}
        />
        <StatCard
          title="Reefer Cold Temp"
          value={shipment.temperatureReading || '4.2°C'}
          subtitle="Optimal (Range: 2°C - 5°C)"
          icon={<Thermometer className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Vehicle Plate"
          value={shipment.vehicleNumber}
          subtitle={shipment.vehicleType}
          icon={<ShieldCheck className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Estimated Arrival (ETA)"
          value="Today, 08:00 PM"
          subtitle="273 km remaining"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Main GPS Route Visualizer Banner */}
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-[#173B2A]">GPS Live Route Checkpoints</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Current Speed: 62 km/h • GPS Signal: Excellent
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#2F6B45] via-emerald-500 to-emerald-400 h-full w-[65%] rounded-full transition-all duration-500 relative">
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full animate-ping" />
          </div>
        </div>

        {/* Checkpoint Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {checkpoints.map((cp, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                cp.status === 'ACTIVE'
                  ? 'bg-emerald-50 border-emerald-300 ring-2 ring-[#2F6B45]'
                  : cp.status === 'COMPLETED'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-white border-dashed border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-gray-400">Step {idx + 1}</span>
                {cp.status === 'COMPLETED' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : cp.status === 'ACTIVE' ? (
                  <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-300" />
                )}
              </div>
              <h4 className="font-bold text-sm text-[#173B2A]">{cp.label}</h4>
              <p className="text-xs text-gray-600 mt-1 truncate">{cp.location}</p>
              <span className="text-[11px] font-semibold text-emerald-700 mt-2 block">{cp.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Grid: Telemetry & e-Way Bill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cold Chain IoT Sensor Telemetry */}
        <Card className="p-6 bg-white border border-gray-200 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-[#173B2A]">Cold Chain Climate Telemetry</h3>
            </div>
            <Badge variant="success">IOT SENSOR SYNCED</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
              <span className="text-xs text-blue-800 font-semibold block">Reefer Container Temp</span>
              <div className="text-3xl font-extrabold text-blue-900 mt-1">4.2°C</div>
              <span className="text-[11px] text-blue-600 mt-1 block">Threshold Safety: 2.0°C – 5.0°C</span>
            </div>

            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-800 font-semibold block">Relative Humidity</span>
              <div className="text-3xl font-extrabold text-emerald-900 mt-1">88%</div>
              <span className="text-[11px] text-emerald-600 mt-1 block">Controlled Moisture Level</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Sensor Device ID:</span>
              <span className="font-mono text-gray-800">IOT-REEFER-9921</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Battery Status:</span>
              <span className="font-semibold text-emerald-700">98% (Solar Aux Powered)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Telemetry Ping:</span>
              <span className="font-medium text-gray-700">Just now (10 sec ago)</span>
            </div>
          </div>
        </Card>

        {/* Digital e-Way Bill & Mandi Gate Pass */}
        <Card className="p-6 bg-white border border-gray-200 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-[#173B2A]">Digital e-Way Bill & Gate Pass</h3>
            </div>
            <Badge variant="brand">WDRA VERIFIED</Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8]">
            <div className="w-24 h-24 bg-white p-2 rounded-lg border border-gray-300 flex items-center justify-center flex-shrink-0">
              {/* Simulated QR Code SVG */}
              <div className="w-full h-full bg-gray-900 p-1 flex flex-wrap gap-1">
                <div className="w-3 h-3 bg-white" />
                <div className="w-3 h-3 bg-white" />
                <div className="w-3 h-3 bg-gray-900" />
                <div className="w-3 h-3 bg-white" />
                <div className="w-3 h-3 bg-gray-900" />
                <div className="w-3 h-3 bg-white" />
                <div className="w-3 h-3 bg-white" />
                <div className="w-3 h-3 bg-gray-900" />
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-700">
              <div className="font-mono text-xs font-bold text-[#173B2A]">
                Pass ID: GP-2026-9901
              </div>
              <div>Consignment: {shipment.cropName}</div>
              <div>Destination: {shipment.destinationLocation}</div>
              <div>Freight Fare: ₹{shipment.totalFreightCost.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">
                Scan at Mandi Gate Scanner for Instant Entry
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => alert('Downloading official PDF e-Way Bill for Mandi Gate Officers...')}
          >
            Download PDF Gate Pass
          </Button>
        </Card>
      </div>
    </div>
  );
};
