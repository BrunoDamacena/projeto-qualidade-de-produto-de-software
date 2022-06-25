import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { PacienteRequest } from '../dtos/create-paciente-request.dto';
import { Paciente } from '../entitites/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async createPaciente(pacienteRequest: PacienteRequest): Promise<string> {
    const paciente = await this.pacienteRepository
      .save({
        id: randomUUID(),
        nome: pacienteRequest.nome,
        cpf: pacienteRequest.cpf,
        dataNascimento: pacienteRequest.dataDeNascimento,
      } as Partial<Paciente>)
      .catch(e => {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException(
            'There is already a patient registered with this CPF number',
          );
        }
        throw new InternalServerErrorException();
      });

    return paciente.id;
  }

  async getPaciente(pacienteId: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository
      .findOneOrFail(pacienteId)
      .catch(e => {
        throw new NotFoundException('Resource with ID was not found');
      });

    return paciente;
  }
}
