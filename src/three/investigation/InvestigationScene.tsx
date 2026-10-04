import React from 'react';
import { ChainRankWorld } from '../environment/ChainRankWorld';
import { GraphWorld } from '../graph/GraphWorld';
import { TracePath } from './TracePath';
import { SelectedAccountFocus } from './SelectedAccountFocus';

export interface InvestigationSceneProps {
  showEnvironment?: boolean;
}

/**
 * Master ChainRank Investigation 3D Scene
 * Coordinates the physical financial environment, holographic transaction graph,
 * multi-hop forensic trace path, and target spotlight focus.
 */
export const InvestigationScene: React.FC<InvestigationSceneProps> = ({
  showEnvironment = true
}) => {
  return (
    <group name="ChainRankInvestigationScene">
      {/* 1. Spatial Bank & AML Infrastructure Campus */}
      <ChainRankWorld showEnvironment={showEnvironment} />

      {/* 2. Central Holographic Transaction Network */}
      <GraphWorld />

      {/* 3. Bidirectional Laundering Trace Conduit */}
      <TracePath />

      {/* 4. Active Target Focus Spotlights & Reticle */}
      <SelectedAccountFocus />
    </group>
  );
};
