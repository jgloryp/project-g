import {MigrationInterface, QueryRunner} from "typeorm";

export class Tag1645354897939 implements MigrationInterface {
    name = 'Tag1645354897939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`photoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_bfd776a82cbfa8f2661fdb2f8a1\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_bfd776a82cbfa8f2661fdb2f8a1\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
    }

}
