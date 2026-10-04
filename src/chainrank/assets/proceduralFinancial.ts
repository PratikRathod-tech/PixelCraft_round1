import * as THREE from 'three';

/**
 * Procedural 3D Financial & AML Investigation Asset Generators
 * Creates GPU-optimized Three.js groups for financial environments,
 * SOC command centers, bank security, and forensic investigation tools.
 */

// Helper to dispose geometries and materials cleanly if needed
export function disposeGroup(group: THREE.Group): void {
  group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else if (mesh.material) {
        mesh.material.dispose();
      }
    }
  });
}

// 1. BANK EXTERIOR HQ
export function createBankHQ(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'BankHQ';

  // Base plinth steps
  const step1 = new THREE.Mesh(
    new THREE.BoxGeometry(14, 0.4, 10),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.4, metalness: 0.6 })
  );
  step1.position.y = 0.2;
  group.add(step1);

  const step2 = new THREE.Mesh(
    new THREE.BoxGeometry(13, 0.4, 9),
    new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.3, metalness: 0.5 })
  );
  step2.position.y = 0.6;
  group.add(step2);

  // Pillars (8 classical/modern hybrid pillars)
  const pillarGeo = new THREE.CylinderGeometry(0.35, 0.4, 6, 16);
  const pillarMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.2, metalness: 0.4 });
  for (let x = -5.2; x <= 5.2; x += 2.6) {
    for (const z of [-3.5, 3.5]) {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 3.8, z);
      group.add(p);
    }
  }

  // Glass atrium core
  const glassGeo = new THREE.BoxGeometry(10.5, 5.8, 6.8);
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#0284c7',
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.45
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 3.8, 0);
  group.add(glass);

  // Cornice & Roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(13.6, 0.7, 9.6),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.7 })
  );
  roof.position.y = 7.15;
  group.add(roof);

  // Pediment triangle
  const pedimentGeo = new THREE.ConeGeometry(7, 2.2, 4);
  pedimentGeo.rotateY(Math.PI / 4);
  const pediment = new THREE.Mesh(
    pedimentGeo,
    new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.3, metalness: 0.8 })
  );
  pediment.position.set(0, 8.5, 0);
  pediment.scale.set(1, 1, 0.7);
  group.add(pediment);

  return group;
}

// 2. ENTRANCE PORTAL
export function createEntrancePortal(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'EntrancePortal';

  // Portal Arch frame
  const frameMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.2 });
  const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 0.4), frameMat);
  frameLeft.position.set(-1.9, 1.6, 0);
  const frameRight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 0.4), frameMat);
  frameRight.position.set(1.9, 1.6, 0);
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 0.4), frameMat);
  frameTop.position.set(0, 3.2, 0);
  group.add(frameLeft, frameRight, frameTop);

  // Sliding glass panels with cyber security tint
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#06b6d4',
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.9
  });
  const doorL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.08), glassMat);
  doorL.position.set(-0.85, 1.4, 0);
  const doorR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.08), glassMat);
  doorR.position.set(0.85, 1.4, 0);
  group.add(doorL, doorR);

  // Biometric scanner bar on portal
  const sensor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.3, 16),
    new THREE.MeshBasicMaterial({ color: '#10b981' })
  );
  sensor.rotation.z = Math.PI / 2;
  sensor.position.set(1.68, 1.4, 0.22);
  group.add(sensor);

  return group;
}

// 3. TELLER COUNTER
export function createTellerCounter(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'TellerCounter';

  // Lower counter
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.1, 1.2),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.6 })
  );
  base.position.y = 0.55;
  group.add(base);

  // Solid surface top
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.08, 1.4),
    new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.2, metalness: 0.8 })
  );
  top.position.y = 1.14;
  group.add(top);

  // Protective bullet-resistant security glass partition
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.2, 0.06),
    new THREE.MeshStandardMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3, roughness: 0.05 })
  );
  glass.position.set(0, 1.78, 0.1);
  group.add(glass);

  // Transaction tray cutout at bottom of glass
  const tray = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.04, 0.4),
    new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.9, roughness: 0.1 })
  );
  tray.position.set(0, 1.16, 0.1);
  group.add(tray);

  return group;
}

