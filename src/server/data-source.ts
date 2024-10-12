import "reflect-metadata"
import { DataSource } from "typeorm"
import path from 'path';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(__dirname, '../../dist/server/db/warehouse.sqlite3'),
    synchronize: true,
    logging: false,
    entities: [ "entities/**/*.ts", "entities/**/*.js" ],
    subscribers: [ "subscribers/**/*.ts", "subscribers/**/*.js" ],
    migrations: [ "migrations/**/*.ts", "migrations/**/*.js" ],
})