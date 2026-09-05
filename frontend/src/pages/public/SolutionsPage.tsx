import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Sparkles, TrendingUp, Boxes, Truck, Factory, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      title: 'AI Crop Selection Advisor',
      icon: <Sprout className="w-6 h-6 text-[#2F6B45]" />,
      desc: 'Analyses soil type, land area, water sources, historical weather, and market demand to score crop suitability (e.g. Wheat 91%, Mustard 84%).',
    },
    {
      title: 'AI Disease Scanner',
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      desc: 'Upload crop or leaf images for computer vision diagnosis, confidence scoring, organic/chemical treatment advice, and preventive steps.',
    },
    {
      title: 'Market Net Realization Engine',
      icon: <TrendingUp className="w-6 h-6 text-[#8A6745]" />,
      desc: 'Calculates true profit after deducting transportation costs, mandi commissions, and handling charges across surrounding markets.',
    },
    {
      title: 'Sell Now vs Store? Engine',
      icon: <Boxes className="w-6 h-6 text-amber-600" />,
      desc: 'Evaluates current prices vs predicted price surges against storage costs and spoilage probabilities to give definitive hold/sell signals.',
    },
    {
      title: 'Processing Allocation Marketplace',
      icon: <Factory className="w-6 h-6 text-purple-600" />,
      desc: 'Enables farmers to split harvested yields between fresh mandis and food processors (purees, juices, chips, flour) to reduce waste.',
    },
    {
      title: 'Transport Matching & Live GPS Tracking',
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      desc: 'Match produce shipments with verified nearby transporters, compare vehicle quotes, and track delivery routes live via WebSockets.',
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

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2F6B45] bg-[#DCE9D8] px-3 py-1 rounded-full">
            Platform Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#173B2A] tracking-tight">
            Comprehensive Solutions Across the Agricultural Lifecycle
          </h1>
          <p className="text-base text-gray-700">
            SASYAM's modules work together to ensure maximum produce utilization and higher net income for farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, idx) => (
            <Card key={idx} className="p-6 bg-white space-y-3 hover:border-[#2F6B45]/40 transition">
              <div className="p-3 rounded-xl bg-[#F7F5ED] w-fit">{s.icon}</div>
              <h3 className="text-lg font-bold text-[#173B2A]">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
