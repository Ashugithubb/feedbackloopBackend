import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedAt1755059999188 implements MigrationInterface {
    name = 'DeletedAt1755059999188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
