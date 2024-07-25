import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionResponse } from './dtos/exception.dto';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    let body: ExceptionResponse;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      const message = Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message'].join(', ')
        : exceptionResponse['message'];
      body = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
        stack: exceptionResponse['stack'],
      };
    } else {
      body = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception['message'],
        stack: exception['stack'],
      };
    }
    Logger.error(body.message, JSON.stringify(body), request.url);
    response.status(status).json(body);
  }
}
