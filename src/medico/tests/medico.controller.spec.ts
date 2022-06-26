import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicoController } from '../controllers/medico.controller';
import { Medico } from '../entitites/medico.entity';
import { MedicoService } from '../services/medico.service';

describe('PacienteController', () => {
  let controller: MedicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoController],
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(Medico),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MedicoController>(MedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
