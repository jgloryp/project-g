import {MigrationInterface, QueryRunner} from "typeorm";

export class PointLog21645419294521 implements MigrationInterface {
    name = 'PointLog21645419294521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_log\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_log\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
