import * as THREE from 'three';
import { RiskLevel } from '../../types/three';
import { getNodeColor } from '../materials/proceduralMaterials';

/**
 * Procedural 3D Primitive Generator Library for ChainRank-AML.
 * Generates GPU-optimized procedural geometries representing financial entities.
 */

export function createBank(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ProceduralBankHQ';

  // Base plinth
  const plinthGeo = new THREE.BoxGeometry(10, 0.8, 8);
  const plinthMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.8 });
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = 0.4;
  group.add(plinth);

  // Pillars (8 institutional pillars)
  const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 5, 12);
  const pillarMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.2, metalness: 0.5 });
  for (let x = -4; x <= 4; x += 2.6) {
    for (let z of [-3, 3]) {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 3.3, z);
      group.add(p);
    }
  }

  // Roof entablature & pediment
  const roofGeo = new THREE.BoxGeometry(10.4, 0.6, 8.4);
  const roof = new THREE.Mesh(roofGeo, plinthMat);
  roof.position.y = 6.1;
  group.add(roof);

  // Pediment triangle
  const pedimentGeo = new THREE.ConeGeometry(5.5, 2.0, 4);
  pedimentGeo.rotateY(Math.PI / 4);
  const pediment = new THREE.Mesh(pedimentGeo, plinthMat);
  pediment.position.set(0, 7.3, 0);
  pediment.scale.set(1, 1, 0.8);
  group.add(pediment);

  return group;
}

export function createBuilding(width = 4, height = 12, depth = 4, color = '#1e293b'): THREE.Group {
  const group = new THREE.Group();
  const bldgGeo = new THREE.BoxGeometry(width, height, depth);
  const bldgMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.3,
    metalness: 0.7
  });
  const bldg = new THREE.Mesh(bldgGeo, bldgMat);
  bldg.position.y = height / 2;
  group.add(bldg);

  // Window grid accent lines
  const edgeGeo = new THREE.EdgesGeometry(bldgGeo);
  const edgeMat = new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.3 });
  const edges = new THREE.LineSegments(edgeGeo, edgeMat);
  edges.position.copy(bldg.position);
  group.add(edges);

  return group;
}

export function createATM(): THREE.Group {
  const group = new THREE.Group();
  const bodyGeo = new THREE.BoxGeometry(1.2, 2.2, 1.0);
  const bodyMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.8, roughness: 0.2 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.1;
  group.add(body);

  // Screen
  const screenGeo = new THREE.PlaneGeometry(0.8, 0.6);
  const screenMat = new THREE.MeshBasicMaterial({ color: '#00f0ff' });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.4, 0.51);
  group.add(screen);

  return group;
}

export function createAccountNode(riskLevel: RiskLevel = 'NORMAL', radius = 0.8): THREE.Mesh {
  const color = getNodeColor(riskLevel);
  const geo = new THREE.SphereGeometry(radius, 24, 24);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.2,
    metalness: 0.6,
    emissive: riskLevel === 'HIGH' || riskLevel === 'CRITICAL' ? color : new THREE.Color(0),
    emissiveIntensity: 0.3
  });
  return new THREE.Mesh(geo, mat);
}

export function createRiskNode(radius = 1.2): THREE.Group {
  const group = new THREE.Group();
  const core = createAccountNode('CRITICAL', radius);
  group.add(core);

  // Pulsing outer halo ring
  const ringGeo = new THREE.RingGeometry(radius * 1.4, radius * 1.6, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: '#ef4444',
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  return group;
}

export function createTransactionLine(start: THREE.Vector3, end: THREE.Vector3, isHighValue = false): THREE.Line {
  const points = [start, end];
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: isHighValue ? '#f59e0b' : '#334155',
    transparent: true,
    opacity: isHighValue ? 0.8 : 0.4
  });
  return new THREE.Line(geo, mat);
}

