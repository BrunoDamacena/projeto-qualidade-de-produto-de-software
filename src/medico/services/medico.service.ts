import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { readOperationException } from '../../utils/readOperationException';
import { Repository } from 'typeorm';
import { CreateMedicoRequest } from '../dtos/create-medico-request.dto';
import { UpdateMedicoRequest } from '../dtos/update-medico-request.dto';
import { Medico } from '../entitites/medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
  ) {}

  async createMedico(medicoRequest: CreateMedicoRequest): Promise<string> {
    const medico = await this.medicoRepository
      .save({
        id: randomUUID(),
        nome: medicoRequest.nome,
        crm: medicoRequest.crm,
        dataNascimento: medicoRequest.dataNascimento,
        especializacao: medicoRequest.especializacao,
      } as Partial<Medico>)
      .catch(e => {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException(
            'There is already a medic registered with this CRM number',
          );
        }
        throw new InternalServerErrorException();
      });

    return medico.id;
  }

  async getMedico(medicoId: string): Promise<Medico> {
    const paciente = await this.findMedicoById(medicoId);
    return paciente;
  }

  async updateMedico(
    medicoId: string,
    medicoRequest: UpdateMedicoRequest,
  ): Promise<string> {
    if (!medicoRequest || Object.keys(medicoRequest).length === 0) {
      throw new BadRequestException(
        'Patch should update at least one valid field',
      );
    }
    const medico = await this.findMedicoById(medicoId);
    await this.medicoRepository.update(medico.id, medicoRequest);
    return medico.id;
  }

  async deleteMedico(medicoId: string): Promise<void> {
    this.medicoRepository.softDelete(medicoId).catch(e => {
      throw new InternalServerErrorException(e);
    });
  }

  private async findMedicoById(medicoId: string): Promise<Medico> {
    return this.medicoRepository.findOneOrFail(medicoId).catch(e => {
      throw readOperationException(e);
    });
  }
}
