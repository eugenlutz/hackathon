import * as THREE from 'three';
import IWarehouseClient from './WarehouseClient';

interface IInteractionManager {
    showContextMenu(event: MouseEvent, object: THREE.Object3D): void;
}

class InteractionManager implements  IInteractionManager {

    private contextMenu: HTMLDivElement;
    private scene: THREE.Scene;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private camera: THREE.Camera;
    private warehouseClient: IWarehouseClient;

    constructor(scene: THREE.Scene, camera: THREE.Camera, warehouseClient: IWarehouseClient) {
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
        this.contextMenu = this.createContextMenu();        
        this.warehouseClient = warehouseClient;
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

        this.contextMenu.innerHTML = `
        <div>Object ID: ${object.id}</div>
        <div class="menu-item">Move</div>
        `;
    }
    
    private onDocumentMouseDown(event: MouseEvent): void {
        this.contextMenu.style.display = 'none';

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (event.button === 0)
            {
                const target = event.target as HTMLElement;
                if (target.classList.contains('menu-item')) {
                if (target.innerText === 'Move') {
                    
                    (async () => {
                        try {
                            await this.warehouseClient.move(clickedObject.id);
                            console.log('Async method completed successfully.');
                        } catch (error) {
                            console.error('Error in async method:', error);
                        }
                    })();
                }
                this.contextMenu.style.display = 'none';
            }
            }    
            else if (event.button === 2) {
                this.showContextMenu(event, clickedObject);
            }
        }
    }
}

export default InteractionManager;