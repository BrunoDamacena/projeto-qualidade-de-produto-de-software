import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entitites/paciente.entity';
import { readOperationException } from 'src/utils/readOperationException';
import { Repository } from 'typeorm';
import { Exame } from '../entitites/exame.entity';

@Injectable()
export class PacienteExameService {
  constructor(
    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async findAllExamesByPaciente(pacienteId: string): Promise<Exame[]> {
    const medico = await this.getPaciente(pacienteId);
    const exames = await this.exameRepository.find({
      where: {
        pacienteId: medico.id,
      },
    });
    return exames;
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
