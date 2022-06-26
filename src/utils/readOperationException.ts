import {
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';

export function readOperationException(exception): HttpException {
  if (exception instanceof EntityNotFoundError) {
    return new NotFoundException('Resource not found');
  }

  return new InternalServerErrorException();
}
