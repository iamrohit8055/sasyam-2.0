import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wheat,
  Plus,
  CheckCircle2,
  ArrowRight,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { harvestService } from '../../services/harvestService';
import type { HarvestRecord } from '../../services/harvestService';

export const HarvestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [harvests, setHarvests] = useState<HarvestRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [cropName, setCropName] = useState('Tomato');
  const [variety, setVariety] = useState('Hybrid Abhilash');
  const [farmName] = useState('Green Valley Estate');
  const [quantityKg, setQuantityKg] = useState<number>(1500);
  const [qualityGrade, setQualityGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');
  const [storageCondition, setStorageCondition] = useState<'Open Air' | 'Covered Shed' | 'Cold Storage'>('Open Air');
  const [storageLocation, setStorageLocation] = useState('On-Farm Covered Shed');
  const [harvestDate, setHarvestDate] = useState('2026-09-05');

  useEffect(() => {
    setHarvests(harvestService.getHarvests());
  }, []);

  const handleRecordHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const res = harvestService.recordHarvest({
      cropName,
      variety,
      farmName,
      fieldId: 'fld_01',
      harvestDate,
      quantityKg: Number(quantityKg),
      qualityGrade,
      storageCondition,
      storageLocation,
      notes: 'Logged via Harvest Manager',
    });

    setHarvests([res.harvest, ...harvests]);
    setIsModalOpen(false);
    navigate('/farmer/produce');
  };

  const totalHarvestedKg = harvests.reduce((acc, h) => acc + h.quantityKg, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-[#173B2A]/10 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#173B2A] tracking-tight flex items-center gap-2">
            <Wheat className="w-6 h-6 text-amber-700" />
            Harvest Logs & Yield Recording
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Log harvested crop yields to automatically generate produce inventory items
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Record Harvest Batch
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Harvest Batches</p>
          <p className="text-2xl font-bold text-[#173B2A] font-mono">{harvests.length} Batches</p>
          <p className="text-[10px] text-gray-400">Tomato, Potato harvest records</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Volume Logged</p>
          <p className="text-2xl font-bold text-[#2F6B45] font-mono">{totalHarvestedKg.toLocaleString()} kg</p>
          <p className="text-[10px] text-gray-400">24.0 Quintals total yield</p>
        </Card>

        <Card className="p-4 bg-white space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">Produce Inventory Action</p>
          <Link to="/farmer/produce" className="inline-flex items-center gap-1 text-xs font-bold text-[#2F6B45] hover:underline pt-2">
            View Stored Batches & Spoilage Monitor <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>

      {/* Harvest Records List */}
      <Card className="p-5 space-y-4 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#173B2A]">Historical Harvest Logs</h3>
          <span className="text-xs text-gray-500 font-medium">Sorted by harvest date</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Crop / Variety</th>
                <th className="py-2.5 px-3">Farm</th>
                <th className="py-2.5 px-3 text-right">Quantity</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Storage Condition</th>
                <th className="py-2.5 px-3 text-right">Harvest Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {harvests.map((h) => (
                <tr key={h.id} className="hover:bg-[#F7F5ED]/50 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#173B2A]">{h.cropName}</div>
                    <div className="text-[10px] text-gray-500">{h.variety}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-600 font-medium">{h.farmName}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#173B2A]">
                    {h.quantityKg.toLocaleString()} kg
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="success" className="text-[10px]">{h.qualityGrade}</Badge>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-gray-700">{h.storageCondition}</span>
                    <div className="text-[10px] text-gray-500">{h.storageLocation}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-gray-600">
                    {h.harvestDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Record Harvest */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Wheat className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#173B2A]">Record Harvest Batch</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordHarvest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Crop</label>
                  <select
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Onion">Onion</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Mustard">Mustard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Variety</label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Harvested Quantity (kg)</label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Commercial)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Storage Condition</label>
                  <select
                    value={storageCondition}
                    onChange={(e) => setStorageCondition(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  >
                    <option value="Open Air">Open Air Shed</option>
                    <option value="Covered Shed">Covered Storage Shed</option>
                    <option value="Cold Storage">Commercial Cold Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Storage Location</label>
                  <input
                    type="text"
                    value={storageLocation}
                    onChange={(e) => setStorageLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Save & Generate Produce Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
