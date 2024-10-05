import { AmbientLight, Light, PerspectiveCamera, Scene, SpotLight, Vector3 } from "three";
import Box from "./Box";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class SceneManager {

    loader: GLTFLoader
    scene: Scene
    boxes: Box[]
    camera!: PerspectiveCamera
    lights: Light[]

    constructor(scene: Scene) {
        this.scene = scene
        this.boxes = new Array()
        this.lights = new Array()
        this.loader = new GLTFLoader()
    }

    initCamera() {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 100)
        camera.position.set(5, 3, 8)
        this.camera = camera
        this.scene.add(camera)
    }

    initLights() {
        const spotlight = new SpotLight(0xffffff, 50)
        spotlight.position.set(2.5, 5, 5)
        spotlight.angle = Math.PI / 4
        spotlight.penumbra = 0.5
        spotlight.castShadow = true
        spotlight.shadow.mapSize.width = 1024
        spotlight.shadow.mapSize.height = 1024
        spotlight.shadow.camera.near = 0.5
        spotlight.shadow.camera.far = 20

        const ambientlight = new AmbientLight(0xffffff, 1)

        this.scene.add(spotlight)
        this.scene.add(ambientlight)
    }

    loadModel() {

        this.loader.load('meshes/scene.gltf', (gltf) => {
            this.scene.add(gltf.scene)

        },
            // called while loading is progressing
            (xhr) => {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            (error) => {

                console.log('An error happened:', error);

            })
    }

    addBox(id: number, position: Vector3) {
        let box = new Box(id, position)
        this.scene.add(box.mesh)
    }
}

export default SceneManager