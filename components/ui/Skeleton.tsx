import React from 'react';
import { SkeletonProps } from '@/types/ui';

const Skeleton: React.FC<SkeletonProps> = ({ 
  height = '1rem', 
  width = '100%', 
  className = '' 
}) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ height, width }}
    />
  );
};

export default Skeleton;