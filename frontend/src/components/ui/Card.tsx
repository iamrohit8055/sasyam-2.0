import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered' | 'accent' | 'cream';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverable = false,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-5 transition-all duration-200';

  const variants = {
    default: 'bg-white border border-[#173B2A]/10 shadow-sm hover:shadow-md',
    flat: 'bg-white border border-transparent shadow-none',
    bordered: 'bg-white border border-[#173B2A]/20 shadow-none',
    accent: 'bg-[#DCE9D8]/40 border border-[#2F6B45]/20 shadow-sm',
    cream: 'bg-[#F7F5ED] border border-[#8A6745]/15 shadow-sm',
  };

  const hoverStyles = hoverable ? 'hover:-translate-y-0.5 cursor-pointer' : '';

  return (
    <div className={cn(baseStyles, variants[variant], hoverStyles, className)} {...props}>
      {children}
    </div>
  );
};
