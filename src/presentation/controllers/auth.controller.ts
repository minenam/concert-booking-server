import { AuthService } from '@application/services/auth.service';
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
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';
import { Response } from 'express';

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
  ): Promise<void> {
    const { token } = await this.authService.getToken(body.userId);
    response.header('user-token', token);
    response.send({
      statusCode: HttpStatus.OK,
      message: 'Token generated successfully',
    });
  }
}
