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
    crm: '40133739040',
    dataNascimento: new Date(),
    especializacao: 'cardiologia',
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

  describe('Create medico', () => {
    it('should create a medico successfully', async () => {
      jest.spyOn(mockMedicoRepo, 'save').mockResolvedValueOnce(mockMedico);
      const response = await service.createMedico(
        mockMedico as CreateMedicoRequest,
      );
      expect(response).toEqual(medicoId);
    });

    it('should fail to create a medico because of duplicate crm', async () => {
      jest
        .spyOn(mockMedicoRepo, 'save')
        .mockRejectedValueOnce({ code: 'ER_DUP_ENTRY' });
      await expect(
        service.createMedico(mockMedico as CreateMedicoRequest),
      ).rejects.toThrow(
        'There is already a medic registered with this CRM number',
      );
    });
  });

  describe('Get medico', () => {
    it('should get a medico successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockResolvedValueOnce(mockMedico);
      const response = await service.getMedico(medicoId);
      expect(response).toEqual(mockMedico);
    });

    it('should fail to get a medico if it doesnt exists', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(service.getMedico(medicoId)).rejects.toThrow(
        'Resource not found',
      );
    });
  });

  describe('Update medico', () => {
    it('should update a medico successfully', async () => {
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

    it('should fail to update a medico if not exists', async () => {
      jest
        .spyOn(mockMedicoRepo, 'findOneOrFail')
        .mockRejectedValueOnce(new EntityNotFoundError(Medico, 'id'));
      await expect(
        service.updateMedico(medicoId, mockMedico as UpdateMedicoRequest),
      ).rejects.toThrow('Resource not found');
    });
  });

  describe('Delete medico', () => {
    it('should delete a medico successfully', async () => {
      jest
        .spyOn(mockMedicoRepo, 'softDelete')
        .mockImplementationOnce(() => Promise.resolve());
      await service.deleteMedico(medicoId);
    });
  });
});
