import * as THREE from 'three';

interface IInteractionManager {
    showContextMenu(event: MouseEvent, object: THREE.Object3D): void;
}

class InteractionManager implements  IInteractionManager {

    private contextMenu: HTMLDivElement;
    private scene: THREE.Scene;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private camera: THREE.Camera;

    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
        this.contextMenu = this.createContextMenu();        

        window.addEventListener('mousedown', (event) => this.onDocumentMouseDown(event));
        window.addEventListener('contextmenu', (event) => event.preventDefault());
    }

    createContextMenu(): HTMLDivElement {
        var contextMenu = document.createElement('div');
        contextMenu.style.position = 'absolute';
        contextMenu.style.display = 'none';
        contextMenu.style.background = '#333';
        contextMenu.style.color = 'white';
        contextMenu.style.padding = '10px';
        contextMenu.style.borderRadius = '5px';
        document.body.appendChild(contextMenu);
        return contextMenu;
    }

    public showContextMenu(event: MouseEvent, object: THREE.Object3D): void {
        event.preventDefault();
        this.contextMenu.style.display = 'block';
        this.contextMenu.style.left = `${event.clientX}px`;
        this.contextMenu.style.top = `${event.clientY}px`;

        // Customize your context menu options
        this.contextMenu.innerHTML = `
            <div>Move: ${object.id}</div>
        `;

        // Add functionality to menu items
        this.contextMenu.onclick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // if (target.innerText === 'Change Color') {
            //     object.material.color.set(Math.random() * 0xffffff); // Change object color
            // }
            if (target.innerText === 'Remove Object') {
                this.scene.remove(object); // Remove object from scene
            }
            this.contextMenu.style.display = 'none'; // Hide menu after action
        };
    }

    private onDocumentMouseDown(event: MouseEvent): void {
        // Hide context menu if clicked outside
        this.contextMenu.style.display = 'none';

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            // Show context menu on right-click (event.button === 2)
            if (event.button === 2) {
                this.showContextMenu(event, clickedObject);
            }
        }
    }
}

export default InteractionManager;