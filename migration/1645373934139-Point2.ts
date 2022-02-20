import {MigrationInterface, QueryRunner} from "typeorm";

export class Point21645373934139 implements MigrationInterface {
    name = 'Point21645373934139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_c01766b92e52572f0b871c24bb6\` ON \`point\``);
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`point\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD UNIQUE INDEX \`IDX_a361b4bce5b13075ef665acef0\` (\`folderId\`)`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD UNIQUE INDEX \`IDX_941b789e63dffa3d48f4aa2199\` (\`photoId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a361b4bce5b13075ef665acef0\` ON \`point\` (\`folderId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_941b789e63dffa3d48f4aa2199\` ON \`point\` (\`photoId\`)`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD CONSTRAINT \`FK_c01766b92e52572f0b871c24bb6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD CONSTRAINT \`FK_a361b4bce5b13075ef665acef03\` FOREIGN KEY (\`folderId\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD CONSTRAINT \`FK_941b789e63dffa3d48f4aa21992\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_941b789e63dffa3d48f4aa21992\``);
        await queryRunner.query(`ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_a361b4bce5b13075ef665acef03\``);
        await queryRunner.query(`ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_c01766b92e52572f0b871c24bb6\``);
        await queryRunner.query(`DROP INDEX \`REL_941b789e63dffa3d48f4aa2199\` ON \`point\``);
        await queryRunner.query(`DROP INDEX \`REL_a361b4bce5b13075ef665acef0\` ON \`point\``);
        await queryRunner.query(`ALTER TABLE \`point\` DROP INDEX \`IDX_941b789e63dffa3d48f4aa2199\``);
        await queryRunner.query(`ALTER TABLE \`point\` DROP INDEX \`IDX_a361b4bce5b13075ef665acef0\``);
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`point\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD PRIMARY KEY (\`id\`, \`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`point\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`FK_c01766b92e52572f0b871c24bb6\` ON \`point\` (\`userId\`)`);
    }

}
