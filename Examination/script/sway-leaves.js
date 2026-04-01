import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const loader = new GLTFLoader();
let palmTree;
let palmLeaves;

loader.load('realistic_palm_tree_4_free/scene.gltf', function (gltf) {
  palmTree = gltf.scene;
  scene.add(palmTree);

  // Find the leaf node by name
  palmTree.traverse((node) => {
    if (node.name === 'Tree_1_Palm_4_Leaf_0') {
      palmLeaves = node;
    }
  });
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  if (palmLeaves) {
    palmLeaves.rotation.z = Math.sin(time) * 0.1; // Sway left and right
    palmLeaves.rotation.x = Math.sin(time * 0.5) * 0.05; // Gentle up/down wave
  }

  renderer.render(scene, camera);
}

animate();