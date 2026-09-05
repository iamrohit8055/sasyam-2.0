import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  MapPin,
  Phone,
  Thermometer,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Star,
  Navigation,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { logisticsService } from '../../services/logisticsService';
import type { Transporter, Shipment } from '../../services/logisticsService';

export const TransportPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'SHIPMENTS' | 'FLEET'>('SHIPMENTS');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [transporters, setTransporters] = useState<Transporter[]>([]);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [bookCropName, setBookCropName] = useState('Tomato (1,500 kg)');
  const [bookQuintals, setBookQuintals] = useState<number>(15);
  const [pickupLocation, setPickupLocation] = useState('Green Valley Farm, Jaunpur');
  const [destinationLocation, setDestinationLocation] = useState('Azadpur Mandi, Delhi');
  const [distanceKm, setDistanceKm] = useState<number>(780);

  useEffect(() => {
    setShipments(logisticsService.getShipments());
    setTransporters(logisticsService.getTransporters());
  }, []);

  const handleOpenBooking = (tr: Transporter) => {
    setSelectedTransporter(tr);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransporter) return;

    logisticsService.bookTransport({
      transporterId: selectedTransporter.id,
      cropName: bookCropName,
      quantityQuintals: bookQuintals,
      pickupLocation,
      destinationLocation,
      distanceKm,
    });

    setShipments(logisticsService.getShipments());
    setIsBookingOpen(false);
    alert(`Transport dispatched! Driver ${selectedTransporter.driverName} assigned to pickup location.`);
  };

  const activeShipmentsCount = shipments.filter((s) => s.status !== 'DELIVERED').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Agri-Logistics & Fleet Transport</h1>
            <Badge variant="success" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Refrigerated Cold Chain
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Dispatch produce to regional mandis, cold storages, and buyer hubs with verified agricultural transport.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/markets')}>
            <MapPin className="w-4 h-4 mr-1.5 text-emerald-600" />
            Check Mandi Routes
          </Button>
          <Button variant="primary" size="sm" onClick={() => setActiveTab('FLEET')}>
            <Plus className="w-4 h-4 mr-1.5" />
            Dispatch New Freight Shipment
          </Button>
        </div>
      </div>

      {/* Stat Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Freight Shipments"
          value={`${activeShipmentsCount} In-Transit`}
          subtitle="GPS WebSockets Tracked"
          icon={<Truck className="w-5 h-5 text-emerald-700" />}
        />
        <StatCard
          title="Verified Transporter Fleet"
          value={`${transporters.length} Fleet Operators`}
          subtitle="Jaunpur & Varanasi Region"
          icon={<ShieldCheck className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Cold-Chain Quality"
          value="4.2°C Temperature"
          subtitle="Live Sensor Monitored"
          icon={<Thermometer className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Avg Dispatch Time"
          value="< 45 Mins"
          subtitle="Direct Farm Gate Pickup"
          icon={<Clock className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('SHIPMENTS')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'SHIPMENTS'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          Active & Past Freight Shipments ({shipments.length})
        </button>
        <button
          onClick={() => setActiveTab('FLEET')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'FLEET'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Available Transporter Fleet ({transporters.length})
        </button>
      </div>

      {/* TAB 1: SHIPMENTS */}
      {activeTab === 'SHIPMENTS' && (
        <div className="space-y-4">
          {shipments.length === 0 ? (
            <Card className="p-8 text-center bg-white border border-gray-200">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No Freight Shipments Booked Yet</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                You haven't dispatched any produce shipments yet.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('FLEET')}>
                Book Transporter Fleet
              </Button>
            </Card>
          ) : (
            shipments.map((shp) => (
              <Card key={shp.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {shp.trackingNumber}
                      </span>
                      <Badge variant={shp.status === 'IN_TRANSIT' ? 'success' : 'warning'}>
                        {shp.status.replace('_', ' ')}
                      </Badge>
                      {shp.refrigerated && (
                        <Badge variant="brand" className="text-[10px]">
                          COLD CHAIN
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#173B2A]">{shp.cropName}</h3>
                      <p className="text-sm text-gray-600">
                        Carrier: <span className="font-semibold text-gray-900">{shp.transporterName}</span> ({shp.vehicleNumber})
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="truncate"><strong>From:</strong> {shp.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Navigation className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="truncate"><strong>To:</strong> {shp.destinationLocation} ({shp.distanceKm} km)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <span className="flex items-center gap-1 text-gray-700 font-medium">
                        Driver: {shp.driverName} ({shp.driverPhone})
                      </span>
                      {shp.temperatureReading && (
                        <span className="flex items-center gap-1 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                          <Thermometer className="w-3.5 h-3.5" />
                          Cold Temp: {shp.temperatureReading}
                        </span>
                      )}
                      {shp.currentLocation && (
                        <span className="text-emerald-700 font-semibold">
                          Loc: {shp.currentLocation}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-gray-500 block">Total Freight Fare</span>
                      <span className="text-2xl font-extrabold text-[#173B2A]">
                        ₹{shp.totalFreightCost.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/farmer/transport/${shp.id}`)}
                    >
                      <Navigation className="w-3.5 h-3.5 mr-1" />
                      Track Live GPS Map
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* TAB 2: FLEET DIRECTORY */}
      {activeTab === 'FLEET' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transporters.map((tr) => (
            <Card key={tr.id} className="p-5 bg-white border border-gray-200 flex flex-col justify-between hover:border-[#2F6B45] transition-all shadow-sm">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-[#173B2A]">{tr.companyName}</h3>
                    <p className="text-xs text-gray-500">{tr.location}</p>
                  </div>
                  <Badge variant={tr.refrigerated ? 'success' : 'neutral'}>
                    {tr.refrigerated ? 'COLD REEFER' : 'DRY FREIGHT'}
                  </Badge>
                </div>

                <div className="my-3 bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Vehicle Type:</span>
                    <span className="font-bold text-gray-900">{tr.vehicleType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Payload Capacity:</span>
                    <span className="font-semibold text-emerald-700">{tr.capacityQuintals} Quintals ({tr.capacityQuintals * 100} kg)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Freight Rate:</span>
                    <span className="font-bold text-[#173B2A]">₹{tr.baseRatePerKm}/km + ₹{tr.perQuintalRatePerKm}/Qtl/km</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 pt-1 border-t border-gray-200">
                    <span>Vehicle Reg:</span>
                    <span className="font-mono text-gray-800">{tr.vehicleNumber}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {tr.rating} ({tr.totalTrips} Trips)
                  </span>
                  <span>Driver: {tr.driverName}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {tr.driverPhone}
                </span>
                <Button variant="primary" size="sm" onClick={() => handleOpenBooking(tr)}>
                  Book Freight Dispatch
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dispatch Booking Modal */}
      {isBookingOpen && selectedTransporter && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Book Freight Dispatch</h3>
                <p className="text-xs text-gray-500">{selectedTransporter.companyName} ({selectedTransporter.vehicleNumber})</p>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Crop & Volume Details</label>
                <input
                  type="text"
                  value={bookCropName}
                  onChange={(e) => setBookCropName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Payload (Quintals)</label>
                  <input
                    type="number"
                    min={1}
                    max={selectedTransporter.capacityQuintals}
                    value={bookQuintals}
                    onChange={(e) => setBookQuintals(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">= {bookQuintals * 100} kg</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Route Distance (km)</label>
                  <input
                    type="number"
                    min={5}
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Pickup Address (Farm / Warehouse)</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Destination Address (Mandi / Buyer Hub)</label>
                <input
                  type="text"
                  value={destinationLocation}
                  onChange={(e) => setDestinationLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Base Distance Fare ({distanceKm} km @ ₹{selectedTransporter.baseRatePerKm}/km):</span>
                  <span>₹{(distanceKm * selectedTransporter.baseRatePerKm).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Weight Surcharge ({bookQuintals} Qtl @ ₹{selectedTransporter.perQuintalRatePerKm}/Qtl/km):</span>
                  <span>₹{(distanceKm * bookQuintals * selectedTransporter.perQuintalRatePerKm).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#173B2A] pt-2 border-t border-[#DCE9D8]">
                  <span>Total Calculated Freight Fare:</span>
                  <span>
                    ₹{logisticsService.calculateFreight(selectedTransporter.id, distanceKm, bookQuintals).totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Booking & Dispatch Fleet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
