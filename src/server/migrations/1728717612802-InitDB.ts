import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1728717612802 implements MigrationInterface {
    name = 'InitDB1728717612802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "box" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "number" integer NOT NULL,
                "size" integer NOT NULL DEFAULT (1),
                CONSTRAINT "UQ_a3ed2db570f7c2144ce9c75e8c0" UNIQUE ("number")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bin" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "number" integer NOT NULL,
                "capa" integer NOT NULL DEFAULT (1),
                CONSTRAINT "UQ_aee4b8638c89e35e78a2c4effe4" UNIQUE ("number")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "box_to_bin" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "box_to_bin"
        `);
        await queryRunner.query(`
            DROP TABLE "bin"
        `);
        await queryRunner.query(`
            DROP TABLE "box"
        `);
    }

}
