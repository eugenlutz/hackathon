
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Shelf } from './models/shelf';
import { Box } from './models/box';

const scene = new THREE.Scene();
const shelfList: Shelf[] = [];

// Kamera (Default)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 3, 8);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

// Mock Data

const shelfMockData = [
    { x: 0, y: 0, z: 0, capacity: 5 },
    { x: 6, y: 0, z: 0, capacity: 5 },
    { x: 12, y: 0, z: 0, capacity: 5 }
];

// Erstelle Regale an den definierten Positionen
shelfMockData.forEach((pos, index) => {
    const shelf = new Shelf(pos.x, pos.y, pos.z, pos.capacity);
    scene.add(shelf.mesh);
    shelfList.push(shelf);

    // Licht
    var shelfLight = new THREE.SpotLight(0xffffff, 70);
    shelfLight.position.set(pos.x, 5, 5);
    shelfLight.angle = Math.PI / 4;
    shelfLight.penumbra = 0.5;
    shelfLight.castShadow = true;
    shelfLight.shadow.mapSize.width = 1024;
    shelfLight.shadow.mapSize.height = 1024;
    shelfLight.shadow.camera.near = 0.5;
    shelfLight.shadow.camera.far = 20;
    scene.add(shelfLight);
});

// Boxen Test

var shelf = shelfList[0];
const box1 = new Box(shelf.capacity, new THREE.Color('red'));
const box2 = new Box(shelf.capacity, new THREE.Color('yellow'));
const box3 = new Box(shelf.capacity, new THREE.Color('green'));
shelf.addBox(box1.mesh, 2);
shelf.addBox(box2.mesh, 0);
shelf.addBox(box3.mesh, 4);

// Boden
const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.1;
scene.add(floor);

// Hintergrundfarbe ändern
scene.background = new THREE.Color(0xa0a0a0);

// Licht
const spotlight = new THREE.SpotLight(0xffffff, 70);
spotlight.position.set(2.5, 5, 5);
spotlight.angle = Math.PI / 4;
spotlight.penumbra = 0.5;
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.near = 0.5;
spotlight.shadow.camera.far = 20;
scene.add(spotlight);

const ambientlight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientlight);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();
