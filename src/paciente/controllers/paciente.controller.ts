import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';
import { PacienteRequest } from '../dtos/create-paciente-request.dto';
import { PacienteService } from '../services/paciente.service';

@Controller('pacientes')
export class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaciente(
    @Body()
    pacienteRequest: PacienteRequest,
  ) {
    const pacienteId = await this.pacienteService.createPaciente(
      pacienteRequest,
    );

    return {
      id: pacienteId,
    };
  }

  @Get(':id')
  async getPaciente(@Param('id') id: string) {
    const paciente = await this.pacienteService.getPaciente(id);

    return paciente;
  }
}
