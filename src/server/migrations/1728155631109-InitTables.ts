import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitTables1728155631109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "Bin" ("id" INTEGER,"number" INTEGER NOT NULL UNIQUE,"capa" INTEGER NOT NULL DEFAULT 1, PRIMARY KEY("id"))'
        )
        await queryRunner.query(
            'CREATE TABLE "Box" ("id" INTEGER,"number" INTEGER NOT NULL UNIQUE,"size" INTEGER NOT NULL DEFAULT 1, PRIMARY KEY("id"))'
        )
        await queryRunner.query(
            'CREATE TABLE "BoxToBin" ("id" INTEGER, "box_id" INTEGER, "bin_id" INTEGER, PRIMARY KEY("id"), FOREIGN KEY("bin_id") REFERENCES "Bin"("id"), FOREIGN KEY("box_id") REFERENCES "Box"("id"))'
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "Bin"')
        await queryRunner.query('DROP TABLE "Box"')
        await queryRunner.query('DROP TABLE "BoxToBin"')
    }

}
