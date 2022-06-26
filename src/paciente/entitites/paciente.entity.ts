import { Endereco } from 'src/endereco/entities/endereco.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  sexo: string;

  @Column({ name: 'enderecos_id' })
  @OneToOne(() => Endereco)
  enderecoId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
