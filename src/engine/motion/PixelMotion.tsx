import React, { useRef } from 'react';
import { motion, HTMLMotionProps, Variants, useScroll, useTransform } from 'framer-motion';
import { MotionPreset } from '@/types';
import { tokens } from '@/configs/theme.tokens';

interface PixelMotionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  preset?: MotionPreset;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  once?: boolean;
}

const presets: Record<string, (direction?: string) => Variants> = {
  fade: () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }),
  reveal: (dir = 'up') => {
    const offsets = { up: 40, down: -40, left: 40, right: -40 };
    const axis = dir === 'left' || dir === 'right' ? 'x' : 'y';
    return {
      hidden: { opacity: 0, [axis]: offsets[dir as keyof typeof offsets] || 40 },
      visible: { opacity: 1, [axis]: 0 },
    };
  },
  slide: (dir = 'left') => {
    const offsets = { left: -60, right: 60, up: 60, down: -60 };
    const axis = dir === 'left' || dir === 'right' ? 'x' : 'y';
    return {
      hidden: { opacity: 0, [axis]: offsets[dir as keyof typeof offsets] || -60 },
      visible: { opacity: 1, [axis]: 0 },
    };
  },
  scale: () => ({
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  }),
  scroll: () => ({
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }),
  stagger: () => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }),
  orbit: () => ({
    hidden: { rotate: 0 },
    visible: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: 'linear' },
    },
  }),
};

/**
 * PixelMotion Wrapper Component — Expanded Motion Preset Engine
 */
export const PixelMotion: React.FC<PixelMotionProps> = ({
  preset = 'reveal',
  direction = 'up',
  delay = 0,
  duration = tokens.motion.duration.normal,
  className = '',
  children,
  once = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  if (preset === 'parallax') {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <motion.div style={{ y: parallaxY }} {...props}>
          {children}
        </motion.div>
      </div>
    );
  }

  if (preset === 'magnetic') {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  if (preset === 'hover-lift') {
    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: tokens.motion.duration.fast, ease: tokens.motion.ease }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  if (preset === 'float') {
    return (
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const selectedVariant = (presets[preset] || presets.reveal)(direction);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: tokens.motion.ease,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
