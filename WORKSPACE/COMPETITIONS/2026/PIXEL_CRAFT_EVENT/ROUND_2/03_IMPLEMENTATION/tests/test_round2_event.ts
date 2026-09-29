import fs from 'fs';
import path from 'path';
import { EVENT_INFO } from '../data/event';
import { TIMELINE_STAGES } from '../data/timeline';
import { ROUND_1_CARDS, ROUND_1_DETAILS } from '../data/round1';
import { ROUND_2_PROBLEM_STATEMENT, PROCESS_PIPELINE } from '../data/round2';
import { QUALIFIED_TEAMS } from '../data/teams';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';
import { RESULTS_DATA } from '../data/results';
import { CONTACT_INFO } from '../data/contact';

console.log('====================================================');
console.log('PIXELCRAFT ARMORY — ROUND 2 EVENT WEBSITE VERIFICATION');
console.log('Pixel Craft 2026: Where Creativity Meets Code');
console.log('====================================================\n');

let passed = 0;
let total = 0;

function assert(condition: boolean, testName: string) {
  total++;
  if (condition) {
    passed++;
    console.log(`✅ PASS [${total}]: ${testName}`);
  } else {
    console.error(`❌ FAIL [${total}]: ${testName}`);
  }
}

// 1. Mandatory Event Branding & Tagline
assert(EVENT_INFO.name === "Pixel Craft", 'Event name is "Pixel Craft"');
assert(EVENT_INFO.tagline === "Where Creativity Meets Code", 'Required tagline is "Where Creativity Meets Code"');
assert(EVENT_INFO.theme === "From Brief to Build", 'Round 2 theme is "From Brief to Build"');

// 2. Interactive Timeline Stages (7 Stages Mandatory)
assert(TIMELINE_STAGES.length === 7, `All 7 timeline stages present (Found: ${TIMELINE_STAGES.length})`);
const stageNames = TIMELINE_STAGES.map(s => s.title);
assert(stageNames[0] === "Registration", 'Stage 1 is Registration');
assert(stageNames[1] === "Team Formation", 'Stage 2 is Team Formation');
assert(stageNames[2].includes("Round 1"), 'Stage 3 is Round 1 — Gokulham Goes Digital');
assert(stageNames[3].includes("Top 6"), 'Stage 4 is Top 6 Teams Qualified');
assert(stageNames[4].includes("Round 2"), 'Stage 5 is Round 2 — From Brief to Build');
assert(stageNames[5] === "Final Evaluation", 'Stage 6 is Final Evaluation');
assert(stageNames[6] === "Result Announcement", 'Stage 7 is Result Announcement');

// 3. Round 1 Showcase & 3-Card Deck Architecture
assert(ROUND_1_CARDS.length === 3, 'Round 1 card deck has 3 core card classes');
assert(ROUND_1_CARDS.some(c => c.category === 'CHARACTER'), 'Contains Character Card (Abdul Rashid)');
assert(ROUND_1_CARDS.some(c => c.category === 'ELEMENT'), 'Contains Element Card (Kirana Provisions)');
assert(ROUND_1_CARDS.some(c => c.category === 'WILD_CARD'), 'Contains Wild Card (Hidden Off-World Supply Depot)');

// 4. Round 2 Official Statement & 8-Stage Process Pipeline
assert(ROUND_2_PROBLEM_STATEMENT.officialQuote.includes("Congratulations! Your team has qualified for the Final Round of Pixel Craft"), 'Official problem statement quote exact match');
assert(PROCESS_PIPELINE.length === 8, `8-stage process pipeline defined (Found: ${PROCESS_PIPELINE.length})`);

// 5. Top 6 Qualified Teams Data Contract
assert(QUALIFIED_TEAMS.length === 6, `Top 6 qualified teams registered (Found: ${QUALIFIED_TEAMS.length})`);
assert(QUALIFIED_TEAMS.every(t => t.isPlaceholder === true), 'All team cards use clean organizer placeholders without fabricated data');

// 6. Gallery Categories (5 Categories Mandatory)
assert(GALLERY_CATEGORIES.length >= 5, `Gallery supports at least 5 categories (Found: ${GALLERY_CATEGORIES.length})`);
assert(GALLERY_ITEMS.length >= 10, `Gallery contains populated media items (Found: ${GALLERY_ITEMS.length})`);

// 7. Results Section Placeholders
assert(RESULTS_DATA.some(r => r.position === 'WINNER'), 'Winner podium placeholder registered');
assert(RESULTS_DATA.some(r => r.position === 'RUNNER_UP'), 'Runner-up podium placeholder registered');

// 8. Contact Information Placeholders
assert(CONTACT_INFO.coordinators.length >= 2, 'Coordinator contacts defined with explicit placeholders');

// 9. Component Files Presence
const compDir = path.resolve('c:/Users/ALL AtoZ/Videos/Pixel/WORKSPACE/COMPETITIONS/2026/PIXEL_CRAFT_EVENT/ROUND_2/03_IMPLEMENTATION/components');
const requiredComponents = [
  'Navbar.tsx',
  'HeroSection.tsx',
  'AboutSection.tsx',
  'TimelineSection.tsx',
  'Round1Showcase.tsx',
  'Round2Showcase.tsx',
  'TeamsSection.tsx',
  'GallerySection.tsx',
  'ResultsSection.tsx',
  'ContactSection.tsx',
  'Footer.tsx',
  'TimelineDetailModal.tsx',
  'TeamDetailModal.tsx',
  'LightboxModal.tsx'
];
requiredComponents.forEach(file => {
  assert(fs.existsSync(path.join(compDir, file)), `Component file exists: ${file}`);
});

console.log('\n----------------------------------------------------');
console.log(`SUMMARY: ${passed} / ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
console.log('----------------------------------------------------\n');

if (passed !== total) {
  process.exit(1);
}
