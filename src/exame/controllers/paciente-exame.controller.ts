import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExameDto } from '../dtos/create-exame.dto';
import { UpdateExameDto } from '../dtos/update-exame.dto';
import { PacienteExameService } from '../services/paciente-exame.service';

@Controller('pacientes/:pacienteId/exames')
export class PacienteExameController {
  constructor(private exameService: PacienteExameService) {}

  @Get()
  async getAllExames(@Param('pacienteId') pacienteId: string) {
    const exames = await this.exameService.findAllExamesByPaciente(pacienteId);
    return {
      exames,
    };
  }
}
