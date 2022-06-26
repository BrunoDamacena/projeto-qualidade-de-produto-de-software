import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EnderecoDto } from '../dtos/endereco.dto';
import { Endereco } from '../entities/endereco.entity';
import { EnderecoService } from '../services/endereco.service';

describe('EnderecoService', () => {
  let service: EnderecoService;

  const endereco = {
    id: randomUUID(),
    rua: 'Rua da Paz',
    numero: 5576,
    bairro: 'Planalto',
    cidade: 'Serra',
    estado: 'Espirito Santo',
    cep: '69944-213',
  } as unknown;

  const mockEnderecoRepo = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecoService,
        {
          provide: getRepositoryToken(Endereco),
          useValue: mockEnderecoRepo,
        },
      ],
    }).compile();

    service = module.get<EnderecoService>(EnderecoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an address', async () => {
    jest.spyOn(mockEnderecoRepo, 'save').mockResolvedValueOnce(endereco);

    const response = await service.createEndereco(endereco as EnderecoDto);
    expect(response).toBeDefined();
  });
});
