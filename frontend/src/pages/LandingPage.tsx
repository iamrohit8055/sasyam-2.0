import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Sparkles,
  TrendingUp,
  Boxes,
  Truck,
  ArrowRight,
  Factory,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage: React.FC = () => {
  // Interactive Decision Engine Simulator State
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Onion' | 'Potato'>('Tomato');
  const [quantity, setQuantity] = useState<number>(1500);
  const [storageType, setStorageType] = useState<'Open Air' | 'Cold Storage'>('Open Air');

  // Scenario Calculation Logic for Demo Simulator
  const cropData = {
    Tomato: {
      localPrice: 22,
      marketBPrice: 27,
      transportCost: 3,
      spoilageRisk: 'Medium (3-4 days safe)',
      recommendation: 'SELL AT MARKET B NOW',
      netRealization: 24,
      reason: 'Azadpur Market B gives highest net realization after ₹3/kg transport cost. Rainfall expected in 48 hours.',
    },
    Onion: {
      localPrice: 20,
      marketBPrice: 26,
      transportCost: 2,
      spoilageRisk: 'Low (25 days safe)',
      recommendation: 'STORE FOR 5 DAYS',
      netRealization: 24.5,
      reason: 'Prices expected to jump +15% next week. Storage cost (₹1.2/kg) is lower than expected net gain (+₹3.3/kg advantage).',
    },
    Potato: {
      localPrice: 18,
      marketBPrice: 23,
      transportCost: 2.5,
      spoilageRisk: 'Very Low (Cold Storage)',
      recommendation: 'ALLOCATE: 60% MANDI / 40% PROCESSOR',
      netRealization: 21,
      reason: 'Local processor offering ₹22.5/kg flat contract price for chips grade batch. Lower logistics cost.',
    },
  };

  const currentScenario = cropData[selectedCrop];
  const totalLocalRevenue = currentScenario.localPrice * quantity;
  const totalSasyamNetRevenue = currentScenario.netRealization * quantity;
  const netAdvantage = totalSasyamNetRevenue - totalLocalRevenue;

  const steps = [
    { num: '01', title: 'Plan & Crop Selection', desc: 'AI suitability analysis based on soil, water & market outlook', icon: <Sprout className="w-5 h-5" /> },
    { num: '02', title: 'Cultivation & Disease AI', desc: 'Real-time crop health checks and image-based disease scans', icon: <Sparkles className="w-5 h-5" /> },
    { num: '03', title: 'Harvest & Produce Inventory', desc: 'Record yield, track freshness, and monitor spoilage risk', icon: <Boxes className="w-5 h-5" /> },
    { num: '04', title: 'Market Intelligence & Selling', desc: 'Compare mandis, calculate net realization, and optimize sales', icon: <TrendingUp className="w-5 h-5" /> },
    { num: '05', title: 'Logistics & Live GPS', desc: 'Match with reliable transporters and track live deliveries', icon: <Truck className="w-5 h-5" /> },
  ];

  const testimonials = [
    {
      name: 'Ravi Sharma',
      location: 'Jaunpur, Uttar Pradesh',
      crop: '1,500 kg Tomatoes',
      quote: 'SASYAM advised me to ship my tomato batch to Azadpur Mandi instead of local mandi. Even after truck freight charges, I gained ₹3,000 extra net profit in one day!',
      metric: '+₹3,000 Net Profit',
    },
    {
      name: 'Sunita Patel',
      location: 'Nashik, Maharashtra',
      crop: '3,000 kg Onions',
      quote: 'The Sell vs Store Engine warned me about spoilage risk and showed that storing for 4 days would yield 14% higher revenue. The recommendation was spot on.',
      metric: '+14% Higher Realization',
    },
    {
      name: 'Gurpreet Singh',
      location: 'Ludhiana, Punjab',
      crop: '5,000 kg Potatoes',
      quote: 'I used SASYAM to connect with a food processor for Grade B potatoes. Sold 40% of my harvest directly to processor instead of letting it spoil in open storage.',
      metric: 'Zero Spoilage Waste',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5ED] text-[#173B2A] font-sans antialiased">
      {/* Top Announcement Bar */}
      <div className="bg-[#173B2A] text-white text-xs py-2 px-4 text-center font-medium">
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold mr-2">
          Agritech Platform
        </span>
        SASYAM Decision Engine is active for Indian Farmers & Supply Chain Stakeholders.
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#F7F5ED]/90 backdrop-blur-md border-b border-[#173B2A]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/farmer/dashboard" className="flex items-center gap-3 hover:opacity-85 transition group" title="Go to Dashboard">
            <div className="w-10 h-10 rounded-2xl bg-[#173B2A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#173B2A] group-hover:text-[#2F6B45] transition-colors">
              SASYAM
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#173B2A]/80">
            <a href="#how-it-works" className="hover:text-[#173B2A] transition">How It Works</a>
            <a href="#simulator" className="hover:text-[#173B2A] transition">Try Decision Engine</a>
            <Link to="/solutions" className="hover:text-[#173B2A] transition">Solutions</Link>
            <Link to="/how-it-works" className="hover:text-[#173B2A] transition">Workflow</Link>
            <Link to="/about" className="hover:text-[#173B2A] transition">About Us</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/farmer/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCE9D8] text-[#173B2A] text-xs font-semibold border border-[#2F6B45]/20">
              <Sparkles className="w-4 h-4 text-[#2F6B45]" />
              AI-Powered Farm-to-Market Intelligence Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#173B2A] tracking-tight leading-[1.1]">
              From Field to Market, Make Every Decision Smarter.
            </h1>

            <p className="text-base md:text-lg text-gray-700 font-normal leading-relaxed max-w-2xl">
              SASYAM connects crop planning, cultivation, harvest management, market intelligence, storage recommendations, and transportation into one seamless agritech ecosystem for Indian farmers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/farmer/dashboard">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore Farmer Workspace
                </Button>
              </Link>
              <a href="#simulator">
                <Button variant="outline" size="lg">
                  Test Decision Engine
                </Button>
              </a>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#173B2A]/10">
              <div>
                <p className="text-2xl font-black text-[#173B2A] font-mono">+18%</p>
                <p className="text-xs text-gray-600 font-medium">Avg Net Realization</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#173B2A] font-mono">-35%</p>
                <p className="text-xs text-gray-600 font-medium">Post-Harvest Loss</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#173B2A] font-mono">100%</p>
                <p className="text-xs text-gray-600 font-medium">Supply-Chain Visibility</p>
              </div>
            </div>
          </div>

          {/* Right Floating Intelligence Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white p-6 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-white/20 text-yellow-300">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                      ✦ SASYAM Intelligence
                    </span>
                  </div>
                  <Badge variant="brand" className="bg-white/20 text-white border-white/20">
                    Live Engine
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs text-emerald-200">
                    <span>Batch: Tomato (Grade A)</span>
                    <span>Quantity: 1,500 kg</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Recommend: Sell at Market B (Azadpur)
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    Market B price (₹27/kg) minus transport (₹3/kg) yields a net realization of ₹24/kg — beating local mandi by +₹2/kg net profit.
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-4 space-y-2 mb-6 border border-white/10">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-emerald-200">Local Mandi</span>
                    <span className="font-mono text-white">₹22/kg Net (₹33,000)</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-yellow-300">
                    <span>Azadpur Market B ★</span>
                    <span className="font-mono">₹24/kg Net (₹36,000)</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-emerald-200">Net Profit Advantage</span>
                    <span className="font-mono text-emerald-100 font-bold">+₹3,000 Gain</span>
                  </div>
                </div>

                <Link to="/farmer/sell-decision">
                  <Button variant="secondary" size="md" className="w-full justify-between bg-white text-[#173B2A] hover:bg-emerald-50 font-bold">
                    <span>Run Full Sell vs Store Engine</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scenario Simulator Widget Section */}
      <section id="simulator" className="py-16 px-6 bg-white border-y border-[#173B2A]/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F6B45] bg-[#DCE9D8] px-3 py-1 rounded-full">
              Interactive Prototype Demo
            </span>
            <h2 className="text-3xl font-black text-[#173B2A]">
              Test SASYAM Decision Engine Right Now
            </h2>
            <p className="text-sm text-gray-600">
              Select produce parameters to see how SASYAM calculates true net realization.
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-[#F7F5ED] border border-[#173B2A]/15 space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Crop Picker */}
              <div>
                <label className="block text-xs font-bold text-[#173B2A] uppercase mb-1">Select Crop</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-gray-200 text-xs font-bold">
                  {(['Tomato', 'Onion', 'Potato'] as const).map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-1.5 rounded-lg transition ${
                        selectedCrop === crop ? 'bg-[#173B2A] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div>
                <label className="block text-xs font-bold text-[#173B2A] uppercase mb-1">Quantity (kg)</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#173B2A]"
                >
                  <option value={1000}>1,000 kg (10 Quintals)</option>
                  <option value={1500}>1,500 kg (15 Quintals)</option>
                  <option value={3000}>3,000 kg (30 Quintals)</option>
                </select>
              </div>

              {/* Storage Condition */}
              <div>
                <label className="block text-xs font-bold text-[#173B2A] uppercase mb-1">Storage Type</label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-xl border border-gray-200 text-xs font-bold">
                  {(['Open Air', 'Cold Storage'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStorageType(st)}
                      className={`py-1.5 rounded-lg transition ${
                        storageType === st ? 'bg-[#2F6B45] text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="bg-white p-5 rounded-2xl border border-[#173B2A]/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#DCE9D8] text-[#173B2A]">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-[#2F6B45] uppercase tracking-wider">
                    Calculated SASYAM Recommendation
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#173B2A]">
                  {currentScenario.recommendation}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {currentScenario.reason}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pt-1">
                  <span>Spoilage Risk: <strong className="text-gray-900">{currentScenario.spoilageRisk}</strong></span>
                </div>
              </div>

              <div className="md:col-span-5 bg-[#F7F5ED] p-4 rounded-xl space-y-2 border border-gray-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Local Mandi Revenue:</span>
                  <span className="font-mono font-semibold">₹{totalLocalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2F6B45] font-bold">SASYAM Net Realization:</span>
                  <span className="font-mono font-bold text-[#173B2A]">₹{totalSasyamNetRevenue.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-emerald-800">
                  <span>Net Extra Profit:</span>
                  <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded">+₹{netAdvantage.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Value Chain Step Section */}
      <section id="how-it-works" className="py-20 px-6 bg-[#F7F5ED]">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#173B2A] tracking-tight">
              One Connected Value Chain
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              From crop selection to final delivery confirmation, SASYAM optimizes decisions at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step) => (
              <Card key={step.num} className="text-left p-5 hover:border-[#2F6B45]/40 transition space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#8A6745]">{step.num}</span>
                  <div className="p-2 rounded-xl bg-[#DCE9D8]/60 text-[#173B2A]">{step.icon}</div>
                </div>
                <h3 className="text-sm font-bold text-[#173B2A] leading-snug">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white border-t border-[#173B2A]/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-[#173B2A]">
              Farmer Success Stories
            </h2>
            <p className="text-sm text-gray-600">
              Real agricultural scenarios solved using SASYAM net realization intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="p-6 bg-[#F7F5ED] space-y-4 border border-[#173B2A]/10">
                <div className="flex items-center justify-between">
                  <Badge variant="success" className="text-xs">{t.metric}</Badge>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">{t.crop}</span>
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">"{t.quote}"</p>
                <div className="pt-2 border-t border-gray-200">
                  <p className="font-bold text-xs text-[#173B2A]">{t.name}</p>
                  <p className="text-[10px] text-gray-500">{t.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Ecosystem Section */}
      <section id="roles" className="py-20 px-6 bg-[#F7F5ED]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#173B2A]">
              Built for the Entire Agricultural Ecosystem
            </h2>
            <p className="text-sm text-gray-600">
              Role-specific tools designed for farmers, buyers, transporters, and processors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white p-6 space-y-4 border-l-4 border-l-[#2F6B45]">
              <div className="p-3 bg-[#DCE9D8] rounded-xl text-[#173B2A] w-fit">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173B2A]">Farmer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Crop recommendations, disease detection, harvest logging, mandi price comparison, sell vs store decisions, transport matching.
              </p>
              <Link to="/farmer/dashboard" className="text-xs font-bold text-[#2F6B45] inline-flex items-center gap-1 hover:underline">
                Enter Farmer Workspace <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="bg-white p-6 space-y-4 border-l-4 border-l-[#8A6745]">
              <div className="p-3 bg-[#F7F5ED] rounded-xl text-[#8A6745] w-fit">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173B2A]">Buyer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Discover fresh produce batches, search by crop/location/grade, place purchase requests, and confirm received produce.
              </p>
              <Link to="/buyer/dashboard" className="text-xs font-bold text-[#8A6745] inline-flex items-center gap-1 hover:underline">
                Enter Buyer Workspace <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="bg-white p-6 space-y-4 border-l-4 border-l-blue-600">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-700 w-fit">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173B2A]">Transporter</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Register vehicles, accept transport jobs, update pickup/transit status, and broadcast live GPS location updates.
              </p>
              <Link to="/transporter/dashboard" className="text-xs font-bold text-blue-700 inline-flex items-center gap-1 hover:underline">
                Enter Transporter Workspace <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="bg-white p-6 space-y-4 border-l-4 border-l-purple-600">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-700 w-fit">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173B2A]">Processor</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Source raw agricultural crops for processing (sauces, chips, juices, flour) directly from farmer produce batches.
              </p>
              <Link to="/processor/dashboard" className="text-xs font-bold text-purple-700 inline-flex items-center gap-1 hover:underline">
                Enter Processor Workspace <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173B2A] text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-black tracking-tight">SASYAM</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              AI-Powered Farm-to-Market Intelligence Platform for Indian Agriculture.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">Farmer Modules</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><Link to="/farmer/recommendations" className="hover:text-white">Crop Advisor</Link></li>
              <li><Link to="/farmer/disease-detection" className="hover:text-white">Disease Scanner</Link></li>
              <li><Link to="/farmer/markets" className="hover:text-white">Market Intelligence</Link></li>
              <li><Link to="/farmer/sell-decision" className="hover:text-white">Sell vs Store Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">Logistics & Market</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><Link to="/marketplace" className="hover:text-white">Produce Exchange</Link></li>
              <li><Link to="/farmer/transport" className="hover:text-white">Transport Booking</Link></li>
              <li><Link to="/transporter/dashboard" className="hover:text-white">Transporter Network</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/solutions" className="hover:text-white">Platform Solutions</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/10 text-center text-xs text-emerald-300/60">
          © {new Date().getFullYear()} SASYAM. From Seed to Sale. Intelligence at Every Step.
        </div>
      </footer>
    </div>
  );
};
