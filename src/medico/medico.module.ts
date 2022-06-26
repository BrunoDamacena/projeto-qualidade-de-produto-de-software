import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoController } from './controllers/medico.controller';
import { Medico } from './entitites/medico.entity';
import { MedicoService } from './services/medico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  controllers: [MedicoController],
  providers: [MedicoService],
})
export class MedicoModule {}