// 4. CUSTOMER DESK
export function createCustomerDesk(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CustomerDesk';

  // Desk top
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.06, 1.2),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.5 })
  );
  deskTop.position.y = 0.75;
  group.add(deskTop);

  // Desk legs
  const legMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.2 });
  const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.72, 12);
  for (const x of [-1.1, 1.1]) {
    for (const z of [-0.5, 0.5]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, 0.36, z);
      group.add(leg);
    }
  }

  // Privacy acoustic screen
  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.4, 0.04),
    new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.6 })
  );
  screen.position.set(0, 0.95, -0.58);
  group.add(screen);

  return group;
}

// 5. VAULT SECURITY DOOR
export function createVaultDoor(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'VaultDoor';

  // Massive circular vault door
  const doorGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.45, 36);
  doorGeo.rotateX(Math.PI / 2);
  const doorMat = new THREE.MeshStandardMaterial({
    color: '#334155',
    metalness: 0.95,
    roughness: 0.15
  });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, 1.8, 0);
  group.add(door);

  // Outer locking ring
  const ringGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 48);
  const ringMat = new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.9, roughness: 0.2 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, 1.8, 0.24);
  group.add(ring);

  // Radial locking bolts (8 perimeter bolts)
  const boltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 16);
  const boltMat = new THREE.MeshStandardMaterial({ color: '#f59e0b', metalness: 0.8, roughness: 0.2 });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const b = new THREE.Mesh(boltGeo, boltMat);
    b.position.set(Math.cos(angle) * 1.5, 1.8 + Math.sin(angle) * 1.5, 0.24);
    b.rotation.z = angle + Math.PI / 2;
    group.add(b);
  }

  // Central steering combination wheel
  const wheelGeo = new THREE.TorusGeometry(0.4, 0.05, 12, 32);
  const wheel = new THREE.Mesh(wheelGeo, boltMat);
  wheel.position.set(0, 1.8, 0.3);
  group.add(wheel);

  // Heavy hinge assembly
  const hinge = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 3.2, 0.6),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9, roughness: 0.2 })
  );
  hinge.position.set(-2.0, 1.8, 0);
  group.add(hinge);

  return group;
}

// 6. STANDALONE ATM
export function createStandaloneATM(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'StandaloneATM';

  // Body cabinet
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.9, 0.8),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.25 })
  );
  body.position.y = 0.95;
  group.add(body);

  // Screen display bezel
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.55, 0.42),
    new THREE.MeshBasicMaterial({ color: '#00e5ff' })
  );
  screen.position.set(0, 1.25, 0.41);
  group.add(screen);

  // Keypad
  const keypad = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.2, 0.02),
    new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.7, roughness: 0.3 })
  );
  keypad.position.set(0, 0.85, 0.41);
  group.add(keypad);

  // Cash dispenser slot
  const slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.05, 0.04),
    new THREE.MeshStandardMaterial({ color: '#020617', roughness: 0.5 })
  );
  slot.position.set(0, 0.6, 0.41);
  group.add(slot);

  // Illuminated top header sign
  const header = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.2, 0.1),
    new THREE.MeshBasicMaterial({ color: '#0ea5e9' })
  );
  header.position.set(0, 1.75, 0.38);
  group.add(header);

  return group;
}

// 7. WALL ATM
export function createWallATM(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'WallATM';

  // Wall fascia plate
  const fascia = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 1.4, 0.1),
    new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.85, roughness: 0.2 })
  );
  fascia.position.set(0, 1.3, 0.05);
  group.add(fascia);

  // Recessed screen
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.58, 0.44),
    new THREE.MeshBasicMaterial({ color: '#38bdf8' })
  );
  screen.position.set(0, 1.45, 0.11);
  group.add(screen);

  // Card slot with LED light
  const cardSlot = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.04, 0.03),
    new THREE.MeshBasicMaterial({ color: '#10b981' })
  );
  cardSlot.position.set(0.28, 1.05, 0.11);
  group.add(cardSlot);

  // Keypad
  const keypad = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.18, 0.02),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.7 })
  );
  keypad.position.set(-0.1, 1.05, 0.11);
  group.add(keypad);

  return group;
}

