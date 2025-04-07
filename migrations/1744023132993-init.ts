import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744023132993 implements MigrationInterface {
    name = 'Init1744023132993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" character varying NOT NULL, "fingerprint" character varying NOT NULL, "ip" character varying NOT NULL, "user_agent" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_used_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL, "user_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fingerprint"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ip"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userAgent"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" text NOT NULL DEFAULT 'WAITING'`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLoginAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userAgent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "ip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fingerprint" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
