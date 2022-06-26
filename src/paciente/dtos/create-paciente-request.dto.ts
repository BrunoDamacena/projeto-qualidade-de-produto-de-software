import { IsDateString, IsObject, IsString } from 'class-validator';
import { EnderecoDto } from '../../endereco/dtos/endereco.dto';
import { IsCPF } from '../../utils/decorators/is-cpf.decorator';

export class CreatePacienteRequest {
  @IsString()
  nome: string;

  @IsDateString(
    { strict: true },
    {
      message:
        'dataNascimento must be a valid date string, in the format YYYY-MM-DD',
    },
  )
  dataNascimento: Date;

  @IsObject()
  endereco: EnderecoDto;

  @IsCPF()
  cpf: string;
}
