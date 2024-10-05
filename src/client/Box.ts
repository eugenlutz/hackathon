import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three"

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
        const geometry = new BoxGeometry(1, 1, 1)
        geometry.translate(position.x, position.y, position.z)
        const material = new MeshBasicMaterial(
            {
                color: 0x00ff00
            }
        )

        this.mesh = new Mesh(geometry, material)
        
    }


    public getMesh(): Mesh {
        return this.mesh;
    }
}

export default Box