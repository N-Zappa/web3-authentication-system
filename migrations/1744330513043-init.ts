import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744330513043 implements MigrationInterface {
    name = 'Init1744330513043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "countryCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "countryCode"`);
    }

}
