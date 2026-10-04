/**
 * ChainRank-AML Skeleton Placeholder Component
 */

import React from 'react';

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
}) => {
  return (
    <div
      className={`animate-pulse bg-slate-800/70 ${width} ${height} ${rounded} ${className}`}
    />
  );
};
