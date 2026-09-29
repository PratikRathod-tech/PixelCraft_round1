import React from 'react';
import { motion } from 'framer-motion';

export interface InfiniteMarqueeProps {
  items: React.ReactNode[];
  speed?: number; // seconds for full loop
  direction?: 'left' | 'right';
  className?: string;
}

/**
 * InfiniteMarquee — Creative UI Component
 * Continuous seamless scrolling ticker band.
 */
export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  speed = 25,
  direction = 'left',
  className = '',
}) => {
  const xTranslation = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-4 bg-slate-950/60 border-y border-slate-800 ${className}`}>
      <motion.div
        className="flex items-center gap-8 shrink-0"
        animate={{ x: xTranslation }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="inline-flex items-center">
            {item}
          </div>
        ))}
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="inline-flex items-center">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
