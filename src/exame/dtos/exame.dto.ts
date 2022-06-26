import { IsString } from 'class-validator';

export class ExameDto {
  @IsString()
  tipo: string;

  @IsString()
  resultado: string;
}