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
import { CreateMedicoRequest as CreateMedicoRequest } from '../dtos/create-medico-request.dto';
import { UpdateMedicoRequest } from '../dtos/update-medico-request.dto';
import { MedicoService as MedicoService } from '../services/medico.service';

@Controller('medicos')
export class MedicoController {
  constructor(private medicoService: MedicoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMedico(
    @Body()
    medicoRequest: CreateMedicoRequest,
  ) {
    const medicoId = await this.medicoService.createMedico(medicoRequest);

    return {
      id: medicoId,
    };
  }

  @Get(':id')
  async getMedico(@Param('id') id: string) {
    const medico = await this.medicoService.getMedico(id);

    return medico;
  }

  @Patch(':id')
  async updateMedico(
    @Param('id') id: string,
    @Body()
    medicoRequest: UpdateMedicoRequest,
  ) {
    const medicoId = await this.medicoService.updateMedico(id, medicoRequest);
    return {
      id: medicoId,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMedico(@Param('id') id: string) {
    await this.medicoService.deleteMedico(id);
  }
}
