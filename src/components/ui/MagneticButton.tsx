import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './Button';

export interface MagneticButtonProps extends ButtonProps {
  strength?: number;
}

/**
 * MagneticButton — Creative UI Component
 * Pulls slightly towards the mouse pointer coordinates on hover.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 30,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);
    setPosition({ x: (middleX / width) * strength, y: (middleY / height) * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};
