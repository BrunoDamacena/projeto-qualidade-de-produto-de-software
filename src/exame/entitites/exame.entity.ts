import { Paciente } from 'src/paciente/entitites/paciente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'exame' })
export class Exame {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  resultado: string;

  @Column()
  horario: Date;

  @Column()
  tipo: string;

  /*@Column({ name: 'medico_id' })
  @ManyToOne(() => Medico)
  medicoId: string;*/

  @Column({ name: 'paciente_id' })
  @ManyToOne(() => Paciente)
  pacienteId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}