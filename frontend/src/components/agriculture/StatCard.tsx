import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'positive',
  icon,
  className,
}) => {
  return (
    <Card className={cn('flex items-start justify-between p-4 md:p-5', className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-bold text-[#173B2A] tracking-tight font-mono">{value}</h4>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {change && (
          <div className="flex items-center gap-1 text-xs font-semibold pt-1">
            <span
              className={cn(
                changeType === 'positive' && 'text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded',
                changeType === 'negative' && 'text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded',
                changeType === 'neutral' && 'text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded'
              )}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      <div className="p-2.5 rounded-xl bg-[#DCE9D8]/50 text-[#173B2A] shrink-0">{icon}</div>
    </Card>
  );
};
