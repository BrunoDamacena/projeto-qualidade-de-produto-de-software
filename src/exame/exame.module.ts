import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from 'src/medico/entitites/medico.entity';
import { Paciente } from 'src/paciente/entitites/paciente.entity';
import { MedicoExameController } from './controllers/medico-exame.controller';
import { PacienteExameController } from './controllers/paciente-exame.controller';
import { Exame } from './entitites/exame.entity';
import { MedicoExameService } from './services/medico-exame.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exame, Medico, Paciente])],
  controllers: [MedicoExameController, PacienteExameController],
  providers: [MedicoExameService],
})
export class ExameModule {}
