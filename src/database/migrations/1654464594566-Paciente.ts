import { MigrationInterface, QueryRunner } from 'typeorm';

export class Paciente1654464594566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS pacientes (
                    id VARCHAR(255) NOT NULL UNIQUE,
                    nome VARCHAR(255) NOT NULL,
                    cpf VARCHAR(255) NOT NULL UNIQUE,
                    data_nascimento DATE,
                    sexo CHAR(1),
                    enderecos_id VARCHAR(255),
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP NULL,
                    deleted_at TIMESTAMP NULL,
                    PRIMARY KEY (id),
                    INDEX fk_paciente_tem_endereco_idx (enderecos_id ASC),
                    CONSTRAINT fk_paciente_tem_endereco_idx
                        FOREIGN KEY (enderecos_id)
                        REFERENCES enderecos (id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION
                ) ENGINE = InnoDB;
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pacientes;');
  }
}
