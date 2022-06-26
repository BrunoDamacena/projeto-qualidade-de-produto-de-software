import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EnderecoService } from 'src/endereco/services/endereco.service';
import { Repository } from 'typeorm';
import { CreatePacienteRequest } from '../dtos/create-paciente-request.dto';
import { UpdatePacienteRequest } from '../dtos/update-paciente-request.dto';
import { Paciente } from '../entitites/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
    private enderecoService: EnderecoService,
  ) {}

  async createPaciente(
    pacienteRequest: CreatePacienteRequest,
  ): Promise<string> {
    const enderecoId = await this.enderecoService.createEndereco(
      pacienteRequest.endereco,
    );

    const paciente = await this.pacienteRepository
      .save({
        id: randomUUID(),
        nome: pacienteRequest.nome,
        cpf: pacienteRequest.cpf,
        dataNascimento: pacienteRequest.dataNascimento,
        enderecoId,
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
    const paciente = await this.findPacienteById(pacienteId);
    return paciente;
  }

  async updatePaciente(
    pacienteId: string,
    pacienteRequest: UpdatePacienteRequest,
  ): Promise<string> {
    if (!pacienteRequest || Object.keys(pacienteRequest).length === 0) {
      throw new BadRequestException(
        'Patch should update at least one valid field',
      );
    }
    const paciente = await this.findPacienteById(pacienteId);
    await this.pacienteRepository.update(paciente.id, pacienteRequest);
    return paciente.id;
  }

  async deletePaciente(pacienteId: string): Promise<void> {
    this.pacienteRepository.softDelete(pacienteId).catch(e => {
      throw new InternalServerErrorException(e);
    });
  }

  private async findPacienteById(pacienteId: string): Promise<Paciente> {
    return this.pacienteRepository.findOneOrFail(pacienteId).catch(e => {
      throw new NotFoundException('Resource with ID was not found');
    });
  }
}
