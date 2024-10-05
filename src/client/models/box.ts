import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three"
import { BoxColors } from "./colors"
import { Dimension } from "./dimension"

let BoxDimensions: Dimension = {
    Width: 1.8,
    Height: 0.25,
    Length: 0.9
}

class Box {
    id: number
    mesh!: Mesh

    constructor(id: number, position: Vector3) 
    {
        this.id = id

        this.init(position)
    }

    init(position: Vector3) 
    {
        const geometry = new BoxGeometry(
            BoxDimensions.Width, 
            BoxDimensions.Height, 
            BoxDimensions.Length
        )

        this.moveTo(position)
        const material = new MeshBasicMaterial(
            {
                color: BoxColors.Default
            }
        )

        this.mesh = new Mesh(geometry, material)
        
    }

    moveTo(position: Vector3)
    {        
        this.mesh.geometry.translate(position.x, position.y, position.z)
    }
}

export default Box