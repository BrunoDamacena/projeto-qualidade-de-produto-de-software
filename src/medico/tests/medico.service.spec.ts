import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EntityNotFoundError } from 'typeorm';
import { CreateMedicoRequest } from '../dtos/create-medico-request.dto';
import { UpdateMedicoRequest } from '../dtos/update-medico-request.dto';
import { Medico } from '../entitites/medico.entity';
import { MedicoService } from '../services/medico.service';

describe('MedicoService', () => {
  let service: MedicoService;

  const medicoId = randomUUID();

  const mockMedico: Partial<Medico> = {
    id: medicoId,
    nome: 'John Doe',
    cpf: '40133739040',
    dataNascimento: new Date(),
  };

  const mockMedicoRepo = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoService,
        {
          provide: getRepositoryToken(Medico),
          useValue: mockMedicoRepo,
        },
      ],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Partner', () => {
    it('should create a partner successfully', async () => {
      jest.spyOn(mockMedicoRepo, 'save').mockResolvedValueOnce(mockMedico);
      const response = await service.createMedico(
        mockMedico as CreateMedicoRequest,
      );
      expect(response).toEqual(medicoId);
    });

    it('should fail to create a partner because of duplicate CPF', async () => {
      jest
        .spyOn(mockMedicoRepo, 'save')
        .mockRejectedValueOnce({ code: 'ER_DUP_ENTRY' });
      await expect(
        service.createMedico(mockMedico as CreateMedicoRequest),
      ).rejects.toThrow(
        'There is already a patient registered with this CPF number',
      );
    });
  });

  describe('Get Partner', () => {
    it('should get a partner successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      const response = await service.getMedico(medicoId);
      expect(response).toEqual(mockMedico);
    });

    it('should fail to get a partner if it doesnt exists', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(service.getMedico(medicoId)).rejects.toThrow(
        'Resource with ID was not found',
      );
    });
  });

  describe('Update Partner', () => {
    it('should update a partner successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      jest
        .spyOn(mockMedicoRepo, 'update')
        .mockImplementationOnce(() => Promise.resolve());
      const response = await service.updateMedico(
        medicoId,
        mockMedico as UpdateMedicoRequest,
      );
      expect(response).toEqual(medicoId);
    });

    it('should fail to update a partner if not exists', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(
        service.updateMedico(medicoId, mockMedico as UpdateMedicoRequest),
      ).rejects.toThrow('Resource with ID was not found');
    });
  });

  describe('Delete Partner', () => {
    it('should delete a partner successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'softDelete')
        .mockImplementationOnce(() => Promise.resolve());
      await service.deleteMedico(medicoId);
    });
  });
});
