/**
 * ChainRank-AML Icon Semantic System
 * Authoritative mapping from financial intelligence concepts to Lucide icons.
 */

import {
  LayoutDashboard,
  Share2,
  Search,
  Zap,
  Layers,
  Cpu,
  Workflow,
  FileText,
  Database,
  Globe,
  Settings,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Activity,
  Server,
  Key,
  Download,
  Filter,
  RefreshCw,
  Box,
  Eye,
  Sliders,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Printer,
  Moon,
  Sun,
  Maximize2,
  Command,
} from 'lucide-react';

export const iconMap = {
  // Navigation & Modules
  overview: LayoutDashboard,
  network: Share2,
  investigate: Search,
  trace: Zap,
  candidateGraphs: Layers,
  model: Cpu,
  pipeline: Workflow,
  reports: FileText,
  dataExplorer: Database,
  spatialTheater: Globe,
  settings: Settings,
  assetLab: Box,

  // Risk & Security
  shieldAlert: ShieldAlert,
  shieldCheck: ShieldCheck,
  alertTriangle: AlertTriangle,
  criticalRisk: AlertTriangle,
  activity: Activity,

  // Flow & Transactions
  inflow: ArrowDownLeft,
  outflow: ArrowUpRight,
  filter: Filter,
  refresh: RefreshCw,
  download: Download,
  print: Printer,

  // Controls & System
  command: Command,
  moon: Moon,
  sun: Sun,
  close: X,
  expand: Maximize2,
  external: ExternalLink,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  server: Server,
  key: Key,
  inspect: Eye,
  sliders: Sliders,
  success: CheckCircle2,
} as const;

export type SemanticIcon = keyof typeof iconMap;
