import express from 'express'
import path from 'path'
import http from 'http'
import cors from 'cors';
import {
    moveId,
    createId,
    moveIdAuto
  } from './WarehouseController';
  import db from './db'

const port: number = 3000

//db.eventManager.on(db.Events.Connected, () => console.log('Successfully connected to Database.'));
//db.eventManager.on(db.Events.Disconnected, () => console.log('Disconnected from DB.'));

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()
        app.use(cors());
        app.use(express.static(path.join(__dirname, '../client')))
        app.post('/move/:id', moveIdAuto)
        app.post('/move/:id:bin', moveId)
        app.put('create/:id', createId)
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

        this.server = new http.Server(app)
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

function handleError(err?:Error | NodeJS.Signals | void) {
    if(err) {
        console.error(err);

        if(err instanceof Error) {
            console.error(err.stack);    
        }
    }
    
    db.disconnect({ force: true });
    process.exit(0);
}

process.on('uncaughtException', handleError);
process.on('SIGINT', handleError);

new App(port).Start()
