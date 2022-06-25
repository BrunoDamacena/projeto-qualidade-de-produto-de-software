import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './controllers/paciente.controller';
import { Paciente } from './entitites/paciente.entity';
import { PacienteService } from './services/paciente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}
