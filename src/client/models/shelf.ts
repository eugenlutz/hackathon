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
            metalness: 0.8, // Metallischer Effekt
            roughness: 0.45  // Glätte des Materials
        });

        // Abstand zwischen den Regalböden
        const shelfSpacing = shelfHeight / (shelfCapacity + 1);

        // Regalböden
        for (let i = 0; i <= shelfCapacity; i++) {
            const shelfGeometry = new THREE.BoxGeometry(shelfWidth, 0.2, shelfDepth);
            const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
            shelf.position.set(0, i * shelfSpacing, 0);
            this.mesh.add(shelf);
            this.shelfPositions.push(new THREE.Vector3(x, y + i * shelfSpacing, z));
        }

        // Linke Seite
        const leftSideGeometry = new THREE.BoxGeometry(0.2, shelfHeight, shelfDepth);
        const leftSide = new THREE.Mesh(leftSideGeometry, shelfMaterial);
        leftSide.position.set(-shelfWidth / 2 + 0.1, shelfHeight / 2, 0);
        this.mesh.add(leftSide);

        // Rechte Seite
        const rightSideGeometry = new THREE.BoxGeometry(0.2, shelfHeight, shelfDepth);
        const rightSide = new THREE.Mesh(rightSideGeometry, shelfMaterial);
        rightSide.position.set(shelfWidth / 2 - 0.1, shelfHeight / 2, 0);
        this.mesh.add(rightSide);

        // Rückwand
        const backGeometry = new THREE.BoxGeometry(shelfWidth, shelfHeight, 0.2);
        const back = new THREE.Mesh(backGeometry, shelfMaterial);
        back.position.set(0, shelfHeight / 2, -shelfDepth / 2 + 0.1);
        this.mesh.add(back);

        this.mesh.position.set(x, y, z);
    }

    addBox(box: THREE.Mesh, positionIndex: number) {
        if (positionIndex >= 0 && positionIndex < this.shelfPositions.length) {

            const position = this.shelfPositions[positionIndex]
            var correctedY = position.y + 0.2;
            box.position.set(position.x, correctedY, position.z);
            this.mesh.add(box);

        } else {
            console.error('Invalid position index');
        }
    }

}
