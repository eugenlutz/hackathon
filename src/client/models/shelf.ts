import { BoxGeometry, Group, Material, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { ShelfColors } from "./colors";
import { Dimension } from "./dimension";

let ShelfDimensions: Dimension = {
    Width: 2,
    Height: 3,
    Length: 1
}

type ShelfSlot = { index: number, position: Vector3}

export class Shelf {
    mesh: Group;
    shelfSlots: ShelfSlot[];
    capacity: number;

    constructor(x: number, y: number, z: number, shelfCapacity: number) {
        this.mesh = new Group();
        this.shelfSlots = [];
        this.capacity = shelfCapacity;

        const shelfMaterial = new MeshStandardMaterial({
            color: ShelfColors.Default,
            metalness: 0.8,
            roughness: 0.45
        });

        const shelfSpacing = ShelfDimensions.Height / (shelfCapacity + 1);

        this.createShelves(shelfMaterial, shelfSpacing, x, y, z);
        this.createSides(shelfMaterial);
        this.createBack(shelfMaterial);

        this.mesh.position.set(x, y, z);
    }

    private createShelves(material: Material, spacing: number, x: number, y: number, z: number) {
        for (let i = 0; i <= this.capacity; i++) {
            const shelfGeometry = new BoxGeometry(ShelfDimensions.Width, 0.2, ShelfDimensions.Length);
            const shelf = new Mesh(shelfGeometry, material);
            shelf.position.set(0, i * spacing, 0);
            this.mesh.add(shelf);
            this.shelfSlots.push(
                {index: i, 
                 position: new Vector3(x, y + i * spacing, z)}
                );
        }
    }

    private createSides(material: Material) {
        const sideGeometry = new BoxGeometry(0.2, ShelfDimensions.Height, ShelfDimensions.Length);

        const leftSide = new Mesh(sideGeometry, material);
        leftSide.position.set(-ShelfDimensions.Width / 2 + 0.1, ShelfDimensions.Height / 2, 0);
        this.mesh.add(leftSide);

        const rightSide = new Mesh(sideGeometry, material);
        rightSide.position.set(ShelfDimensions.Width / 2 - 0.1, ShelfDimensions.Height / 2, 0);
        this.mesh.add(rightSide);
    }

    private createBack(material: Material) {
        const backGeometry = new BoxGeometry(ShelfDimensions.Width, ShelfDimensions.Height, 0.2);
        const back = new Mesh(backGeometry, material);
        back.position.set(0, ShelfDimensions.Height / 2, -ShelfDimensions.Length / 2 + 0.1);
        this.mesh.add(back);
    }

    getPosition(shelfIndex: number): Vector3 | undefined
    {
        if (shelfIndex > this.shelfSlots.length) return

        return this.shelfSlots.find( s => s.index === shelfIndex)!.position
    }

    addBox(box: Mesh, positionIndex: number) {
        if (positionIndex >= 0 && positionIndex < this.shelfSlots.length) {
            const position = this.shelfSlots.find( s => s.index === positionIndex)!.position;
            box.position.set(position.x, position.y + 0.2, position.z);
            this.mesh.add(box);
        } else {
            console.error('Invalid position index');
        }
    }
}
