import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scan,
  Upload,
  Camera,
  ShieldAlert,
  CheckCircle2,
  Info,
  Sprout,
  Activity,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AIInsightCard } from '../../components/agriculture/AIInsightCard';
import { diseaseScanService } from '../../services/diseaseScanService';
import type { DiseaseScanItem } from '../../services/diseaseScanService';

export const DiseaseScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSample, setSelectedSample] = useState<string>('tomato_early_blight');
  const [scanResult, setScanResult] = useState<DiseaseScanItem>(
    diseaseScanService.scanSample('tomato_early_blight')
  );
  const [activeTab, setActiveTab] = useState<'CHEMICAL' | 'ORGANIC'>('CHEMICAL');
  const [isScanning, setIsScanning] = useState(false);

  const handleSelectSample = (key: string) => {
    setSelectedSample(key);
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(diseaseScanService.scanSample(key));
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">AI Crop & Leaf Disease Detection</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <Scan className="w-3.5 h-3.5 text-amber-400" />
              VISION AI 94.8%
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Upload leaf photos or select field samples to receive instant Computer Vision disease diagnostics and treatment remedies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/farmer/crops')}>
            <Sprout className="w-4 h-4 mr-1.5 text-emerald-600" />
            My Crops
          </Button>
        </div>
      </div>

      {/* Upload & Sample Gallery Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Dropzone */}
        <Card className="p-6 bg-white border border-dashed border-[#2F6B45]/40 text-center flex flex-col items-center justify-center space-y-3 shadow-sm hover:border-[#2F6B45] transition-all">
          <div className="p-3 bg-[#DCE9D8] rounded-full text-[#173B2A]">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#173B2A]">Upload Leaf Photo</h3>
            <p className="text-xs text-gray-500 mt-0.5">Drag & drop or capture photo using phone camera</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => handleSelectSample('tomato_early_blight')}>
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Photo
          </Button>
        </Card>

        {/* Sample 1: Tomato Early Blight */}
        <Card
          onClick={() => handleSelectSample('tomato_early_blight')}
          className={`p-4 bg-white cursor-pointer border transition-all flex items-center gap-3 ${
            selectedSample === 'tomato_early_blight'
              ? 'ring-2 ring-[#2F6B45] border-[#2F6B45] bg-[#F7F5ED]/50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&q=80&w=200"
              alt="Tomato Leaf Sample"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Badge variant="danger" className="text-[10px]">SAMPLE 1</Badge>
            <h4 className="font-bold text-xs text-[#173B2A] mt-1">Tomato Leaf Spot</h4>
            <p className="text-[11px] text-gray-500">Concentric brown lesions</p>
          </div>
        </Card>

        {/* Sample 2: Potato Late Blight */}
        <Card
          onClick={() => handleSelectSample('potato_late_blight')}
          className={`p-4 bg-white cursor-pointer border transition-all flex items-center gap-3 ${
            selectedSample === 'potato_late_blight'
              ? 'ring-2 ring-[#2F6B45] border-[#2F6B45] bg-[#F7F5ED]/50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=200"
              alt="Potato Leaf Sample"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Badge variant="warning" className="text-[10px]">SAMPLE 2</Badge>
            <h4 className="font-bold text-xs text-[#173B2A] mt-1">Potato Late Blight</h4>
            <p className="text-[11px] text-gray-500">Water-soaked foliage</p>
          </div>
        </Card>
      </div>

      {/* Diagnostic Hero Banner */}
      {isScanning ? (
        <Card className="p-8 text-center bg-white border border-gray-200">
          <Activity className="w-10 h-10 text-[#2F6B45] animate-spin mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#173B2A]">Analyzing Plant Leaf Telemetry...</h3>
          <p className="text-sm text-gray-500">Running Computer Vision neural network inference models...</p>
        </Card>
      ) : (
        <>
          <AIInsightCard
            title="AI DIAGNOSTIC DETECTION RESULT"
            recommendation={`${scanResult.detectedDisease} — ${scanResult.confidenceScore}% CONFIDENCE`}
            confidenceScore={Math.round(scanResult.confidenceScore)}
            variant={scanResult.riskLevel === 'HIGH' ? 'urgent' : 'primary'}
            reasoning={[
              scanResult.description,
              `Risk Level: ${scanResult.riskLevel} — Immediate foliar treatment recommended within 48 hours.`,
            ]}
          />

          {/* Treatment Remedies Section */}
          <Card className="p-6 bg-white border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-[#173B2A]">Recommended Treatment Remedies</h3>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('CHEMICAL')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'CHEMICAL'
                      ? 'bg-[#173B2A] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Chemical Spray Schedule
                </button>
                <button
                  onClick={() => setActiveTab('ORGANIC')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'ORGANIC'
                      ? 'bg-[#173B2A] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Organic & Biological Remedies
                </button>
              </div>
            </div>

            {/* Treatment Items */}
            <div className="space-y-3">
              {activeTab === 'CHEMICAL' ? (
                scanResult.chemicalTreatments.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-rose-900 block">Foliar Step {idx + 1}</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  </div>
                ))
              ) : (
                scanResult.organicTreatments.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900 block">Organic Remedy {idx + 1}</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Preventive Measures */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-bold text-gray-800 mb-2">Preventive Field Practices:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
                {scanResult.preventiveMeasures.map((measure, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
