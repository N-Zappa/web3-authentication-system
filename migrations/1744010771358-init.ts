import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744010771358 implements MigrationInterface {
    name = 'Init1744010771358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying NOT NULL, "status" character varying NOT NULL, "fingerprint" character varying NOT NULL, "ip" character varying NOT NULL, "userAgent" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLoginAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
