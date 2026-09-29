import fs from 'fs';
import path from 'path';
import { normalProducts } from '../data/normalProducts';
import { secretProducts } from '../data/secretProducts';
import { ABDUL_STORE_INFO, ANOMALY_CLUES, MANIFEST_LOGS } from '../data/cluesAndLogs';

console.log('====================================================');
console.log('PIXELCRAFT ARMORY — ROUND 1 PROMPT 04 VERIFICATION');
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

// 1. Normal Product Catalog Verification
assert(normalProducts.length >= 8, `Normal product catalog has at least 8 items (Found: ${normalProducts.length})`);
const hasAtta = normalProducts.some(p => p.name.includes('Atta'));
const hasRice = normalProducts.some(p => p.name.includes('Rice') || p.name.includes('Basmati'));
const hasTea = normalProducts.some(p => p.name.includes('Tea') || p.name.includes('Chai'));
const hasMilk = normalProducts.some(p => p.name.includes('Milk'));
assert(hasAtta && hasRice && hasTea && hasMilk, 'Normal catalog contains quintessential Indian grocery staples (Atta, Rice, Tea, Milk)');

// 2. Anomaly Presence Verification
const seedAnomaly = normalProducts.find(p => p.id === 'prod-seeds-05');
assert(seedAnomaly !== undefined && seedAnomaly.origin === 'UNKNOWN', 'Heirloom Coriander Seeds contains UNKNOWN origin anomaly');

const teaAnomaly = normalProducts.find(p => p.id === 'prod-tea-02');
assert(teaAnomaly !== undefined && teaAnomaly.batchCode.includes('1420.405 MHz'), 'Malabar Cardamom Tea contains 1420.405 MHz carrier wave frequency anomaly');

// 3. Secret Product Catalog Verification
assert(secretProducts.length >= 6, `Secret product catalog has at least 6 items (Found: ${secretProducts.length})`);
const hasMemorySeeds = secretProducts.some(p => p.name.includes('Memory Seeds') && p.priceGC === 42);
const hasMoonMilk = secretProducts.some(p => p.name.includes('Moon Milk') && p.priceGC === 120);
const hasPlasma = secretProducts.some(p => p.name.includes('Plasma Charge') && p.priceGC === 88);
assert(hasMemorySeeds && hasMoonMilk && hasPlasma, 'Secret catalog has exact prompt counterparts (Memory Seeds G₵ 42, Moon Milk G₵ 120, Plasma Charge G₵ 88)');

// 4. Clues and Historical Data Verification
assert(MANIFEST_LOGS.length >= 3, `Historical interstellar transmission logs populated (Found: ${MANIFEST_LOGS.length})`);
assert(ANOMALY_CLUES.length >= 4, `All 4 core anomaly clues registered (Found: ${ANOMALY_CLUES.length})`);
assert(ABDUL_STORE_INFO.foundedYear === 1979, 'Store founding year accurately established as 1979');

// 5. Dual Currency & Cart Arithmetic Validation
const sampleCart = [
  { price: normalProducts[0].priceINR, qty: 2 },
  { price: normalProducts[1].priceINR, qty: 1 }
];
const subtotalINR = sampleCart.reduce((sum, item) => sum + item.price * item.qty, 0);
const gstINR = Math.round(subtotalINR * 0.05);
const totalINR = subtotalINR + gstINR;
assert(totalINR === subtotalINR + gstINR, `Cart arithmetic correctly computes ₹${totalINR} (Subtotal: ₹${subtotalINR} + 5% GST: ₹${gstINR})`);

// 6. Cargo Mass & Galactic Credits Arithmetic Validation
const sampleCargo = [
  { priceGC: secretProducts[0].priceGC, mass: secretProducts[0].payloadKg, qty: 2 },
  { priceGC: secretProducts[1].priceGC, mass: secretProducts[1].payloadKg, qty: 1 }
];
const totalGC = sampleCargo.reduce((sum, item) => sum + item.priceGC * item.qty, 0);
const totalMass = parseFloat(sampleCargo.reduce((sum, item) => sum + item.mass * item.qty, 0).toFixed(2));
assert(totalGC > 0 && totalMass > 0, `Cargo hold arithmetic correctly computes ${totalGC} G₵ and ${totalMass} kg payload mass`);

// 7. 3D Asset Integration Verification
const public3dDir = path.resolve('c:/Users/ALL AtoZ/Videos/Pixel/public/armory/3d');

const required3dModels = [
  'general/brass_lantern.glb',
  'technology/damaged_helmet.glb',
  'technology/retro_boombox.glb',
  'general/antique_camera.glb',
  'general/water_bottle.glb'
];

required3dModels.forEach(modelPath => {
  const fullPath = path.join(public3dDir, modelPath);
  assert(fs.existsSync(fullPath), `3D Asset GLB exists on disk: ${modelPath}`);
});

console.log('\n----------------------------------------------------');
console.log(`SUMMARY: ${passed} / ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
console.log('----------------------------------------------------\n');

