export type WorkspaceProjectType = 'competition' | 'uiux' | 'experiment';
export type WorkspaceProjectStatus = 'active' | 'archived' | 'completed';

export interface WorkspaceProjectMetadata {
  projectId: string;
  projectName: string;
  competitionName?: string;
  type: WorkspaceProjectType;
  createdAt: string;
  updatedAt: string;
  status: WorkspaceProjectStatus;
  currentRound?: 1 | 2;
  currentVersion: string;
  armoryVersion: string;
  round1?: {
    status: string;
    version: string;
    submitted: boolean;
  };
  round2?: {
    status: string;
    version: string;
    submitted: boolean;
  };
  metadata?: {
    theme?: string;
    heroLayout?: string;
    primaryAssetId?: string;
    auditScore?: number | null;
  };
}

export interface WorkspaceValidationResult {
  valid: boolean;
  missingDirectories: string[];
  missingFiles: string[];
  errors: string[];
}
