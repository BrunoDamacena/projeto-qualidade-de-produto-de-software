import { MigrationInterface, QueryRunner } from 'typeorm';

export class Endereco1654464431328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS enderecos (
                    id VARCHAR(255) NOT NULL,
                    rua VARCHAR(255) NOT NULL,
                    numero VARCHAR(255) NOT NULL,
                    complemento VARCHAR(255),
                    bairro VARCHAR(255) NOT NULL,
                    cidade VARCHAR(255) NOT NULL,
                    estado VARCHAR(255) NOT NULL,
                    cep VARCHAR(255) NOT NULL,
                    PRIMARY KEY (id)
                ) ENGINE = InnoDB;
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE enderecos;');
  }
}
