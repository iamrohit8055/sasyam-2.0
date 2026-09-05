import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PlaceholderPageProps {
  title: string;
  category?: string;
  description?: string;
  nextPhase?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  category = 'SASYAM Module',
  description = 'This feature is ready for deeper implementation in subsequent phases.',
  nextPhase = 'Phase 2+',
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/farmer/dashboard">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="p-8 space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#DCE9D8] text-[#173B2A]">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F6B45]">
            {category} • Scheduled for {nextPhase}
          </span>
        </div>

        <h1 className="text-3xl font-black text-[#173B2A] tracking-tight">{title}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

        <div className="p-4 rounded-xl bg-[#F7F5ED] border border-[#173B2A]/10 text-xs text-gray-700 space-y-1">
          <p className="font-bold text-[#173B2A]">Phase 1 Architecture Status:</p>
          <p>• Route registered in SASYAM App Router</p>
          <p>• Design system tokens, layout shells & role controls active</p>
          <p>• Ready for step-by-step phase execution</p>
        </div>
      </Card>
    </div>
  );
};
