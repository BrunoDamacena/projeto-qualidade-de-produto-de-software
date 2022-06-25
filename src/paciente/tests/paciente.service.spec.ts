import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from '../entitites/paciente.entity';
import { PacienteService } from '../services/paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;

  const mockPacienteRepo = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockPacienteRepo,
        },
      ],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
