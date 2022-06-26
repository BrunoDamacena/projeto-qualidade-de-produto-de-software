import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Medico } from '../../medico/entitites/medico.entity';
import { Paciente } from '../../paciente/entitites/paciente.entity';
import { readOperationException } from '../../utils/readOperationException';
import { Repository } from 'typeorm';
import { CreateExameDto } from '../dtos/create-exame.dto';
import { UpdateExameDto } from '../dtos/update-exame.dto';
import { Exame } from '../entitites/exame.entity';

@Injectable()
export class MedicoExameService {
  constructor(
    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async createExame(
    medicoId: string,
    exameRequest: CreateExameDto,
  ): Promise<string> {
    const medico = await this.getMedico(medicoId);

    const paciente = await this.getPaciente(exameRequest.pacienteId);

    const exame = await this.exameRepository.save({
      id: randomUUID(),
      tipo: exameRequest.tipo,
      horario: exameRequest.horario,
      medicoId: medico.id,
      pacienteId: paciente.id,
    });
    return exame.id;
  }

  async findAllExamesByMedico(medicoId: string): Promise<Exame[]> {
    const medico = await this.getMedico(medicoId);
    const exames = await this.exameRepository.find({
      where: {
        medicoId: medico.id,
      },
    });
    return exames;
  }

  async updateExame(
    medicoId: string,
    exameId: string,
    exameRequest: UpdateExameDto,
  ): Promise<string> {
    if (!exameRequest || Object.keys(exameRequest).length === 0) {
      throw new BadRequestException(
        'Patch should update at least one valid field',
      );
    }
    await this.getMedico(medicoId);
    await this.getExame(exameId);
    await this.exameRepository.update(exameId, exameRequest);

    return exameId;
  }

  async deleteExame(medicoId: string, exameId: string): Promise<void> {
    await this.getMedico(medicoId);
    await this.exameRepository.softDelete(exameId);
  }

  private getMedico(medicoId: string): Promise<Medico> {
    return this.medicoRepository.findOneOrFail(medicoId).catch(e => {
      throw readOperationException(e);
    });
  }

  private getPaciente(pacienteId: string): Promise<Paciente> {
    return this.pacienteRepository.findOneOrFail(pacienteId).catch(e => {
      throw readOperationException(e);
    });
  }

  private getExame(exameId: string): Promise<Exame> {
    return this.exameRepository.findOneOrFail(exameId).catch(e => {
      throw readOperationException(e);
    });
  }
}
