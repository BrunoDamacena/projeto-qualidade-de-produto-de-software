import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
