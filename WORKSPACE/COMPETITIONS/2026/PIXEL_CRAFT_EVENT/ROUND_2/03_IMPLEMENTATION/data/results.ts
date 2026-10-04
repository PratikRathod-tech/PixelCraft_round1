export interface ResultPodium {
  position: "WINNER" | "RUNNER_UP" | "SECOND_RUNNER_UP" | "SPECIAL_MENTION";
  title: string;
  teamName: string;
  projectTitle: string;
  college: string;
  status: "TO BE ANNOUNCED" | "ANNOUNCED";
  color: string;
  badge: string;
  notice: string;
}

export const RESULTS_DATA: ResultPodium[] = [
  {
    position: "WINNER",
    title: "Grand Champion / 1st Place",
    teamName: "TO BE ANNOUNCED",
    projectTitle: "Official Winner Evaluation in Progress",
    college: "Evaluation Underway",
    status: "TO BE ANNOUNCED",
    color: "#10b981",
    badge: "1st Place",
    notice: "Final grand champion will be officially revealed by the jury following the Round 2 final presentations."
  },
  {
    position: "RUNNER_UP",
    title: "1st Runner Up / 2nd Place",
    teamName: "TO BE ANNOUNCED",
    projectTitle: "Official Runner-Up Evaluation in Progress",
    college: "Evaluation Underway",
    status: "TO BE ANNOUNCED",
    color: "#06b6d4",
    badge: "2nd Place",
    notice: "Runner-up will be officially declared during the closing ceremony."
  },
  {
    position: "SECOND_RUNNER_UP",
    title: "2nd Runner Up / 3rd Place",
    teamName: "TO BE ANNOUNCED",
    projectTitle: "Official 2nd Runner-Up Evaluation in Progress",
    college: "Evaluation Underway",
    status: "TO BE ANNOUNCED",
    color: "#f59e0b",
    badge: "3rd Place",
    notice: "Second runner-up will be officially declared during the closing ceremony."
  }
];
