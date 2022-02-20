import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1645329267466 implements MigrationInterface {
  name = 'User1645329267466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO user (id, name) VALUES (1, '아이유')`);
    await queryRunner.query(`INSERT INTO user (id, name) VALUES (2, '이병헌')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user WHERE id = 2`);
    await queryRunner.query(`DELETE FROM user WHERE id = 1`);
  }
}
