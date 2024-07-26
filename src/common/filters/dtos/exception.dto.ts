import { HttpStatus } from '@nestjs/common';

export class ExceptionResponse {
  statusCode: HttpStatus;
  timestamp: string;
  path: string;
  message: string;
  stack?: string;
}
