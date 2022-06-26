import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from '../../paciente/entitites/paciente.entity';
import { PacienteExameController } from '../controllers/paciente-exame.controller';
import { Exame } from '../entitites/exame.entity';
import { PacienteExameService } from '../services/paciente-exame.service';

describe('PacienteExameController', () => {
  let controller: PacienteExameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteExameController],
      providers: [
        PacienteExameService,
        {
          provide: getRepositoryToken(Exame),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PacienteExameController>(PacienteExameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
