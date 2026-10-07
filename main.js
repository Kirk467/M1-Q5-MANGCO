import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3ede2);

const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 5, 20);
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// ---------- Shapes ----------

const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x27870C, roughness: 1, metalness: 0.3})
);
box.position.set(-4, 2, 1);
scene.add(box);

const capsule = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 1, 4, 8, 1 ),
    new THREE.MeshStandardMaterial({ color: 0xD288E3, roughness: .3, metalness: 0.3})
);
capsule.position.set(-2, 5, 1);
scene.add(capsule);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, .5, 12, 100),
    new THREE.MeshStandardMaterial({ color: 0x049ef4, roughness: 0, metalness: 0.3 })
)
torus.position.set(10, 3, 1);
scene.add(torus)

const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 12, 32),
    new THREE.MeshStandardMaterial({ color: 0xE83A3A, roughness: 0, metalness: 0.4})
)
cylinder.position.set(3, 3, 1);
scene.add(cylinder);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 16, 0),
    new THREE.MeshStandardMaterial({ color: 0xF59A18, roughness: 0, metalness: 0.4})
)
sphere.position.set(20, 3, 1);
scene.add(sphere);

// ---------- Lighting ----------

scene.add(new THREE.AmbientLight(0xffffff, .5));

const sunlight = new THREE.DirectionalLight(0xffffff, 0.6);
sunlight.position.set(6, 8, 5);
sunlight.castShadow = true;
scene.add(sunlight);

// ---------- Animation ----------
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    
    box.rotation.x = elapsedTime * 1; 
    box.rotation.y = elapsedTime * 1;
  
    capsule.position.y = 0.8 + Math.sin(elapsedTime * 4) * 0.8; 
    
    cylinder.rotation.x = elapsedTime * 2.0;
    cylinder.rotation.y = elapsedTime * 5;
    
    torus.rotation.y = elapsedTime * 100;
  
    sphere.position.x = Math.cos(elapsedTime) * 4;
    sphere.position.z = Math.sin(elapsedTime) * 4;
  
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
