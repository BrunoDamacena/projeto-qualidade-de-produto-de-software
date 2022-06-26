import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { EnderecoService } from 'src/endereco/services/endereco.service';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
