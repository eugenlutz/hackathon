import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.warehouse.sqlite3",
    synchronize: true,
    logging: false,
    entities: [ "entities/**/*.ts" ],
    subscribers: [ "subscribers/**/*.ts" ],
    migrations: [ "migrations/**/*.ts" ],
})