// 8. CCTV 360 CAMERA
export function createCCTVCamera(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CCTVCamera';

  // Mount bracket
  const bracket = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.3, 0.25),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.3 })
  );
  bracket.position.set(0, 0.15, -0.125);
  group.add(bracket);

  // Camera cylindrical housing
  const housingGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.45, 16);
  housingGeo.rotateX(Math.PI / 2);
  const housing = new THREE.Mesh(
    housingGeo,
    new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.5, roughness: 0.2 })
  );
  housing.position.set(0, 0, 0.1);
  housing.rotation.x = Math.PI / 6; // angled down
  group.add(housing);

  // Camera lens
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16),
    new THREE.MeshStandardMaterial({ color: '#090d16', roughness: 0.05, metalness: 0.95 })
  );
  lens.rotation.x = Math.PI / 2 + Math.PI / 6;
  lens.position.set(0, -0.1, 0.3);
  group.add(lens);

  // Red recording tally LED
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 8, 8),
    new THREE.MeshBasicMaterial({ color: '#ef4444' })
  );
  led.position.set(0.07, -0.06, 0.31);
  group.add(led);

  return group;
}

// 9. SECURITY TURNSTILE GATE
export function createSecurityTurnstile(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'SecurityTurnstile';

  // Dual pedestals
  const pedMat = new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.9, roughness: 0.15 });
  const pedL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.0, 1.2), pedMat);
  pedL.position.set(-0.45, 0.5, 0);
  const pedR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.0, 1.2), pedMat);
  pedR.position.set(0.45, 0.5, 0);
  group.add(pedL, pedR);

  // Retractable security glass flaps
  const flapMat = new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
    metalness: 0.9
  });
  const flapL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.04), flapMat);
  flapL.position.set(-0.16, 0.6, 0);
  const flapR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.04), flapMat);
  flapR.position.set(0.16, 0.6, 0);
  group.add(flapL, flapR);

  // RFID status indicators
  const rfidL = new THREE.Mesh(
    new THREE.PlaneGeometry(0.12, 0.12),
    new THREE.MeshBasicMaterial({ color: '#10b981' })
  );
  rfidL.rotation.x = -Math.PI / 2;
  rfidL.position.set(-0.45, 1.01, 0.35);
  group.add(rfidL);

  return group;
}

// 10. BIOMETRIC ACCESS TERMINAL
export function createBiometricTerminal(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'BiometricTerminal';

  // Wall mounted casing
  const caseMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.45, 0.06),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.2 })
  );
  caseMesh.position.y = 0.225;
  group.add(caseMesh);

  // Biometric scanner surface
  const scanner = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.16),
    new THREE.MeshBasicMaterial({ color: '#00ffcc' })
  );
  scanner.position.set(0, 0.28, 0.031);
  group.add(scanner);

  // Numeric keypad / touch area
  const keypad = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.12),
    new THREE.MeshBasicMaterial({ color: '#1e293b' })
  );
  keypad.position.set(0, 0.1, 0.031);
  group.add(keypad);

  return group;
}

// 11. ANALYST WORKSTATION
export function createAnalystWorkstation(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'AnalystWorkstation';

  // Ergonomic curved desk
  const deskMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.6 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 1.2), deskMat);
  desk.position.y = 0.75;
  group.add(desk);

  // Metal structural legs
  const legMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.85, roughness: 0.15 });
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 1.0), legMat);
  legL.position.set(-1.1, 0.36, 0);
  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 1.0), legMat);
  legR.position.set(1.1, 0.36, 0);
  group.add(legL, legR);

  // Triple monitor curved array
  const monGeo = new THREE.BoxGeometry(0.68, 0.42, 0.03);
  const monMat = new THREE.MeshStandardMaterial({ color: '#020617', roughness: 0.3 });
  const screenMat = new THREE.MeshBasicMaterial({ color: '#0284c7' });

  // Center monitor
  const monCenter = new THREE.Mesh(monGeo, monMat);
  monCenter.position.set(0, 1.15, -0.3);
  const screenCenter = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.38), screenMat);
  screenCenter.position.set(0, 1.15, -0.28);
  group.add(monCenter, screenCenter);

  // Left monitor (angled 25 deg)
  const monLeft = new THREE.Mesh(monGeo, monMat);
  monLeft.position.set(-0.65, 1.15, -0.22);
  monLeft.rotation.y = Math.PI / 8;
  const screenLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.38),
    new THREE.MeshBasicMaterial({ color: '#059669' })
  );
  screenLeft.position.set(-0.64, 1.15, -0.2);
  screenLeft.rotation.y = Math.PI / 8;
  group.add(monLeft, screenLeft);

  // Right monitor (angled -25 deg)
  const monRight = new THREE.Mesh(monGeo, monMat);
  monRight.position.set(0.65, 1.15, -0.22);
  monRight.rotation.y = -Math.PI / 8;
  const screenRight = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.38),
    new THREE.MeshBasicMaterial({ color: '#dc2626' })
  );
  screenRight.position.set(0.64, 1.15, -0.2);
  screenRight.rotation.y = -Math.PI / 8;
  group.add(monRight, screenRight);

  // Monitor stand
  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.35, 12),
    legMat
  );
  stand.position.set(0, 0.93, -0.3);
  group.add(stand);

  return group;
}

