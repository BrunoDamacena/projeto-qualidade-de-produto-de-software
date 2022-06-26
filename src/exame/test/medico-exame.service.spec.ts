import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { EntityNotFoundError } from 'typeorm';
import { Medico } from '../../medico/entitites/medico.entity';
import { Paciente } from '../../paciente/entitites/paciente.entity';
import { CreateExameDto } from '../dtos/create-exame.dto';
import { UpdateExameDto } from '../dtos/update-exame.dto';
import { Exame } from '../entitites/exame.entity';
import { MedicoExameService } from '../services/medico-exame.service';

describe('MedicoExameService', () => {
  let service: MedicoExameService;

  const medicoId = randomUUID();
  const pacienteId = randomUUID();
  const exameId = randomUUID();

  const mockMedico: Partial<Medico> = {
    id: medicoId,
  };

  const mockPaciente: Partial<Paciente> = {
    id: pacienteId,
  };

  const mockExame: Partial<Exame> = {
    id: exameId,
    tipo: 'cardiologia',
    horario: new Date(),
    pacienteId,
  };

  const mockExameRepo = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockMedicoRepo = {
    findOneOrFail: jest.fn(),
  };

  const mockPacienteRepo = {
    findOneOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoExameService,
        {
          provide: getRepositoryToken(Exame),
          useValue: mockExameRepo,
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: mockMedicoRepo,
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockPacienteRepo,
        },
      ],
    }).compile();

    service = module.get<MedicoExameService>(MedicoExameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Exame', () => {
    it('should create an exam succesfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockPaciente);
      jest.spyOn(mockExameRepo, 'save').mockResolvedValueOnce(mockExame);

      const response = await service.createExame(
        medicoId,
        mockExameRepo as unknown as CreateExameDto,
      );
      expect(response).toBe(exameId);
    });

    it('should fail to create an exam if medico doesnt exist', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(
        service.createExame(medicoId, {} as CreateExameDto),
      ).rejects.toThrow('Resource not found');
    });

    it('should fail to create an exam if paciente doesnt exist', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Paciente, 'id'));
      await expect(
        service.createExame(medicoId, {} as CreateExameDto),
      ).rejects.toThrow('Resource not found');
    });
  });

  describe('Get Exame', () => {
    it('should get a list of exams succesfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest.spyOn(mockExameRepo, 'find').mockResolvedValueOnce([mockExame]);

      const response = await service.findAllExamesByMedico(medicoId);
      expect(response).toHaveLength(1);
      expect(response[0]).toBe(mockExame);
    });
  });

  describe('Update Exame', () => {
    it('should update an exam successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockPaciente);
      jest
        .spyOn(mockExameRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockExame);
      jest
        .spyOn(mockExameRepo, 'update')
        .mockImplementationOnce(() => Promise.resolve());

      const response = await service.updateExame(
        medicoId,
        exameId,
        mockExameRepo as unknown as UpdateExameDto,
      );
      expect(response).toBe(exameId);
    });

    it('should fail to update an exam if medico doesnt exist', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(
        service.updateExame(
          medicoId,
          exameId,
          mockExameRepo as unknown as UpdateExameDto,
        ),
      ).rejects.toThrow('Resource not found');
    });

    it('should fail to update an exam if exame doesnt exist', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockExameRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Exame, 'id'));
      await expect(
        service.updateExame(
          medicoId,
          exameId,
          mockExameRepo as unknown as UpdateExameDto,
        ),
      ).rejects.toThrow('Resource not found');
    });
  });

  describe('Delete Exame', () => {
    it('should delete an exam successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockExameRepo, 'softDelete')
        .mockImplementationOnce(() => Promise.resolve());

      await service.deleteExame(medicoId, exameId);
    });
  });
});
