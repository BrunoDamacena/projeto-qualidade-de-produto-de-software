import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Endereco {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  // endereco

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
