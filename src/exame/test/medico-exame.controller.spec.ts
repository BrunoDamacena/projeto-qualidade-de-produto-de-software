import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from '../../medico/entitites/medico.entity';
import { Paciente } from '../../paciente/entitites/paciente.entity';
import { MedicoExameController } from '../controllers/medico-exame.controller';
import { Exame } from '../entitites/exame.entity';
import { MedicoExameService } from '../services/medico-exame.service';

describe('MedicoExameController', () => {
  let controller: MedicoExameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoExameController],
      providers: [
        MedicoExameService,
        {
          provide: getRepositoryToken(Exame),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MedicoExameController>(MedicoExameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