// 12. MULTI-MONITOR SOC COMMAND DESK
export function createMultiMonitorDesk(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MultiMonitorDesk';

  const baseDesk = createAnalystWorkstation();
  group.add(baseDesk);

  // Overhead command telemetry display
  const bigScreenGeo = new THREE.BoxGeometry(1.8, 0.65, 0.04);
  const bigScreenMat = new THREE.MeshStandardMaterial({ color: '#090d16', metalness: 0.9 });
  const bigScreen = new THREE.Mesh(bigScreenGeo, bigScreenMat);
  bigScreen.position.set(0, 1.85, -0.35);

  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(1.74, 0.6),
    new THREE.MeshBasicMaterial({ color: '#00f0ff' })
  );
  display.position.set(0, 1.85, -0.32);
  group.add(bigScreen, display);

  return group;
}

// 13. INVESTIGATION TERMINAL (RUGGED FORENSIC CASE)
export function createInvestigationTerminal(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'InvestigationTerminal';

  // Pelican-style rugged casing base
  const caseBottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.1, 0.45),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.8, metalness: 0.3 })
  );
  caseBottom.position.y = 0.05;
  group.add(caseBottom);

  // Rugged case lid (open at 105 deg)
  const caseLid = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.04, 0.45),
    new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.8, metalness: 0.3 })
  );
  caseLid.position.set(0, 0.28, -0.22);
  caseLid.rotation.x = Math.PI / 2.5;
  group.add(caseLid);

  // High-contrast forensic display
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.36),
    new THREE.MeshBasicMaterial({ color: '#00ffcc' })
  );
  screen.position.set(0, 0.28, -0.20);
  screen.rotation.x = Math.PI / 2.5;
  group.add(screen);

  // Tactical keyboard
  const kb = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.02, 0.2),
    new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.5 })
  );
  kb.position.set(0, 0.11, 0.05);
  group.add(kb);

  return group;
}

// 14. EVIDENCE TABLE
export function createEvidenceTable(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'EvidenceTable';

  // Table top with recessed forensic light-box
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.12, 1.4),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.2 })
  );
  top.position.y = 0.84;
  group.add(top);

  // Illuminated inspection glass inset
  const lightBox = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 0.9),
    new THREE.MeshBasicMaterial({ color: '#e0f2fe' })
  );
  lightBox.rotation.x = -Math.PI / 2;
  lightBox.position.set(0, 0.91, 0);
  group.add(lightBox);

  // Table legs
  const legMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9 });
  for (const x of [-1.2, 1.2]) {
    for (const z of [-0.6, 0.6]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 12), legMat);
      leg.position.set(x, 0.4, z);
      group.add(leg);
    }
  }

  return group;
}

