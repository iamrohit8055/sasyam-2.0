import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Farm Setup & Soil Input',
      desc: 'The farmer registers their farm location, land area, soil profile (Alluvial, Black, Clay), and water availability.',
    },
    {
      step: 'Step 2',
      title: 'AI Crop Recommendation',
      desc: 'SASYAM runs suitability algorithms considering upcoming weather patterns and regional market demand.',
    },
    {
      step: 'Step 3',
      title: 'Cultivation & Disease Scans',
      desc: 'Farmer monitors crop growth stages and uploads leaf photos if disease symptoms appear for instant treatment advice.',
    },
    {
      step: 'Step 4',
      title: 'Harvest & Produce Inventory',
      desc: 'Recorded harvests automatically generate produce inventory items with freshness scores and safe selling windows.',
    },
    {
      step: 'Step 5',
      title: 'Market Analysis & Sell/Store Decision',
      desc: 'The decision engine compares local mandis vs distant markets vs cold storage vs processors based on net realization.',
    },
    {
      step: 'Step 6',
      title: 'Buyer Matching & Transport Booking',
      desc: 'Farmer confirms a buyer offer and books a matched vehicle (with transparent transport cost calculation).',
    },
    {
      step: 'Step 7',
      title: 'Live Tracking & Delivery Confirmation',
      desc: 'Real-time GPS updates track the vehicle from farm pickup to buyer dropoff, ending with buyer quantity verification.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5ED] text-[#173B2A] font-sans antialiased">
      <header className="bg-white border-b border-[#173B2A]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#173B2A] flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-[#173B2A]">SASYAM</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">Back to Home</Button>
            </Link>
            <Link to="/farmer/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2F6B45] bg-[#DCE9D8] px-3 py-1 rounded-full">
            Step-By-Step Workflow
          </span>
          <h1 className="text-4xl font-black text-[#173B2A]">How SASYAM Works</h1>
          <p className="text-base text-gray-700">
            A seamless journey from initial sowing decision to final payment receipt.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((s, idx) => (
            <Card key={idx} className="p-6 bg-white flex flex-col md:flex-row items-start gap-4">
              <span className="text-xs font-extrabold font-mono text-[#8A6745] bg-[#F7F5ED] px-3 py-1.5 rounded-lg shrink-0">
                {s.step}
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#173B2A] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2F6B45]" />
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
