import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface AIInsightCardProps {
  title?: string;
  recommendation: string;
  confidenceScore?: number;
  reasoning: string[];
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
  variant?: 'primary' | 'urgent' | 'highlight';
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title = 'SASYAM RECOMMENDS',
  recommendation,
  confidenceScore = 91,
  reasoning,
  actionLabel = 'View Decision Details',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  variant = 'primary',
}) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden border-2 transition-all duration-300 shadow-md',
        variant === 'primary' && 'border-[#2F6B45]/40 bg-gradient-to-br from-[#173B2A] to-[#2F6B45] text-white',
        variant === 'urgent' && 'border-[#C94B45]/50 bg-gradient-to-br from-[#7F1D1D] to-[#C94B45] text-white',
        variant === 'highlight' && 'border-[#8A6745]/40 bg-gradient-to-br from-[#173B2A] via-[#2F6B45] to-[#8A6745] text-white',
        className
      )}
    >
      {/* Visual Accent Overlay */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-yellow-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
            ✦ {title}
          </span>
        </div>
        {confidenceScore && (
          <Badge variant="brand" className="bg-white/20 text-white backdrop-blur-sm border-white/20 text-xs">
            {confidenceScore}% confidence
          </Badge>
        )}
      </div>

      {/* Recommendation Headline */}
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 text-white leading-snug">
        {recommendation}
      </h3>

      {/* Why Section */}
      {reasoning.length > 0 && (
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3.5 mb-5 space-y-2 border border-white/10">
          <p className="text-xs font-medium text-emerald-200 uppercase tracking-wider">Why SASYAM recommends this:</p>
          <ul className="space-y-1.5 text-sm text-emerald-50">
            {reasoning.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {actionLabel && (
          <Button
            variant="secondary"
            size="md"
            onClick={onAction}
            className="bg-white text-[#173B2A] hover:bg-emerald-50 border-none font-semibold shadow"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {actionLabel}
          </Button>
        )}
        {secondaryActionLabel && (
          <Button
            variant="ghost"
            size="md"
            onClick={onSecondaryAction}
            className="text-white hover:bg-white/15 hover:text-white border border-white/30"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};
