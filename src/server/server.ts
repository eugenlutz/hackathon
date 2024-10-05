import express from 'express'
import path from 'path'
import http from 'http'
import {
    moveId,
    createId
  } from './WarehouseController';
import "reflect-metadata"
import "typeorm";
import { DataSource } from 'typeorm';
import {Bin} from '../entity/Bin'
import {Box} from '../entity/Box'
import {BoxToBin} from '../entity/BoxToBin'

const port: number = 3000

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: '../db/warehouse.db',
    entities: [Bin,Box,BoxToBin],
    synchronize: true,
    logging: true
})

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()

        app.use(express.static(path.join(__dirname, '../client')))
        app.post('/move/:id:bin', moveId)
        app.put('create/:id', createId)
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

AppDataSource.initialize()
.then(() => { 
    console.log('Datenbank blabla');
})
.catch((error) => console.error('Fehler', error));


new App(port).Start()