export function createMuleCluster(centroid: THREE.Vector3, radius = 5, nodeCount = 8): THREE.Group {
  const group = new THREE.Group();
  group.position.copy(centroid);

  // Semi-transparent cluster bubble
  const sphereGeo = new THREE.SphereGeometry(radius, 16, 16);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: '#ef4444',
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  group.add(new THREE.Mesh(sphereGeo, sphereMat));

  // Child nodes distributed radially
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const r = radius * 0.7 * Math.sqrt(Math.random());
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (Math.random() - 0.5) * 2;

    const node = createAccountNode(i === 0 ? 'CRITICAL' : 'HIGH', 0.5);
    node.position.set(x, y, z);
    group.add(node);
  }

  return group;
}

export function createCandidateGraph(chainNodes: THREE.Vector3[]): THREE.Group {
  const group = new THREE.Group();
  for (let i = 0; i < chainNodes.length; i++) {
    const node = createAccountNode(i === 0 ? 'HIGH' : 'NORMAL', 0.6);
    node.position.copy(chainNodes[i]);
    group.add(node);

    if (i < chainNodes.length - 1) {
      const line = createTransactionLine(chainNodes[i], chainNodes[i + 1], true);
      group.add(line);
    }
  }
  return group;
}

export function createTracePath(waypoints: THREE.Vector3[]): THREE.Group {
  const group = new THREE.Group();
  if (waypoints.length < 2) return group;

  const curve = new THREE.CatmullRomCurve3(waypoints);
  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.15, 8, false);
  const tubeMat = new THREE.MeshStandardMaterial({
    color: '#00ffcc',
    emissive: '#00ffcc',
    emissiveIntensity: 0.9,
    roughness: 0.2
  });
  group.add(new THREE.Mesh(tubeGeo, tubeMat));

  return group;
}

export function createFinancialDistrict(): THREE.Group {
  const district = new THREE.Group();
  district.add(createBank());

  // Perimeter towers
  const coords = [
    [-18, 0, -15, 6, 20, 6],
    [18, 0, -15, 7, 24, 7],
    [-20, 0, 15, 5, 16, 5],
    [20, 0, 15, 8, 28, 8]
  ];

  coords.forEach(([x, y, z, w, h, d]) => {
    const bldg = createBuilding(w, h, d);
    bldg.position.set(x, y, z);
    district.add(bldg);
  });

  return district;
}

export function createRoadNetwork(size = 80): THREE.Group {
  const group = new THREE.Group();
  const roadMat = new THREE.MeshStandardMaterial({ color: '#090d16', roughness: 0.8 });

  // Main axes
  const hRoad = new THREE.Mesh(new THREE.PlaneGeometry(size, 4), roadMat);
  hRoad.rotation.x = -Math.PI / 2;
  hRoad.position.y = 0.01;
  group.add(hRoad);

  const vRoad = new THREE.Mesh(new THREE.PlaneGeometry(4, size), roadMat);
  vRoad.rotation.x = -Math.PI / 2;
  vRoad.position.y = 0.01;
  group.add(vRoad);

  return group;
}

export function createDataTower(height = 15): THREE.Group {
  const group = new THREE.Group();
  const towerGeo = new THREE.CylinderGeometry(0.8, 1.2, height, 8);
  const towerMat = new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.9, roughness: 0.1 });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.y = height / 2;
  group.add(tower);

  // Top beacon
  const beaconGeo = new THREE.SphereGeometry(0.6, 16, 16);
  const beaconMat = new THREE.MeshBasicMaterial({ color: '#00f0ff' });
  const beacon = new THREE.Mesh(beaconGeo, beaconMat);
  beacon.position.y = height + 0.4;
  group.add(beacon);

  return group;
}

export function createInvestigationPlatform(radius = 35): THREE.Group {
  const group = new THREE.Group();

  // Primary circular cyber investigation deck
  const deckGeo = new THREE.CylinderGeometry(radius, radius + 1, 0.4, 64);
  const deckMat = new THREE.MeshStandardMaterial({
    color: '#0a0f1d',
    roughness: 0.4,
    metalness: 0.8
  });
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.position.y = -0.2;
  group.add(deck);

  // Target grid rings
  const ringGeo = new THREE.RingGeometry(radius * 0.4, radius * 0.41, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: '#1e293b', side: THREE.DoubleSide });
  const innerRing = new THREE.Mesh(ringGeo, ringMat);
  innerRing.rotation.x = -Math.PI / 2;
  innerRing.position.y = 0.02;
  group.add(innerRing);

  return group;
}
