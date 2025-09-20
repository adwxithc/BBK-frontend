import React from 'react';
import Skeleton from './Skeleton';

interface ComponentSkeletonProps {
  rows?: number;
  showTitle?: boolean;
  showDescription?: boolean;
  className?: string;
}

const ComponentSkeleton: React.FC<ComponentSkeletonProps> = ({
  rows = 6,
  showTitle = true,
  showDescription = true,
  className = ''
}) => {
  return (
    <div className={`py-20 bg-gradient-to-b from-white via-green-50/30 to-yellow-50/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(showTitle || showDescription) && (
          <div className="text-center mb-16">
            {/* Title skeleton */}
            {showTitle && (
              <div className="mb-4">
                <Skeleton height="2rem" width="16rem" className="mx-auto" />
              </div>
            )}
            
            {/* Description skeleton */}
            {showDescription && (
              <div className="space-y-2">
                <Skeleton height="1rem" width="24rem" className="mx-auto" />
                <Skeleton height="1rem" width="20rem" className="mx-auto" />
              </div>
            )}
          </div>
        )}
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: rows }, (_, i) => (
            <div key={`skeleton-${i}`} className="bg-white rounded-2xl p-6 shadow-lg">
              <Skeleton height="12rem" className="mb-4" />
              <Skeleton height="1.5rem" width="75%" className="mb-2" />
              <Skeleton height="1rem" width="100%" className="mb-1" />
              <Skeleton height="1rem" width="85%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentSkeleton;