import { AssistantRoleType } from './aiTypes';

export interface RoleMeta {
  role: AssistantRoleType;
  name: string;
  badge: string;
  description: string;
  avatarIcon: string;
}

export const assistantRoles: Record<AssistantRoleType, RoleMeta> = {
  design: {
    role: 'design',
    name: 'Design Assistant',
    badge: 'VISUAL HIERARCHY',
    description: 'Analyzes typography scale, spacing density, 3D visual framing, and design system token consistency.',
    avatarIcon: 'Palette',
  },
  strategy: {
    role: 'strategy',
    name: 'Competition Strategist',
    badge: 'BRIEF FIT & SECTIONS',
    description: 'Deconstructs competition prompt coverage, required features, map/GIS integration, and story flow.',
    avatarIcon: 'Zap',
  },
  ux: {
    role: 'ux',
    name: 'UX Reviewer',
    badge: 'USABILITY & RESPONSIVE',
    description: 'Audits mobile breakpoint contrast, CTA visibility, viewport scaling, and interaction complexity.',
    avatarIcon: 'Eye',
  },
};
