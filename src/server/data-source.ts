import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "/src/server/db.warehouse.sqlite3",
    synchronize: true,
    logging: false,
    entities: [ "entities/**/*.ts" ],
    subscribers: [ "subscribers/**/*.ts" ],
    migrations: [ "migrations/**/*.ts" ],
})