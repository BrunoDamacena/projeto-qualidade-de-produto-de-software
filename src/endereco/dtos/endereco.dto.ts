import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsCEP } from '../../utils/decorators/is-cep.decorator';

export class EnderecoDto {
  @IsString()
  rua: string;

  @IsNumber()
  numero: number;

  @IsString()
  @IsOptional()
  complemento: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsCEP()
  cep: string;
}
