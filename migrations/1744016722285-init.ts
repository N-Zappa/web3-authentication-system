import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744016722285 implements MigrationInterface {
    name = 'Init1744016722285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nonce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nonce" character varying NOT NULL, "wallet" character varying NOT NULL, "timestamp" bigint NOT NULL, CONSTRAINT "PK_16620962f69fc3620001801e275" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nonce"`);
    }

}
