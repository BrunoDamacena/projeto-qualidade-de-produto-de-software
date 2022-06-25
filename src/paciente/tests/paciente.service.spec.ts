import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EntityNotFoundError } from 'typeorm';
import { CreatePacienteRequest } from '../dtos/create-paciente-request.dto';
import { UpdatePacienteRequest } from '../dtos/update-paciente-request.dto';
import { Paciente } from '../entitites/paciente.entity';
import { PacienteService } from '../services/paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;

  const pacienteId = randomUUID();

  const mockPaciente: Partial<Paciente> = {
    id: pacienteId,
    nome: 'John Doe',
    cpf: '40133739040',
    dataNascimento: new Date(),
  };

  const mockPacienteRepo = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

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

  describe('Create Partner', () => {
    it('should create a partner successfully', async () => {
      jest.spyOn(mockPacienteRepo, 'save').mockResolvedValueOnce(mockPaciente);
      const response = await service.createPaciente(
        mockPaciente as CreatePacienteRequest,
      );
      expect(response).toEqual(pacienteId);
    });

    it('should fail to create a partner because of duplicate CPF', async () => {
      jest
        .spyOn(mockPacienteRepo, 'save')
        .mockRejectedValueOnce({ code: 'ER_DUP_ENTRY' });
      await expect(
        service.createPaciente(mockPaciente as CreatePacienteRequest),
      ).rejects.toThrow(
        'There is already a patient registered with this CPF number',
      );
    });
  });

  describe('Get Partner', () => {
    it('should get a partner successfully', async () => {
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockPaciente);
      const response = await service.getPaciente(pacienteId);
      expect(response).toEqual(mockPaciente);
    });

    it('should fail to get a partner if it doesnt exists', async () => {
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Paciente, 'id'));
      await expect(service.getPaciente(pacienteId)).rejects.toThrow(
        'Resource with ID was not found',
      );
    });
  });

  describe('Update Partner', () => {
    it('should update a partner successfully', async () => {
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockPaciente);
      jest
        .spyOn(mockPacienteRepo, 'update')
        .mockImplementationOnce(() => Promise.resolve());
      const response = await service.updatePaciente(
        pacienteId,
        mockPaciente as UpdatePacienteRequest,
      );
      expect(response).toEqual(pacienteId);
    });

    it('should fail to update a partner if not exists', async () => {
      jest
        .spyOn(mockPacienteRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Paciente, 'id'));
      await expect(
        service.updatePaciente(
          pacienteId,
          mockPaciente as UpdatePacienteRequest,
        ),
      ).rejects.toThrow('Resource with ID was not found');
    });
  });

  describe('Delete Partner', () => {
    it('should delete a partner successfully', async () => {
      jest
        .spyOn(mockPacienteRepo, 'softDelete')
        .mockImplementationOnce(() => Promise.resolve());
      await service.deletePaciente(pacienteId);
    });
  });
});
