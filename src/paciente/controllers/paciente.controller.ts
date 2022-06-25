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
import { CreatePacienteRequest } from '../dtos/create-paciente-request.dto';
import { UpdatePacienteRequest } from '../dtos/update-paciente-request.dto';
import { PacienteService } from '../services/paciente.service';

@Controller('pacientes')
export class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaciente(
    @Body()
    pacienteRequest: CreatePacienteRequest,
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

  @Patch(':id')
  async updatePaciente(
    @Param('id') id: string,
    @Body()
    pacienteRequest: UpdatePacienteRequest,
  ) {
    const pacienteId = await this.pacienteService.updatePaciente(
      id,
      pacienteRequest,
    );
    return {
      id: pacienteId,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePaciente(@Param('id') id: string) {
    await this.pacienteService.deletePaciente(id);
  }
}