// 15. CASE INVESTIGATION BOARD
export function createCaseBoard(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CaseBoard';

  // Cork/Whiteboard board frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.0, 0.08),
    new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.7, roughness: 0.3 })
  );
  frame.position.y = 1.8;
  group.add(frame);

  // Board canvas
  const canvas = new THREE.Mesh(
    new THREE.PlaneGeometry(3.0, 1.8),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.9 })
  );
  canvas.position.set(0, 1.8, 0.045);
  group.add(canvas);

  // Pinned evidence cards & connection strings
  const cardMat1 = new THREE.MeshBasicMaterial({ color: '#ef4444' });
  const cardMat2 = new THREE.MeshBasicMaterial({ color: '#38bdf8' });
  const cardMat3 = new THREE.MeshBasicMaterial({ color: '#f59e0b' });

  const card1 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.22), cardMat1);
  card1.position.set(-0.9, 2.2, 0.05);
  const card2 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.22), cardMat2);
  card2.position.set(0.8, 2.1, 0.05);
  const card3 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.26), cardMat3);
  card3.position.set(0.0, 1.4, 0.05);
  group.add(card1, card2, card3);

  // Connection red line
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.9, 2.2, 0.06),
    new THREE.Vector3(0.0, 1.4, 0.06),
    new THREE.Vector3(0.8, 2.1, 0.06)
  ]);
  const lineMat = new THREE.LineBasicMaterial({ color: '#ef4444' });
  group.add(new THREE.Line(lineGeo, lineMat));

  return group;
}

// 16. SERVER RACK 42U
export function createServerRack42U(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ServerRack42U';

  // Server enclosure cabinet
  const cabinet = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 2.2, 1.0),
    new THREE.MeshStandardMaterial({ color: '#090d16', metalness: 0.85, roughness: 0.3 })
  );
  cabinet.position.y = 1.1;
  group.add(cabinet);

  // Ventilated perforated front door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 2.05),
    new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.4,
      metalness: 0.9,
      wireframe: true
    })
  );
  door.position.set(0, 1.1, 0.51);
  group.add(door);

  // Server blades with blinking status LEDs
  const ledColors = ['#10b981', '#38bdf8', '#f59e0b', '#ef4444'];
  for (let y = 0.25; y < 2.0; y += 0.18) {
    // Blade faceplate
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.12, 0.02),
      new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.2 })
    );
    blade.position.set(0, y, 0.48);
    group.add(blade);

    // Status LED dots
    const col = ledColors[Math.floor(Math.random() * ledColors.length)];
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 8, 8),
      new THREE.MeshBasicMaterial({ color: col })
    );
    led.position.set(0.32, y, 0.495);
    group.add(led);
  }

  return group;
}

// 17. NETWORK SWITCH RACK
export function createNetworkSwitch(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'NetworkSwitch';

  // 1U Rackmount chassis
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.08, 0.5),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.2 })
  );
  chassis.position.y = 0.04;
  group.add(chassis);

  // Front RJ45 port array
  const portMat = new THREE.MeshBasicMaterial({ color: '#10b981' });
  for (let x = -0.35; x <= 0.35; x += 0.05) {
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.01), portMat);
    port.position.set(x, 0.04, 0.255);
    group.add(port);
  }

  return group;
}

// 18. CORE ROUTER
export function createCoreRouter(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CoreRouter';

  // 4U enterprise router body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.32, 0.6),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9, roughness: 0.25 })
  );
  body.position.y = 0.16;
  group.add(body);

  // Optical expansion ports
  const optMat = new THREE.MeshBasicMaterial({ color: '#00f0ff' });
  for (let x = -0.3; x <= 0.3; x += 0.1) {
    const opt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12), optMat);
    opt.rotation.x = Math.PI / 2;
    opt.position.set(x, 0.16, 0.31);
    group.add(opt);
  }

  return group;
}

// 19. CABLE BUNDLES (CYBER FORENSIC CONDUITS)
export function createCableBundles(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CableBundles';

  const curve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.0, 0.05, -0.5),
    new THREE.Vector3(-0.3, 0.1, 0.0),
    new THREE.Vector3(0.4, 0.05, 0.2),
    new THREE.Vector3(1.2, 0.05, 0.5)
  ]);
  const tube1 = new THREE.Mesh(
    new THREE.TubeGeometry(curve1, 32, 0.03, 8, false),
    new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.5 })
  );

  const curve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.0, 0.05, -0.45),
    new THREE.Vector3(-0.25, 0.12, 0.05),
    new THREE.Vector3(0.45, 0.06, 0.25),
    new THREE.Vector3(1.2, 0.05, 0.55)
  ]);
  const tube2 = new THREE.Mesh(
    new THREE.TubeGeometry(curve2, 32, 0.025, 8, false),
    new THREE.MeshBasicMaterial({ color: '#f59e0b' })
  );

  group.add(tube1, tube2);
  return group;
}

