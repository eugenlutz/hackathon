"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const WarehouseController_1 = require("./WarehouseController");
const db_1 = __importDefault(require("./db"));
const port = 3000;
db_1.default.eventManager.on(db_1.default.Events.Connected, () => console.log('Successfully connected to Database.'));
db_1.default.eventManager.on(db_1.default.Events.Disconnected, () => console.log('Disconnected from DB.'));
class App {
    constructor(port) {
        this.port = port;
        const app = (0, express_1.default)();
        // Allow requests from specific origins (e.g., http://localhost:3000)
        const corsOptions = {
            origin: 'http://127.0.0.1:3000', // Replace this with your front-end URL
            methods: 'GET,POST,PUT,DELETE', // Allowed methods
            allowedHeaders: 'Content-Type,Authorization', // Allowed headers
        };
        app.use((0, cors_1.default)());
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        app.post('/move/:id', WarehouseController_1.moveIdAuto);
        app.post('/move/:id:bin', WarehouseController_1.moveId);
        app.put('create/:id', WarehouseController_1.createId);
        app.listen(4000, () => console.log('Server running on port 4000'));
        // In the webpack version of the boilerplate, it is not necessary
        // to add static references to the libs in node_modules if
        // you are using module specifiers in your client.ts imports.
        //
        // Visit https://sbcode.net/threejs/module-specifiers/ for info about module specifiers
        //
        // This server.ts is only useful if you are running this on a production server or you
        // want to see how the production version of bundle.js works
        //
        // to use this server.ts
        // # npm run build        (this creates the production version of bundle.js and places it in ./dist/client/)
        // # tsc -p ./src/server  (this compiles ./src/server/server.ts into ./dist/server/server.js)
        // # npm start            (this starts nodejs with express and serves the ./dist/client folder)
        //
        // visit http://127.0.0.1:3000
        this.server = new http_1.default.Server(app);
    }
    Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`);
        });
    }
}
function handleError(err) {
    if (err) {
        console.error(err);
        if (err instanceof Error) {
            console.error(err.stack);
        }
    }
    db_1.default.disconnect({ force: true });
    process.exit(0);
}
process.on('uncaughtException', handleError);
process.on('SIGINT', handleError);
new App(port).Start();
