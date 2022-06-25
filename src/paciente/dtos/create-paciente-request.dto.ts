import { IsDateString, IsString } from 'class-validator';
import { IsCPF } from '../../utils/decorators/is-cpf.decorator';

export class CreatePacienteRequest {
  @IsString()
  nome: string;

  @IsDateString(
    { strict: true },
    {
      message:
        'dataDeNascimento must be a valid date string, in the format YYYY-MM-DD',
    },
  )
  dataNascimento: Date;

  @IsCPF()
  cpf: string;
}
