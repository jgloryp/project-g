import { MigrationInterface, QueryRunner } from 'typeorm';

export class Point21645373934139 implements MigrationInterface {
  name = 'Point21645373934139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`point\` ADD \`folderId\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`point\` ADD \`photoId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_c01766b92e52572f0b871c24bb6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` CHANGE \`userId\` \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` ADD CONSTRAINT \`FK_c01766b92e52572f0b871c24bb6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` ADD CONSTRAINT \`FK_a361b4bce5b13075ef665acef03\` FOREIGN KEY (\`folderId\`) REFERENCES \`folder\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` ADD CONSTRAINT \`FK_941b789e63dffa3d48f4aa21992\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_941b789e63dffa3d48f4aa21992\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_a361b4bce5b13075ef665acef03\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_c01766b92e52572f0b871c24bb6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` ADD CONSTRAINT \`FK_c01766b92e52572f0b871c24bb6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE \`point\` DROP COLUMN \`photoId\``);
    await queryRunner.query(`ALTER TABLE \`point\` DROP COLUMN \`folderId\``);
  }
}
