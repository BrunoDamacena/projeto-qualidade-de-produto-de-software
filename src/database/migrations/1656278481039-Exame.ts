import { MigrationInterface, QueryRunner } from 'typeorm';

export class Exame1656278481039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                      CREATE TABLE IF NOT EXISTS exames (
                          id VARCHAR(255) NOT NULL UNIQUE,
                          tipo VARCHAR(255) NOT NULL,
                          resultado VARCHAR(255),
                          horario TIMESTAMP,
                          pacientes_id VARCHAR(255),
                          medicos_id VARCHAR(255),
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NULL,
                          deleted_at TIMESTAMP NULL,
                          PRIMARY KEY (id),
                          INDEX fk_exame_tem_medico_idx (medicos_id ASC),
                          INDEX fk_exame_tem_paciente_idx (pacientes_id ASC),
                          CONSTRAINT fk_exame_tem_medico_idx
                              FOREIGN KEY (medicos_id)
                              REFERENCES medicos (id)
                              ON DELETE NO ACTION
                              ON UPDATE NO ACTION,
                          CONSTRAINT fk_exame_tem_paciente_idx
                              FOREIGN KEY (pacientes_id)
                              REFERENCES pacientes (id)
                              ON DELETE NO ACTION
                              ON UPDATE NO ACTION
                      ) ENGINE = InnoDB;
                  `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE exames;');
  }
}
