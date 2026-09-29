import React from 'react';
import { HeroLayout, HeroLayoutProps } from '@/layouts/HeroLayout';
import { SplitLayout, SplitLayoutProps } from '@/layouts/SplitLayout';
import { GridLayout, GridLayoutProps } from '@/layouts/GridLayout';

type PixelLayoutProps =
  | ({ type: 'hero' } & HeroLayoutProps)
  | ({ type: 'split' } & SplitLayoutProps)
  | ({ type: 'grid' } & GridLayoutProps);

/**
 * PixelLayout Abstraction Layer
 * Example:
 * <PixelLayout type="hero" title="My Title" visual={<R3FCanvas... />} />
 */
export const PixelLayout: React.FC<PixelLayoutProps> = (props) => {
  if (props.type === 'hero') {
    const { type, ...rest } = props;
    return <HeroLayout {...rest} />;
  }

  if (props.type === 'split') {
    const { type, ...rest } = props;
    return <SplitLayout {...rest} />;
  }

  if (props.type === 'grid') {
    const { type, ...rest } = props;
    return <GridLayout {...rest} />;
  }

  return null;
};
