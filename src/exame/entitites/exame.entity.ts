import { Medico } from 'src/medico/entitites/medico.entity';
import { Paciente } from 'src/paciente/entitites/paciente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'exames' })
export class Exame {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  tipo: string;

  @Column()
  resultado: string;

  @Column()
  horario: Date;

  @JoinColumn({ name: 'medicos_id' })
  @ManyToOne(() => Medico, medico => medico.id)
  medicoId: string;

  @JoinColumn({ name: 'pacientes_id' })
  @ManyToOne(() => Paciente, paciente => paciente.id)
  pacienteId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
