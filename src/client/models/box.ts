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
        this.mesh = new Mesh(geometry)
        this.moveTo(position)
        this.mesh.material = new MeshBasicMaterial(
            {
                color: BoxColors.Default
            }
        )
    }

    moveTo(position: Vector3)
    {        
        this.mesh.geometry.translate(position.x, position.y, position.z)
    }

    getMesh() : Mesh{
        return this.mesh;
    }
}

export default Box