import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import SceneManager from './SceneManager';

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const sceneManager = new SceneManager(new THREE.Scene())

const controls = new OrbitControls(sceneManager.camera, renderer.domElement)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    sceneManager.camera.aspect = window.innerWidth / window.innerHeight
    sceneManager.camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(sceneManager.scene, sceneManager.camera)
}

animate()