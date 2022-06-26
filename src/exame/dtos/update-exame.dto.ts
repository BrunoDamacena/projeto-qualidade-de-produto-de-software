import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateExameDto {
  @IsDateString()
  @IsOptional()
  horario: string;

  @IsString()
  @IsOptional()
  resultado: string;
}
