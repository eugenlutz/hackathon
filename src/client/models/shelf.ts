import * as THREE from 'three';

export const shelfWidth = 2;
export const shelfHeight = 3;
export const shelfDepth = 1;
const shelfColor = 0xbcb4b2;

export class Shelf {
    mesh: THREE.Group;
    shelfPositions: THREE.Vector3[];
    capacity: number;

    constructor(x: number, y: number, z: number, shelfCapacity: number) {
        this.mesh = new THREE.Group();
        this.shelfPositions = [];
        this.capacity = shelfCapacity;

        const shelfMaterial = new THREE.MeshStandardMaterial({
            color: shelfColor,
            metalness: 0.8,
            roughness: 0.45
        });

        const shelfSpacing = shelfHeight / (shelfCapacity + 1);

        this.createShelves(shelfMaterial, shelfSpacing, x, y, z);
        this.createSides(shelfMaterial);
        this.createBack(shelfMaterial);

        this.mesh.position.set(x, y, z);
    }

    private createShelves(material: THREE.Material, spacing: number, x: number, y: number, z: number) {
        for (let i = 0; i <= this.capacity; i++) {
            const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 0.2, shelfDepth);
            const shelf = new THREE.Mesh(shelfGeometry, material);
            shelf.position.set(0, i * spacing, 0);
            this.mesh.add(shelf);
            this.shelfPositions.push(new THREE.Vector3(x, y + i * spacing, z));
        }
    }

    private createSides(material: THREE.Material) {
        const sideGeometry = new THREE.BoxGeometry(0.2, shelfHeight, shelfDepth);

        const leftSide = new THREE.Mesh(sideGeometry, material);
        leftSide.position.set(-shelfWidth / 2 + 0.1, shelfHeight / 2, 0);
        this.mesh.add(leftSide);

        const rightSide = new THREE.Mesh(sideGeometry, material);
        rightSide.position.set(shelfWidth / 2 - 0.1, shelfHeight / 2, 0);
        this.mesh.add(rightSide);
    }

    private createBack(material: THREE.Material) {
        const backGeometry = new THREE.BoxGeometry(shelfWidth, shelfHeight, 0.2);
        const back = new THREE.Mesh(backGeometry, material);
        back.position.set(0, shelfHeight / 2, -shelfDepth / 2 + 0.1);
        this.mesh.add(back);
    }

    addBox(box: THREE.Mesh, positionIndex: number) {
        if (positionIndex >= 0 && positionIndex < this.shelfPositions.length) {
            const position = this.shelfPositions[positionIndex];
            box.position.set(position.x, position.y + 0.2, position.z);
            this.mesh.add(box);
        } else {
            console.error('Invalid position index');
        }
    }
}
