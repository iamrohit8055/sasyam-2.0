import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    success: 'bg-[#DCE9D8] text-[#173B2A] border border-[#2F6B45]/20',
    warning: 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/20',
    danger: 'bg-[#FEE2E2] text-[#991B1B] border border-[#EF4444]/20',
    info: 'bg-[#E0F2FE] text-[#075985] border border-[#38BDF8]/20',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
    brand: 'bg-[#173B2A] text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
