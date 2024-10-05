import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import InteractionManager from './InteractionManager';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 100)

camera.position.z = 8
camera.position.x = 5
camera.position.y = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new GLTFLoader()

loader.load('meshes/scene.gltf', (gltf) => { 
    scene.add(gltf.scene) 

},
// called while loading is progressing
( xhr ) => {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
( error ) => {

    console.log( 'An error happened:', error );

})

const spotlight = new THREE.SpotLight(0xffffff, 50)
spotlight.position.set(2.5, 5, 5)
spotlight.angle = Math.PI / 4
spotlight.penumbra = 0.5
spotlight.castShadow = true
spotlight.shadow.mapSize.width = 1024
spotlight.shadow.mapSize.height = 1024
spotlight.shadow.camera.near = 0.5
spotlight.shadow.camera.far = 20
scene.add(spotlight)

const ambientlight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientlight)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()