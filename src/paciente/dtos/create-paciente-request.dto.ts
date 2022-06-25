import { IsDateString, IsString } from 'class-validator';
import { IsCPF } from 'src/utils/decorators/is-cpf.decorator';

export class PacienteRequest {
  @IsString()
  nome: string;

  @IsDateString(
    { strict: true },
    {
      message:
        'dataDeNascimento must be a valid date string, in the format YYYY-MM-DD',
    },
  )
  dataDeNascimento: Date;

  @IsCPF()
  cpf: string;
}
