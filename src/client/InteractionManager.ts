import * as THREE from 'three';
import IWarehouseClient from './WarehouseClient';
import Box from "./models/box";

interface IInteractionManager {
    showContextMenu(event: MouseEvent, id: number): void;
}

class InteractionManager implements  IInteractionManager {

    private contextMenu: HTMLDivElement;
    private scene: THREE.Scene;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private camera: THREE.Camera;
    private warehouseClient: IWarehouseClient;
    private boxes: Box[]
    private selectedBox: Box

    constructor(scene: THREE.Scene, camera: THREE.Camera, warehouseClient: IWarehouseClient, boxes: Box[]) {
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
        this.contextMenu = this.createContextMenu();        
        this.warehouseClient = warehouseClient;
        this.boxes = boxes
        this.selectedBox = boxes[0];
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

    public showContextMenu(event: MouseEvent, id: number): void {
        event.preventDefault();
        this.contextMenu.style.display = 'block';
        this.contextMenu.style.left = `${event.clientX}px`;
        this.contextMenu.style.top = `${event.clientY}px`;

        this.contextMenu.innerHTML = `
        <div>Object ID: ${id}</div>
        <div class="menu-item">Move</div>
        `;
    }
    
    private onDocumentMouseDown(event: MouseEvent): void {
        this.contextMenu.style.display = 'none';
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const sceneObjects: THREE.Object3D[] = [];
        const boxMeshes: THREE.Mesh[] = this.boxes.map(box => box.getMesh());
        const intersects = this.raycaster.intersectObjects(sceneObjects.concat(boxMeshes), true);

        // Box clicked
        if (intersects.length > 0) 
        {
            if (event.button != 2)
                return;
        
            const clickedObject = intersects[0].object;
            this.selectedBox = this.boxes.find(box => box.getMesh() === clickedObject) as Box;
            if (this.selectedBox == null)
                return;
            this.showContextMenu(event, this.selectedBox.id);
        }
        // Context menu clicked
        else
        {
            if (event.button != 0)
                return;
            
            const target = event.target as HTMLElement;
            if (target.classList.contains('menu-item')) {
                if (target.innerText === 'Move') {
                    (async () => {
                        try 
                        {     
                            await this.warehouseClient.move(this.selectedBox.id);
                            console.log('Async method completed successfully.');
                        } 
                        catch (error) 
                        {
                            console.error('Error in async method:', error);
                        }
                    })();
                }
                this.contextMenu.style.display = 'none';
            }
        }
    }
}

export default InteractionManager;