// 20. EXECUTIVE OFFICE DESK
export function createExecutiveOfficeDesk(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ExecutiveOfficeDesk';

  // Heavy dark mahogany/slate modern executive desk
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.08, 1.2),
    new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.3, metalness: 0.7 })
  );
  top.position.y = 0.76;
  group.add(top);

  // Pedestal drawers (left)
  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.68, 1.0),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.4, metalness: 0.5 })
  );
  pedestal.position.set(-0.9, 0.36, 0);
  group.add(pedestal);

  // Right structural leg
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.72, 1.0),
    new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.8 })
  );
  leg.position.set(1.15, 0.36, 0);
  group.add(leg);

  return group;
}

// 21. ERGONOMIC CHAIR
export function createErgonomicChair(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ErgonomicChair';

  // Base 5-star spider
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.06, 5),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9 })
  );
  base.position.y = 0.08;
  group.add(base);

  // Piston shaft
  const piston = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.38, 12),
    new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.95 })
  );
  piston.position.y = 0.28;
  group.add(piston);

  // Seat cushion
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.08, 0.52),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.7 })
  );
  seat.position.y = 0.5;
  group.add(seat);

  // Mesh backrest
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.65, 0.05),
    new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.8 })
  );
  back.position.set(0, 0.85, -0.24);
  back.rotation.x = -Math.PI / 24;
  group.add(back);

  return group;
}

// 22. FILE CABINET
export function createFileCabinet(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'FileCabinet';

  // Steel body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.35, 0.6),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.3 })
  );
  body.position.y = 0.675;
  group.add(body);

  // 4 Drawers
  const handleMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.9 });
  for (let y = 0.2; y <= 1.15; y += 0.31) {
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.03), handleMat);
    handle.position.set(0, y, 0.315);
    group.add(handle);
  }

  return group;
}

// 23. EVIDENCE LOCKER
export function createEvidenceLocker(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'EvidenceLocker';

  // High-security locker compartment
  const locker = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1.8, 0.5),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9, roughness: 0.2 })
  );
  locker.position.y = 0.9;
  group.add(locker);

  // Digital combination keypad & lock
  const lock = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.16, 0.03),
    new THREE.MeshBasicMaterial({ color: '#ef4444' })
  );
  lock.position.set(0.15, 1.1, 0.265);
  group.add(lock);

  return group;
}

// 24. MEETING TABLE
export function createMeetingTable(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MeetingTable';

  // Long conference top
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.08, 1.4),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.25, metalness: 0.7 })
  );
  top.position.y = 0.75;
  group.add(top);

  // Dual pedestal supports
  const pedMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9 });
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.71, 16), pedMat);
  p1.position.set(-1.2, 0.355, 0);
  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.71, 16), pedMat);
  p2.position.set(1.2, 0.355, 0);
  group.add(p1, p2);

  // Center cable well
  const well = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.2),
    new THREE.MeshBasicMaterial({ color: '#00f0ff' })
  );
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, 0.795, 0);
  group.add(well);

  return group;
}

// 25. EVIDENCE FOLDER / PROPS
export function createEvidenceFolder(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'EvidenceFolder';

  // Manila / Red confidential folder
  const folder = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.03, 0.26),
    new THREE.MeshStandardMaterial({ color: '#991b1b', roughness: 0.8 })
  );
  folder.position.y = 0.015;
  group.add(folder);

  // Top confidential stamp label
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.08),
    new THREE.MeshBasicMaterial({ color: '#fef08a' })
  );
  label.rotation.x = -Math.PI / 2;
  label.position.set(0, 0.031, 0);
  group.add(label);

  return group;
}

// 26. TRANSACTION DOSSIER
export function createTransactionDossier(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'TransactionDossier';

  // Thick stack of transaction printouts
  const stack = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.08, 0.22),
    new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.9 })
  );
  stack.position.y = 0.04;
  group.add(stack);

  // Forensic yellow sticky note
  const sticky = new THREE.Mesh(
    new THREE.PlaneGeometry(0.08, 0.08),
    new THREE.MeshBasicMaterial({ color: '#facc15' })
  );
  sticky.rotation.x = -Math.PI / 2;
  sticky.position.set(0.06, 0.081, 0.04);
  group.add(sticky);

  return group;
}

