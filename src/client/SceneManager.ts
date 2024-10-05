import { Scene, Vector3 } from "three";
import Box from "./Box";

class SceneManager{
    scene: Scene
    boxes: Box[]
    constructor(scene: Scene)
    {
        this.scene = scene
        this.boxes = new Array()
    }

    addBox(id: number, position: Vector3)
    {
        let box = new Box(id, position)
        this.scene.add(box.mesh)
    }
}

export default SceneManager