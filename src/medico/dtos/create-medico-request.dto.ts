import { IsDateString, IsString } from 'class-validator';
import { IsCPF } from '../../utils/decorators/is-cpf.decorator';

export class CreateMedicoRequest {
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

  @IsString()
  crm: string;

  @IsString()
  especializacao: string;
}
