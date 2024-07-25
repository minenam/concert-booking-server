import { AuthService } from '@application/services/auth.service';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetTokenBodyDto } from '@presentation/dtos/get-token.dto';
import { Response } from 'express';
import { ServerResponse } from 'http';

@ApiTags('auth')
@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: GetTokenBodyDto })
  @Post('token')
  async getToken(
    @Body() body: GetTokenBodyDto,
    @Res() response: Response,
  ): Promise<ServerResponse> {
    const { token } = await this.authService.getToken(body.userId);
    response.header('user-token', token);
    return response.send({
      statusCode: HttpStatus.OK,
      message: 'Token generated successfully',
    });
  }
}
