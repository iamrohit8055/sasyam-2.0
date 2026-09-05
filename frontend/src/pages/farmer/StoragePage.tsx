import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Warehouse as WarehouseIcon,
  ShieldCheck,
  Thermometer,
  Calendar,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  Phone,
  Filter,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { storageService } from '../../services/storageService';
import type { Warehouse, StorageReceipt } from '../../services/storageService';

export const StoragePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'RECEIPTS' | 'DIRECTORY'>('RECEIPTS');
  const [receipts, setReceipts] = useState<StorageReceipt[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [bookingCrop, setBookingCrop] = useState('Potato');
  const [bookingVariety, setBookingVariety] = useState('Kufri Jyoti');
  const [bookingQuintals, setBookingQuintals] = useState<number>(50);
  const [bookingDurationMonths, setBookingDurationMonths] = useState<number>(1);

  useEffect(() => {
    setReceipts(storageService.getStorageReceipts());
    setWarehouses(storageService.getWarehouses());
  }, []);

  const totalQuintals = receipts.reduce((acc, r) => acc + r.quantityQuintals, 0);
  const totalMonthlyFee = receipts.reduce((acc, r) => acc + r.monthlyFee, 0);

  const filteredWarehouses = warehouses.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || w.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleOpenBooking = (wh: Warehouse) => {
    setSelectedWarehouse(wh);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWarehouse) return;

    const monthlyFee = bookingQuintals * selectedWarehouse.ratePerQuintalPerMonth;
    const now = new Date();
    const expiry = new Date();
    expiry.setMonth(now.getMonth() + bookingDurationMonths);

    storageService.bookStorage({
      warehouseId: selectedWarehouse.id,
      warehouseName: selectedWarehouse.name,
      cropName: bookingCrop,
      variety: bookingVariety,
      quantityQuintals: bookingQuintals,
      storedDate: now.toISOString().split('T')[0],
      expectedExpiryDate: expiry.toISOString().split('T')[0],
      monthlyFee,
      spoilageRisk: 'LOW',
      currentTemperature: selectedWarehouse.temperatureRange.split('-')[0] || '4°C',
    });

    setReceipts(storageService.getStorageReceipts());
    setIsBookingOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">Storage & Warehouse Management</h1>
            <Badge variant="success" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              WDRA Accredited
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Book certified cold storage, track Electronic Negotiable Warehouse Receipts (eNWR), and monitor climate logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/sell-decision')}>
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
            AI Sell vs Store Decision
          </Button>
          <Button variant="primary" size="sm" onClick={() => setActiveTab('DIRECTORY')}>
            <Plus className="w-4 h-4 mr-1.5" />
            Book Warehouse Capacity
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Storage Lots"
          value={`${receipts.length} Lots`}
          subtitle="eNWR Verified"
          icon={<WarehouseIcon className="w-5 h-5" />}
        />
        <StatCard
          title="Total Stored Quantity"
          value={`${totalQuintals} Quintals`}
          subtitle={`~${(totalQuintals * 100).toLocaleString('en-IN')} kg stored`}
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Monthly Holding Fee"
          value={`₹${totalMonthlyFee.toLocaleString('en-IN')}`}
          subtitle="Avg ₹120/Quintal/mo"
          icon={<Thermometer className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title="Warehouse Network"
          value={`${warehouses.length} Facilities`}
          subtitle="Jaunpur & Varanasi Region"
          icon={<Calendar className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('RECEIPTS')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'RECEIPTS'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Active Storage Receipts (eNWR) ({receipts.length})
        </button>
        <button
          onClick={() => setActiveTab('DIRECTORY')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'DIRECTORY'
              ? 'border-[#2F6B45] text-[#2F6B45]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <WarehouseIcon className="w-4 h-4" />
          Warehouse & Cold Storage Directory ({warehouses.length})
        </button>
      </div>

      {/* TAB 1: RECEIPTS */}
      {activeTab === 'RECEIPTS' && (
        <div className="space-y-4">
          {receipts.length === 0 ? (
            <Card className="p-8 text-center bg-white border border-gray-200">
              <WarehouseIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No Active Storage Receipts</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                You haven't stored any produce lots in accredited warehouses yet.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('DIRECTORY')}>
                Browse Regional Cold Storage Facilities
              </Button>
            </Card>
          ) : (
            receipts.map((rcpt) => (
              <Card key={rcpt.id} className="p-5 bg-white border border-gray-200 hover:border-[#2F6B45] transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {rcpt.receiptNumber}
                      </span>
                      <Badge variant="success">ACTIVE LOT</Badge>
                      <Badge variant="neutral" className="text-xs">WDRA VERIFIED</Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#173B2A]">{rcpt.warehouseName}</h3>
                      <p className="text-sm text-gray-600">
                        {rcpt.cropName} ({rcpt.variety}) — <span className="font-bold text-gray-900">{rcpt.quantityQuintals} Quintals ({rcpt.quantityQuintals * 100} kg)</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Stored: {rcpt.storedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Safe Till: {rcpt.expectedExpiryDate}
                      </span>
                      {rcpt.currentTemperature && (
                        <span className="flex items-center gap-1 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                          <Thermometer className="w-3.5 h-3.5" />
                          Climate: {rcpt.currentTemperature}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-gray-500 block">Monthly Storage Charge</span>
                      <span className="text-xl font-bold text-[#173B2A]">
                        ₹{rcpt.monthlyFee.toLocaleString('en-IN')}/mo
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate('/farmer/sell-decision')}>
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
                        Evaluate Sell Now
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => navigate('/farmer/markets')}>
                        Release & Sell
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* TAB 2: DIRECTORY & BOOKING */}
      {activeTab === 'DIRECTORY' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <Card className="p-4 bg-white border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search warehouse by name or location (e.g. Jaunpur, Varanasi)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6B45] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none"
                >
                  <option value="ALL">All Types</option>
                  <option value="COLD_STORAGE">Cold Storage</option>
                  <option value="DRY_WAREHOUSE">Dry Warehouse</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWarehouses.map((wh) => (
              <Card key={wh.id} className="p-5 bg-white border border-gray-200 flex flex-col justify-between hover:border-[#2F6B45] transition-all">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#173B2A]">{wh.name}</h3>
                      <p className="text-xs text-gray-500">{wh.location} • {wh.distanceKm} km away</p>
                    </div>
                    {wh.isWdraAccredited && (
                      <Badge variant="success" className="text-[10px]">
                        WDRA ACCREDITED
                      </Badge>
                    )}
                  </div>

                  <div className="my-3 grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block">Rate / Quintal / Month</span>
                      <span className="font-bold text-[#173B2A] text-sm">₹{wh.ratePerQuintalPerMonth}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Available Capacity</span>
                      <span className="font-bold text-emerald-700 text-sm">
                        {wh.availableCapacityQuintals.toLocaleString()} Qtl
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Temperature Control</span>
                      <span className="font-medium text-gray-800">{wh.temperatureRange}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Humidity Control</span>
                      <span className="font-medium text-gray-800">{wh.humidityRange}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{wh.contactPhone}</span>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => handleOpenBooking(wh)}>
                    Book Capacity
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Storage Booking Modal */}
      {isBookingOpen && selectedWarehouse && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Book Storage Capacity</h3>
                <p className="text-xs text-gray-500">{selectedWarehouse.name}</p>
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
                <label className="block text-xs font-semibold text-gray-600 mb-1">Crop Name</label>
                <select
                  value={bookingCrop}
                  onChange={(e) => setBookingCrop(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                >
                  <option value="Potato">Potato</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                  <option value="Wheat">Wheat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Variety</label>
                <input
                  type="text"
                  value={bookingVariety}
                  onChange={(e) => setBookingVariety(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  placeholder="e.g. Kufri Jyoti"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Volume (Quintals)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={selectedWarehouse.availableCapacityQuintals}
                    value={bookingQuintals}
                    onChange={(e) => setBookingQuintals(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    = {bookingQuintals * 100} kg
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Duration (Months)
                  </label>
                  <select
                    value={bookingDurationMonths}
                    onChange={(e) => setBookingDurationMonths(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value={1}>1 Month</option>
                    <option value={2}>2 Months</option>
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Monthly Holding Rate:</span>
                  <span className="font-semibold text-gray-900">₹{selectedWarehouse.ratePerQuintalPerMonth} / Quintal / Month</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Estimated Monthly Fee:</span>
                  <span className="font-bold text-[#173B2A]">
                    ₹{(bookingQuintals * selectedWarehouse.ratePerQuintalPerMonth).toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-[#DCE9D8]">
                  <span className="text-gray-600">Initial Deposit (25%):</span>
                  <span className="font-bold text-emerald-700">
                    ₹{(bookingQuintals * selectedWarehouse.ratePerQuintalPerMonth * 0.25).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Booking & Issue eNWR
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
