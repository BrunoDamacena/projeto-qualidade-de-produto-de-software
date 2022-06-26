import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsCEP } from '../../utils/decorators/is-cep.decorator';

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  @IsString()
  rua: string;

  @Column()
  @IsNumber()
  numero: number;

  @Column()
  @IsString()
  @IsOptional()
  complemento: string;

  @Column()
  @IsString()
  bairro: string;

  @Column()
  @IsString()
  cidade: string;

  @Column()
  @IsString()
  estado: string;

  @Column()
  @IsCEP()
  cep: string;
}
