import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('token')
  getToken(@Body() userId: string) {
    return {
      token: 'test-token',
      queueInfo: { position: 1, estimatedWaitTime: 120 },
    };
  }
}
