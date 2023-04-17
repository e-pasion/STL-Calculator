const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const geometrymaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
const box = new THREE.Mesh(geometry, geometrymaterial);
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const lines = new THREE.LineSegments(edges, lineMaterial);
