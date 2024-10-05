import * as THREE from 'three';
import { shelfWidth, shelfDepth, shelfHeight } from './shelf';

const boxWidth = shelfWidth * 0.9;
const boxHeight = 0.25;
const boxDepth = shelfDepth * 0.9;
const boxColor = 0xff5733;

export class Box {
    mesh: THREE.Mesh;

    constructor(shelfCapacity?: number, color?: THREE.Color) {
        var newBoxHeight = boxHeight;

        if (shelfCapacity != null) {
            newBoxHeight = shelfHeight / (shelfCapacity + 1) * 0.5;
        }
        // Höhe der Box, angepasst an die Kapazität des Regals
        const boxGeometry = new THREE.BoxGeometry(boxWidth, newBoxHeight, boxDepth);
        const boxMaterial = new THREE.MeshStandardMaterial({
            color: color ?? boxColor,
            metalness: 0.5,
            roughness: 0.5
        });

        this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    }

}
