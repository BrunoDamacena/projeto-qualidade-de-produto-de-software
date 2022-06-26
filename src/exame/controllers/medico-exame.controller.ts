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
import { MedicoExameService } from '../services/medico-exame.service';

@Controller('medicos/:medicoId/exames')
export class MedicoExameController {
  constructor(private exameService: MedicoExameService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createExame(
    @Param('medicoId') medicoId: string,
    @Body() createExameRequest: CreateExameDto,
  ) {
    const exameId = await this.exameService.createExame(
      medicoId,
      createExameRequest,
    );

    return {
      id: exameId,
    };
  }

  @Get()
  async getAllExames(@Param('medicoId') medicoId: string) {
    const exames = await this.exameService.findAllExamesByMedico(medicoId);

    return {
      exames,
    };
  }

  @Patch(':id')
  async updateExame(
    @Param('medicoId') medicoId: string,
    @Param('id') exameId: string,
    @Body()
    updateExameRequest: UpdateExameDto,
  ) {
    const id = await this.exameService.updateExame(
      medicoId,
      exameId,
      updateExameRequest,
    );
    return {
      id,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteExame(
    @Param('medicoId') medicoId: string,
    @Param('id') exameId: string,
  ) {
    await this.exameService.deleteExame(medicoId, exameId);
  }
}
