import React from 'react';

export interface GridLayoutProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * GridLayout — Foundation responsive grid module
 * Aligns with the 4-col (mobile) -> 8-col (tablet) -> 12-col (desktop) conceptual grid system.
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className = '',
}) => {
  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    12: 'grid-cols-4 sm:grid-cols-8 lg:grid-cols-12',
  };

  return (
    <div className={`grid ${colMap[columns]} ${gapMap[gap]} ${className}`}>
      {children}
    </div>
  );
};
