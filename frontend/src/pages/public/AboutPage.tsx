import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, HeartHandshake, Target, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5ED] text-[#173B2A] font-sans antialiased">
      {/* Header Navigation */}
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-12">
        {/* Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2F6B45] bg-[#DCE9D8] px-3 py-1 rounded-full">
            Our Mission & Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#173B2A] tracking-tight">
            Empowering Indian Farmers Through Actionable Intelligence
          </h1>
          <p className="text-base text-gray-700 leading-relaxed">
            SASYAM was created to bridge the information asymmetry gap in Indian agriculture, turning fragmented farm and market data into decisive, profit-maximizing actions.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white space-y-3 border-l-4 border-l-[#2F6B45]">
            <div className="p-3 rounded-xl bg-[#DCE9D8] text-[#173B2A] w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#173B2A]">Action Over Information</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We don't just display raw market prices or weather data. We calculate net realization, storage costs, and transport trade-offs to tell farmers exactly what to do next.
            </p>
          </Card>

          <Card className="p-6 bg-white space-y-3 border-l-4 border-l-[#8A6745]">
            <div className="p-3 rounded-xl bg-[#F7F5ED] text-[#8A6745] w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#173B2A]">Explainable AI</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              No black boxes. Every AI crop suitability score, disease diagnosis, or sell vs store recommendation clearly outlines the reasoning behind it.
            </p>
          </Card>

          <Card className="p-6 bg-white space-y-3 border-l-4 border-l-emerald-600">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 w-fit">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#173B2A]">End-to-End Value Chain</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Connecting farmers, buyers, transporters, and processors on one integrated platform to reduce post-harvest spoilage and eliminate unnecessary middleman losses.
            </p>
          </Card>
        </div>

        {/* SIH Innovation Banner */}
        <Card className="p-8 bg-gradient-to-r from-[#173B2A] to-[#2F6B45] text-white space-y-4">
          <h2 className="text-2xl font-bold">Built for Smart India Hackathon & Indian Agritech</h2>
          <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
            Addressing Problem Statement #26193: SASYAM integrates crop advisor models, image-based disease detection, post-harvest shelf life intelligence, mandi price comparisons, processing allocation, and live GPS delivery tracking.
          </p>
          <Link to="/farmer/dashboard" className="inline-block pt-2">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Try Demo Scenario
            </Button>
          </Link>
        </Card>
      </main>
    </div>
  );
};
