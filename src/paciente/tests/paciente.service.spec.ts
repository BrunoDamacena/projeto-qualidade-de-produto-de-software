import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Endereco } from '../../endereco/entities/endereco.entity';
import { EntityNotFoundError } from 'typeorm';
import { CreatePacienteRequest } from '../dtos/create-paciente-request.dto';
import { UpdatePacienteRequest } from '../dtos/update-paciente-request.dto';
import { Paciente } from '../entitites/paciente.entity';
import { PacienteService } from '../services/paciente.service';
import { EnderecoService } from '../../endereco/services/endereco.service';

describe('PacienteService', () => {
  let service: PacienteService;

  const pacienteId = randomUUID();

  const endereco = {
    rua: 'Rua da Paz',
    numero: 5576,
    bairro: 'Planalto',
    cidade: 'Serra',
    estado: 'Espirito Santo',
    cep: '69944-213',
  };

  const mockPaciente = {
    id: pacienteId,
    nome: 'John Doe',
    cpf: '40133739040',
    dataNascimento: new Date(),
    endereco,
  } as unknown;

  const mockPacienteRepo = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockEnderecoRepo = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacienteService,
        EnderecoService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockPacienteRepo,
        },
        {
          provide: getRepositoryToken(Endereco),
          useValue: mockEnderecoRepo,
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
      jest.spyOn(mockEnderecoRepo, 'save').mockResolvedValueOnce({
        id: randomUUID(),
        ...endereco,
      });
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
        'Resource not found',
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
      ).rejects.toThrow('Resource not found');
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
