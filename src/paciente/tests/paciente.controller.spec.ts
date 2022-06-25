import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PacienteController } from '../controllers/paciente.controller';
import { Paciente } from '../entitites/paciente.entity';
import { PacienteService } from '../services/paciente.service';

describe('PacienteController', () => {
  let controller: PacienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PacienteController>(PacienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
