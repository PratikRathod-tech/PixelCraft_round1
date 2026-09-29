export interface ResultPodium {
  position: 'WINNER' | 'RUNNER_UP' | 'SPECIAL_MENTION';
  positionLabel: string;
  trophyIcon: string;
  badge: string;
  teamNamePlaceholder: string;
  membersPlaceholder: string;
  projectPlaceholder: string;
  scorePlaceholder: string;
  description: string;
  accentGradient: string;
  borderColor: string;
}

export const RESULTS_DATA: ResultPodium[] = [
  {
    position: "WINNER",
    positionLabel: "🏆 Grand Champion (1st Place)",
    trophyIcon: "Trophy",
    badge: "1st Place Winner",
    teamNamePlaceholder: "[Winner Team — To Be Announced]",
    membersPlaceholder: "[Team Members — To Be Provided]",
    projectPlaceholder: "[Winning Project — To Be Announced]",
    scorePlaceholder: "Grand Final Score: [To Be Announced]",
    description: "Awarded for supreme excellence across problem understanding, design aesthetics, code quality, and live jury defense.",
    accentGradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderColor: "border-amber-400"
  },
  {
    position: "RUNNER_UP",
    positionLabel: "🥈 Runner-Up (2nd Place)",
    trophyIcon: "Medal",
    badge: "2nd Place Finalist",
    teamNamePlaceholder: "[Runner-Up Team — To Be Announced]",
    membersPlaceholder: "[Team Members — To Be Provided]",
    projectPlaceholder: "[Runner-Up Project — To Be Announced]",
    scorePlaceholder: "Final Score: [To Be Announced]",
    description: "Awarded for exceptional visual innovation, responsive execution, and seamless 3D motion interactions.",
    accentGradient: "from-slate-400/20 via-zinc-500/10 to-transparent",
    borderColor: "border-slate-400"
  },
  {
    position: "SPECIAL_MENTION",
    positionLabel: "⭐ Best UI/UX & Innovation Award",
    trophyIcon: "Sparkles",
    badge: "Special Category Honor",
    teamNamePlaceholder: "[Special Award Team — To Be Announced]",
    membersPlaceholder: "[Team Members — To Be Provided]",
    projectPlaceholder: "[Innovation Project — To Be Announced]",
    scorePlaceholder: "Score: [To Be Announced]",
    description: "Awarded for the most creative lateral thinking and bleeding-edge user interaction mechanics.",
    accentGradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    borderColor: "border-cyan-400"
  }
];

export const RESULTS_METADATA = {
  statusText: "Awaiting Final Jury Scorecard Consolidation",
  estimatedDate: "Grand Finale • [Date To Be Announced]",
  evaluationMetrics: [
    { label: "Design & UX Polish", weight: "30%" },
    { label: "Technical Architecture & Code", weight: "30%" },
    { label: "Requirement Coverage & Story", weight: "25%" },
    { label: "Live Presentation & Defense", weight: "15%" }
  ]
};
