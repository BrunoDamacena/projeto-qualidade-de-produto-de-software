import { Exame } from 'src/exame/entitites/exame.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'medicos' })
export class Medico {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  crm: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  especializacao: string;

  @OneToMany(() => Exame, exame => exame.medicoId)
  exame: Exame[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
