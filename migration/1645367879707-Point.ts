import {MigrationInterface, QueryRunner} from "typeorm";

export class Point1645367879707 implements MigrationInterface {
    name = 'Point1645367879707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`point\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('earned', 'used') NOT NULL, \`point\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD CONSTRAINT \`FK_c01766b92e52572f0b871c24bb6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_c01766b92e52572f0b871c24bb6\``);
        await queryRunner.query(`DROP TABLE \`point\``);
    }

}
