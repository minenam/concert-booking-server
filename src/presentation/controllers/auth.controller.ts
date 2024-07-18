import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '@presentation/dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @ApiBody({ type: AuthDto })
  @Post('token')
  getToken(@Body() body: AuthDto) {
    return {
      token: 'test-token',
      queueInfo: { position: 1, estimatedWaitTime: 120 },
    };
  }
}
