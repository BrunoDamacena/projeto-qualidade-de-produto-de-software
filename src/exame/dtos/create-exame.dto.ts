import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateExameDto {
  @IsUUID()
  pacienteId: string;

  @IsDateString()
  horario: Date;

  @IsString()
  tipo: string;
}