// 27. FORENSIC ID BADGE
export function createForensicIDBadge(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ForensicIDBadge';

  // Plastic badge card
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.18, 0.005),
    new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.3 })
  );
  card.position.y = 0.09;
  group.add(card);

  // Chip / Photo area
  const chip = new THREE.Mesh(
    new THREE.PlaneGeometry(0.06, 0.06),
    new THREE.MeshBasicMaterial({ color: '#f59e0b' })
  );
  chip.position.set(0, 0.12, 0.004);
  group.add(chip);

  return group;
}

// 28. FORENSIC LAPTOP
export function createForensicLaptop(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ForensicLaptop';

  // Base chassis
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.015, 0.25),
    new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.8, roughness: 0.3 })
  );
  base.position.y = 0.0075;
  group.add(base);

  // Screen lid (open at 110 deg)
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.01, 0.25),
    new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.85 })
  );
  lid.position.set(0, 0.125, -0.125);
  lid.rotation.x = Math.PI / 2.3;
  group.add(lid);

  // Display screen with AML graph green/cyan glowing glow
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.33, 0.22),
    new THREE.MeshBasicMaterial({ color: '#10b981' })
  );
  screen.position.set(0, 0.125, -0.118);
  screen.rotation.x = Math.PI / 2.3;
  group.add(screen);

  return group;
}

// 29. SOC RAISED FLOOR MODULE
export function createSOCRaisedFloor(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'SOCRaisedFloor';

  // Heavy server floor tile
  const tile = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.06, 1.2),
    new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.5, metalness: 0.5 })
  );
  tile.position.y = 0.03;
  group.add(tile);

  // Cyber edge accent line
  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 0.06, 1.2)),
    new THREE.LineBasicMaterial({ color: '#00f0ff' })
  );
  edge.position.y = 0.03;
  group.add(edge);

  return group;
}

// 30. SECURITY AIRLOCK DOOR
export function createSecurityAirlock(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'SecurityAirlock';

  // Frame enclosure
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.8, 1.8),
    new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.4, metalness: 0.7 })
  );
  frame.position.y = 1.4;
  group.add(frame);

  // Pressurized security doors on both ends
  const doorMat = new THREE.MeshStandardMaterial({
    color: '#0284c7',
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.9
  });
  const door1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.4, 0.08), doorMat);
  door1.position.set(0, 1.4, -0.85);
  const door2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.4, 0.08), doorMat);
  door2.position.set(0, 1.4, 0.85);
  group.add(door1, door2);

  return group;
}

// 31. CEILING LIGHT GRID
export function createCeilingLightGrid(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'CeilingLightGrid';

  const fixture = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.05, 0.6),
    new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.8 })
  );
  fixture.position.y = 0.025;

  const diffuser = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 0.5),
    new THREE.MeshBasicMaterial({ color: '#ffffff' })
  );
  diffuser.rotation.x = Math.PI / 2;
  diffuser.position.y = -0.001;

  group.add(fixture, diffuser);
  return group;
}

// Central generator registry map for dynamic instantiation
export const proceduralGeneratorMap: Record<string, () => THREE.Group> = {
  createBankHQ,
  createEntrancePortal,
  createTellerCounter,
  createCustomerDesk,
  createVaultDoor,
  createStandaloneATM,
  createWallATM,
  createCCTVCamera,
  createSecurityTurnstile,
  createBiometricTerminal,
  createAnalystWorkstation,
  createMultiMonitorDesk,
  createInvestigationTerminal,
  createEvidenceTable,
  createCaseBoard,
  createServerRack42U,
  createNetworkSwitch,
  createCoreRouter,
  createCableBundles,
  createExecutiveOfficeDesk,
  createErgonomicChair,
  createFileCabinet,
  createEvidenceLocker,
  createMeetingTable,
  createEvidenceFolder,
  createTransactionDossier,
  createForensicIDBadge,
  createForensicLaptop,
  createSOCRaisedFloor,
  createSecurityAirlock,
  createCeilingLightGrid
};
