import { MigrationInterface, QueryRunner } from 'typeorm';

export class Medico1656275475285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                        CREATE TABLE IF NOT EXISTS medicos (
                            id VARCHAR(255) NOT NULL UNIQUE,
                            nome VARCHAR(255) NOT NULL,
                            crm VARCHAR(255) NOT NULL UNIQUE,
                            data_nascimento DATE,
                            especializacao VARCHAR(255),
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NULL,
                            deleted_at TIMESTAMP NULL,
                            PRIMARY KEY (id),
                        ) ENGINE = InnoDB;
                    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE medicos;');
  }
}
