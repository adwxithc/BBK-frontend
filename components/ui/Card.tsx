import React from 'react';
import { CardProps } from '@/types/ui';
import { cn } from '@/utils/style-utils';

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl',
        paddings[padding],
        shadows[shadow],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;