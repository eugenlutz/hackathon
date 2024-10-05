import * as THREE from 'three';
import { shelfWidth, shelfDepth, shelfHeight } from './shelf';

const boxWidth = shelfWidth * 0.9;
const defaultBoxHeight = 0.25;
const boxDepth = shelfDepth * 0.9;
const defaultBoxColor = 0xff5733;

export class Box {
    mesh: THREE.Mesh;

    constructor(shelfCapacity?: number, color: THREE.Color = new THREE.Color(defaultBoxColor)) {
        const newBoxHeight = shelfCapacity != null 
            ? (shelfHeight / (shelfCapacity + 1)) * 0.5 
            : defaultBoxHeight;

        const boxGeometry = new THREE.BoxGeometry(boxWidth, newBoxHeight, boxDepth);
        const boxMaterial = new THREE.MeshStandardMaterial({
            color,
            metalness: 0.5,
            roughness: 0.5
        });

        this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    }
}
