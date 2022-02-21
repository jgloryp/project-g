import {MigrationInterface, QueryRunner} from "typeorm";

export class PointLog1645418316097 implements MigrationInterface {
    name = 'PointLog1645418316097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`point\` \`amount\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`point_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`pointId\` int NULL, \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`point_log\` ADD CONSTRAINT \`FK_8a1966f46485824ccc87f56a8a9\` FOREIGN KEY (\`pointId\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`point_log\` ADD CONSTRAINT \`FK_c0c5f2338b3e64cbaa6bde23bd3\` FOREIGN KEY (\`parentId\`) REFERENCES \`point_log\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_log\` DROP FOREIGN KEY \`FK_c0c5f2338b3e64cbaa6bde23bd3\``);
        await queryRunner.query(`ALTER TABLE \`point_log\` DROP FOREIGN KEY \`FK_8a1966f46485824ccc87f56a8a9\``);
        await queryRunner.query(`DROP TABLE \`point_log\``);
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`amount\` \`point\` int NOT NULL`);
    }

}
