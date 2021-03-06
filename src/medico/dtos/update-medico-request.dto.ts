import { IsDateString, IsOptional, Length } from 'class-validator';
import { IsCPF } from '../../utils/decorators/is-cpf.decorator';

export class UpdateMedicoRequest {
  @IsOptional()
  nome: string;

  @IsOptional()
  @IsDateString(
    { strict: true },
    {
      message:
        'dataDeNascimento must be a valid date string, in the format YYYY-MM-DD',
    },
  )
  dataDeNascimento: Date;

  @IsOptional()
  crm: string;

  @IsOptional()
  especializacao: string;
}
