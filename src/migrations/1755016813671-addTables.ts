import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1755016813671 implements MigrationInterface {
    name = 'AddTables1755016813671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a0e006b29d7876b2f5a4df70a37" UNIQUE ("tagName"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedback_tags" ("id" SERIAL NOT NULL, "feedbackId" integer, "tagId" integer, CONSTRAINT "PK_46ff2013c46ae06623361f26a3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_comments" ("id" SERIAL NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_86bdd51cd99741900baa293a80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "parentId" integer, "feedbackId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."votes_type_enum" AS ENUM('up', 'down')`);
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "type" "public"."votes_type_enum" NOT NULL, "userId" integer, "feedbackId" integer, CONSTRAINT "UQ_062aa0bc58308a13b5af7d42b25" UNIQUE ("userId", "feedbackId"), CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."feedback_status_enum" AS ENUM('Public', 'Private')`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."feedback_status_enum" NOT NULL DEFAULT 'Public', "upVotes" integer NOT NULL DEFAULT '0', "downVotes" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'User', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" ADD CONSTRAINT "FK_c8edf53ac0adb394449d7b35c55" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" ADD CONSTRAINT "FK_b609f0f33787cc32bffd36c55c4" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_5db95b68a096db5884b270e70b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_4faa699712a857a26726accf88f" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_a50590123a861952073d89e0a3f" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_c66b122b60fb0a6a07d86f63d32" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_c66b122b60fb0a6a07d86f63d32"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_a50590123a861952073d89e0a3f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_4faa699712a857a26726accf88f"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_5db95b68a096db5884b270e70b4"`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" DROP CONSTRAINT "FK_b609f0f33787cc32bffd36c55c4"`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" DROP CONSTRAINT "FK_c8edf53ac0adb394449d7b35c55"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TYPE "public"."feedback_status_enum"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP TYPE "public"."votes_type_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users_comments"`);
        await queryRunner.query(`DROP TABLE "feedback_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
