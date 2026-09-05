import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Star,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { marketplaceService } from '../../services/marketplaceService';
import type { MarketplaceListing } from '../../services/marketplaceService';

export const ProduceMarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  const [organicOnlyFilter, setOrganicOnlyFilter] = useState(false);

  // Modals
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  // Farmer New Listing Form State
  const [newCropName, setNewCropName] = useState('Tomato');
  const [newVariety, setNewVariety] = useState('Hybrid Abhilash');
  const [newQuantityKg, setNewQuantityKg] = useState<number>(1500);
  const [newQualityGrade, setNewQualityGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');
  const [newAskingPrice, setNewAskingPrice] = useState<number>(26.5);
  const [newStorageLocation, setNewStorageLocation] = useState('On-Farm Shed');
  const [newIsOrganic, setNewIsOrganic] = useState(true);

  // Buyer Order Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [orderQuantityKg, setOrderQuantityKg] = useState<number>(500);

  useEffect(() => {
    setListings(marketplaceService.getListings());
  }, []);

  const filteredListings = listings.filter((l) => {
    const matchesSearch =
      l.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCropFilter === 'ALL' || l.cropName === selectedCropFilter;
    const matchesOrganic = !organicOnlyFilter || l.isOrganic;
    return matchesSearch && matchesCrop && matchesOrganic && l.status === 'ACTIVE';
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    marketplaceService.createListing({
      farmerId: 'usr_farmer_01',
      farmerName: 'Rajesh Kumar',
      farmerLocation: 'Jaunpur, UP',
      farmerRating: 4.9,
      cropName: newCropName,
      variety: newVariety,
      quantityKg: newQuantityKg,
      qualityGrade: newQualityGrade,
      freshnessPercent: 90,
      askingPricePerKg: newAskingPrice,
      mandiBenchmarkPricePerKg: newAskingPrice * 0.9,
      harvestDate: new Date().toISOString().split('T')[0],
      storageLocation: newStorageLocation,
      isOrganic: newIsOrganic,
    });

    setListings(marketplaceService.getListings());
    setIsListingModalOpen(false);
  };

  const handleOpenOrderModal = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setOrderQuantityKg(Math.min(500, listing.quantityKg));
    setIsOrderModalOpen(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    marketplaceService.placeOrder(
      selectedListing.id,
      buyerName || 'Demo Buyer',
      buyerCompany || 'Varanasi Fresh Mart Ltd',
      orderQuantityKg
    );

    setListings(marketplaceService.getListings());
    setIsOrderModalOpen(false);
    alert(`Order for ${orderQuantityKg} kg of ${selectedListing.cropName} confirmed! Transporter logistics route will be dispatched.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">SASYAM Direct Produce Exchange</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Direct-to-Buyer
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Connect farmers directly with wholesalers, food processors, and retail chains. Zero middleman commission.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/markets')}>
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Mandi Price Index
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsListingModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            List My Harvested Produce
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Produce Listings"
          value={`${filteredListings.length} Batches`}
          subtitle="Verified Grade Quality"
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <StatCard
          title="Avg Farmer Net Realization"
          value="+12.4% Premium"
          subtitle="Over local Mandi bidding"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Quality Assured"
          value="100% Inspected"
          subtitle="Grade A & Grade B Certified"
          icon={<ShieldCheck className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="Payment Guarantee"
          value="SASYAM Escrow"
          subtitle="Instant T+0 Release on Gate Pass"
          icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by crop, farmer name, or location (e.g. Tomato, Jaunpur)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6B45] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Crop:
            </div>
            {['ALL', 'Tomato', 'Potato', 'Onion'].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCropFilter(crop)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCropFilter === crop
                    ? 'bg-[#173B2A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {crop === 'ALL' ? 'All Crops' : crop}
              </button>
            ))}

            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer ml-2 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                checked={organicOnlyFilter}
                onChange={(e) => setOrganicOnlyFilter(e.target.checked)}
                className="accent-[#2F6B45] rounded"
              />
              Organic Certified Only
            </label>
          </div>
        </div>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-gray-200">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-gray-800">No Produce Listings Match Your Filter</h3>
            <p className="text-sm text-gray-500 mt-1">Try clearing filters or search terms.</p>
          </div>
        ) : (
          filteredListings.map((item) => (
            <Card
              key={item.id}
              className="p-5 bg-white border border-gray-200 flex flex-col justify-between hover:border-[#2F6B45] transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#173B2A]">{item.cropName}</h3>
                    <span className="text-xs text-gray-500">{item.variety}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant={item.qualityGrade === 'Grade A' ? 'success' : 'warning'}>
                      {item.qualityGrade}
                    </Badge>
                    {item.isOrganic && (
                      <Badge variant="brand" className="text-[10px]">
                        ORGANIC
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Farmer Info */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#DCE9D8] text-[#173B2A] font-bold flex items-center justify-center text-xs">
                    {item.farmerName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-gray-900 truncate block">{item.farmerName}</span>
                    <span className="text-gray-500 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {item.farmerLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.farmerRating}</span>
                  </div>
                </div>

                {/* Price & Quantity Breakdown */}
                <div className="bg-[#F7F5ED] p-3 rounded-xl border border-[#DCE9D8] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Asking Price:</span>
                    <span className="text-base font-extrabold text-[#173B2A]">
                      ₹{item.askingPricePerKg.toFixed(2)} / kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Mandi Benchmark:</span>
                    <span className="line-through text-gray-400">
                      ₹{item.mandiBenchmarkPricePerKg.toFixed(2)}/kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#DCE9D8]">
                    <span className="text-gray-600">Available Quantity:</span>
                    <span className="font-bold text-gray-900">{item.quantityKg.toLocaleString('en-IN')} kg</span>
                  </div>
                </div>

                {/* Storage & Freshness Indicator */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span className="truncate">Loc: {item.storageLocation}</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.freshnessPercent}% Fresh
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => handleOpenOrderModal(item)}
                >
                  Place Order / Bid
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Farmer Create Listing Modal */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">List Harvested Produce for Sale</h3>
                <p className="text-xs text-gray-500">Post directly to buyers on SASYAM Direct Exchange</p>
              </div>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Crop Name</label>
                  <select
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Onion">Onion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Variety</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={newQuantityKg}
                    onChange={(e) => setNewQuantityKg(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Quality Grade</label>
                  <select
                    value={newQualityGrade}
                    onChange={(e) => setNewQualityGrade(e.target.value as any)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#2F6B45]"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Asking Price (₹/kg)</label>
                  <input
                    type="number"
                    step="0.50"
                    value={newAskingPrice}
                    onChange={(e) => setNewAskingPrice(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Storage Location</label>
                  <input
                    type="text"
                    value={newStorageLocation}
                    onChange={(e) => setNewStorageLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newIsOrganic}
                  onChange={(e) => setNewIsOrganic(e.target.checked)}
                  className="accent-[#2F6B45] rounded"
                />
                Certified Organic Produce
              </label>

              <div className="flex justify-end gap-3 pt-3">
                <Button type="button" variant="outline" onClick={() => setIsListingModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Publish Marketplace Listing
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Buyer Order / Bid Modal */}
      {isOrderModalOpen && selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#173B2A]">Buy Produce: {selectedListing.cropName}</h3>
                <p className="text-xs text-gray-500">Farmer: {selectedListing.farmerName} ({selectedListing.farmerLocation})</p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Buyer / Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Traders / BigBasket Varanasi"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Varanasi Agro Foods Pvt Ltd"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-600">Order Quantity (kg)</label>
                  <span className="text-xs text-gray-400">Max Available: {selectedListing.quantityKg} kg</span>
                </div>
                <input
                  type="number"
                  min={50}
                  max={selectedListing.quantityKg}
                  value={orderQuantityKg}
                  onChange={(e) => setOrderQuantityKg(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#2F6B45]"
                  required
                />
              </div>

              <div className="bg-[#F7F5ED] p-4 rounded-xl border border-[#DCE9D8] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="font-semibold text-gray-900">₹{selectedListing.askingPricePerKg.toFixed(2)} / kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold text-gray-900">₹{(orderQuantityKg * selectedListing.askingPricePerKg).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 pt-1 border-t border-[#DCE9D8]">
                  <span>Escrow Protection:</span>
                  <span className="font-bold">Included (T+0 Release)</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Purchase & Dispatch Transport
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
