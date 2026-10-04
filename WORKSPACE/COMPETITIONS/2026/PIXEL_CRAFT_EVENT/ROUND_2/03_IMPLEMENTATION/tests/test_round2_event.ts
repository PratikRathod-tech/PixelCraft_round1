import fs from 'fs';
import path from 'path';
import { EVENT_INFO } from '../data/event';
import { TIMELINE_STAGES } from '../data/timeline';
import { ROUND_1_CARDS } from '../data/round1';
import { ROUND_2_PROBLEM_STATEMENT, PROCESS_PIPELINE } from '../data/round2';
import { QUALIFIED_TEAMS } from '../data/teams';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/gallery';
import { RESULTS_DATA } from '../data/results';
import { CONTACT_INFO } from '../data/contact';
import { QUALIFIED_PROJECTS } from '../data/winningWebsites';
import { COMPETITION_RULES, SUBMISSION_CHECKLIST } from '../data/requirements';
import { SPONSORS_DATA } from '../data/sponsors';
import { ROUND_1_CARDS_ARCHIVE } from '../data/cards';
import {
  INITIAL_REGISTRATION_DATA,
  YEAR_OF_STUDY_OPTIONS,
  REFERRAL_SOURCE_OPTIONS
} from '../data/registration';
import { registrationService } from '../services/registrationService';

console.log('====================================================');
console.log('PIXELCRAFT ARMORY — FULL SYSTEM AUDIT & REGISTRATION');
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

// 1. Event Branding & Tagline
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

// 3. Round 1 Card Archive (Official Cards from cards_and_images)
assert(ROUND_1_CARDS_ARCHIVE.length === 8, `Round 1 Card Archive contains 8 official artifacts (Found: ${ROUND_1_CARDS_ARCHIVE.length})`);
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Abdul")), 'Contains Abdul Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Jethalal")), 'Contains Jethalal Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Madhavi")), 'Contains Madhavi Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Sodhi")), 'Contains Sodhi Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Hathi")), 'Contains Dr. Hathi Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.title.includes("Ratan")), 'Contains Ratan Challenge Card');
assert(ROUND_1_CARDS_ARCHIVE.some(c => c.category === "Wild Card / Surprise Element"), 'Contains Surprise Element Card');

// 4. Round 1 Showcase & 3-Card Deck Architecture
assert(ROUND_1_CARDS.length === 3, 'Round 1 card deck has 3 core card classes');

// 5. Round 2 Official Statement & 8-Stage Process Pipeline
assert(ROUND_2_PROBLEM_STATEMENT.officialQuote.includes("Congratulations! Your team has qualified for the Final Round of Pixel Craft"), 'Official problem statement quote exact match');
assert(PROCESS_PIPELINE.length === 8, `8-stage process pipeline defined (Found: ${PROCESS_PIPELINE.length})`);

// 6. Top 6 Qualified Teams Data Contract (Official Verification)
assert(QUALIFIED_TEAMS.length === 6, `Top 6 qualified teams registered (Found: ${QUALIFIED_TEAMS.length})`);
const characters = QUALIFIED_TEAMS.map(t => t.character);
assert(characters.includes("Abdul"), 'Team 1 is Abdul (Pratik Rathod, Nagesh Gadale, Sandesh Patil - WCE)');
assert(characters.includes("Madhavi Bhide"), 'Team 2 is Madhavi Bhide (Aditya Gudage, Shilpa Jagganawar - BSIET)');
assert(characters.includes("Sodhi"), 'Team 3 is Sodhi (Govind Adaki, Deepa Hiremath - SIT)');
assert(characters.includes("Hathi"), 'Team 4 is Hathi (Jinayak Kumbhar, Atharav Patil, Navnath Mane - Bharat Vidhya)');
assert(characters.includes("Jethalal"), 'Team 5 is Jethalal (Ajinkya Domane, Omkar Shembade, Harshad Mane - ADCET)');
assert(characters.includes("Ratan"), 'Team 6 is Ratan (Diya Shirke, Pratiksha Kakadgonda, Sayeda Tamboli - ADCET)');

// 7. Round 1 Real Project Links Verification
assert(QUALIFIED_PROJECTS.length === 6, `All 6 real Round 1 projects registered (Found: ${QUALIFIED_PROJECTS.length})`);
const urls = QUALIFIED_PROJECTS.map(p => p.liveUrl);
assert(urls.includes("https://pixelcraft-round1.vercel.app/"), 'Abdul project URL verified');
assert(urls.includes("https://gada-electronics-cyberpunk-jethalal-voice-vault.ai.studio/"), 'Jethalal project URL verified');
assert(urls.includes("https://cavetokitchen.netlify.app"), 'Madhavi Bhide project URL verified');
assert(urls.includes("https://neuroversetmkoc.vercel.app/"), 'Sodhi project URL verified');
assert(urls.includes("https://dr-hathi-healhcare-clinic.vercel.app/"), 'Dr. Hathi project URL verified');
assert(urls.includes("https://ratan-saree123.vercel.app"), 'Ratan project URL verified');

// 8. Gallery with Actual Photographs
assert(GALLERY_CATEGORIES.length >= 5, `Gallery supports at least 5 categories (Found: ${GALLERY_CATEGORIES.length})`);
assert(GALLERY_ITEMS.length === 10, `Gallery contains 10 real event photos (Found: ${GALLERY_ITEMS.length})`);

// 9. Registration Data Models & Configuration
assert(YEAR_OF_STUDY_OPTIONS.length >= 4, `Year of study options available (Found: ${YEAR_OF_STUDY_OPTIONS.length})`);
assert(REFERRAL_SOURCE_OPTIONS.length >= 4, `Referral source options available (Found: ${REFERRAL_SOURCE_OPTIONS.length})`);
assert(INITIAL_REGISTRATION_DATA.teamSize >= 2, 'Default team size configured (>= 2 members)');

// 10. Registration Service Prototype Logic
assert(typeof registrationService.submitRegistration === 'function', 'Registration service submission function exists');

// 11. Component Files Presence (All 28 UI, Modal & Registration Components)
const compDir = path.resolve('c:/Users/ALL AtoZ/Videos/Pixel/WORKSPACE/COMPETITIONS/2026/PIXEL_CRAFT_EVENT/ROUND_2/03_IMPLEMENTATION/components');
const requiredComponents = [
  'Navbar.tsx',
  'HeroSection.tsx',
  'AboutSection.tsx',
  'TimelineSection.tsx',
  'Round1Showcase.tsx',
  'Round1CardArchive.tsx',
  'Round2Showcase.tsx',
  'WinningWebsitesSection.tsx',
  'RequirementsSection.tsx',
  'HostingSection.tsx',
  'SponsorsSection.tsx',
  'TeamsSection.tsx',
  'GallerySection.tsx',
  'ResultsSection.tsx',
  'ContactSection.tsx',
  'Footer.tsx',
  'TimelineDetailModal.tsx',
  'TeamDetailModal.tsx',
  'LightboxModal.tsx',
  'VoxelLoadingIntro.tsx',
  'registration/RegistrationPage.tsx',
  'registration/RegistrationProgress.tsx',
  'registration/RegistrationStepIdentity.tsx',
  'registration/RegistrationStepTeam.tsx',
  'registration/RegistrationStepReview.tsx',
  'registration/RegistrationSuccess.tsx'
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
