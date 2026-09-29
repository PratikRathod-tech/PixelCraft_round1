import fs from 'fs';
import path from 'path';
import { normalProducts } from '../data/normalProducts';
import { secretProducts } from '../data/secretProducts';
import { ABDUL_STORE_INFO, ANOMALY_CLUES, MANIFEST_LOGS } from '../data/cluesAndLogs';

console.log('====================================================');
console.log('PIXELCRAFT ARMORY — ROUND 1 PROMPT 05 & WELCOME INTRO VERIFICATION');
console.log('Abdul\'s General Store & Off-World Supply');
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

const compDir = path.resolve('c:/Users/ALL AtoZ/Videos/Pixel/WORKSPACE/COMPETITIONS/2026/ABDULS_GENERAL_STORE/ROUND_1');
const componentsDir = path.join(compDir, '03_IMPLEMENTATION', 'components');
const implDir = path.join(compDir, '03_IMPLEMENTATION');

// 1. AbdulsWelcomeIntro File Presence and Integrity
const welcomeFile = path.join(componentsDir, 'AbdulsWelcomeIntro.tsx');
assert(fs.existsSync(welcomeFile), 'AbdulsWelcomeIntro.tsx component file exists');

const welcomeContent = fs.readFileSync(welcomeFile, 'utf8');
assert(welcomeContent.includes('SHOP NO. 7 • GALI MIR JUMLA'), 'Welcome intro includes authentic Shop No. 7 Old Delhi signboard');
assert(welcomeContent.includes('1420.405 MHz'), 'Welcome intro embeds 1420.405 MHz carrier wave secret flicker');
assert(welcomeContent.includes('brass-lantern-3d'), 'Welcome intro features 3D Brass Counter Lamp preview');
assert(welcomeContent.includes('playShopBell'), 'Welcome intro features synthesized Web Audio shop bell');
assert(welcomeContent.includes('Enter Store'), 'Welcome intro includes instant skip button');

// 2. AbdulsStoreApp Welcome Intro Integration
const storeAppFile = path.join(implDir, 'AbdulsStoreApp.tsx');
const storeAppContent = fs.readFileSync(storeAppFile, 'utf8');
assert(storeAppContent.includes('AbdulsWelcomeIntro'), 'AbdulsStoreApp imports and integrates AbdulsWelcomeIntro');
assert(storeAppContent.includes('sessionStorage'), 'AbdulsStoreApp manages intro state with session storage memory');

// 3. Motion System & 3D Interactive Counter Verification
const counter3dFile = path.join(componentsDir, 'StoreCounter3D.tsx');
assert(fs.existsSync(counter3dFile), 'StoreCounter3D.tsx exists for interactive 3D counter experience');

const productDetailModalFile = path.join(componentsDir, 'ProductDetailModal.tsx');
const alienDetailModalFile = path.join(componentsDir, 'AlienDetailModal.tsx');
assert(fs.existsSync(productDetailModalFile), 'ProductDetailModal.tsx exists with 3D inspection modal');
assert(fs.existsSync(alienDetailModalFile), 'AlienDetailModal.tsx exists with 3D xenotech holographic inspection');

// 4. Motion Specification Document Verification
const motionDocFile = path.join(compDir, 'ROUND_1_MOTION_SYSTEM.md');
assert(fs.existsSync(motionDocFile), 'ROUND_1_MOTION_SYSTEM.md documentation exists');

// 5. Normal and Secret Product Continuity
assert(normalProducts.length >= 8, `Normal catalog intact (${normalProducts.length} items)`);
assert(secretProducts.length >= 6, `Secret catalog intact (${secretProducts.length} items)`);

console.log('\n----------------------------------------------------');
console.log(`SUMMARY: ${passed} / ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
console.log('-----------------------------------------------------\n');

if (passed !== total) {
  process.exit(1);
}
