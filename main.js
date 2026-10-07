import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3ede2);

const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(7, 6, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// ---------- Helper Functions ----------

const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xfff3e0 })
);
box.position.set(-4, 2, 1);
scene.add(lampShade);

// ---------- Lighting ----------

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const sunlight = new THREE.DirectionalLight(0xffffff, 0.6);
sunlight.position.set(6, 8, 5);
sunlight.castShadow = true;
scene.add(sunlight);

// ---------- Animation ----------

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
