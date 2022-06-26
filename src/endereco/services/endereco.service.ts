import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { randomUUID } from 'crypto';
import { Endereco } from '../../endereco/entities/endereco.entity';
import { Repository } from 'typeorm';
import { EnderecoDto } from '../dtos/endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

  async createEndereco(enderecoDto: EnderecoDto): Promise<string> {
    await this.validate(enderecoDto);

    const endereco: Endereco = {
      id: randomUUID(),
      rua: enderecoDto.rua,
      numero: enderecoDto.numero,
      complemento: enderecoDto.complemento,
      bairro: enderecoDto.bairro,
      cidade: enderecoDto.cidade,
      estado: enderecoDto.estado,
      cep: enderecoDto.cep,
    };

    await this.enderecoRepository.save(endereco);
    return endereco.id;
  }

  private async validate(endereco: EnderecoDto) {
    endereco = plainToInstance(EnderecoDto, endereco);
    const validationErrors = await validate(endereco);

    const constraints = validationErrors.flatMap(validationError =>
      Object.values(validationError.constraints),
    );

    if (constraints.length) {
      const response = ['Endereco should be a valid endereco', ...constraints];
      throw new UnprocessableEntityException(response);
    }
  }
}
