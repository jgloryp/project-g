import {MigrationInterface, QueryRunner} from "typeorm";

export class Folder1645336664215 implements MigrationInterface {
    name = 'Folder1645336664215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`folder\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`folder\` ADD CONSTRAINT \`FK_a0ef64d088bc677d66b9231e90b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folder\` DROP FOREIGN KEY \`FK_a0ef64d088bc677d66b9231e90b\``);
        await queryRunner.query(`DROP TABLE \`folder\``);
    }

}
