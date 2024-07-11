import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor() {}

  @Post('charge')
  chargeBalance(@Body() charge: { userId: string; amount: number }) {
    return { balance: 200.0 };
  }

  @Get('balance:userId')
  getBalance(@Param('userId') userId: string) {
    return { balance: 200.0 };
  }

  @Post()
  makePayment(
    @Body() payment: { amount: number; reservationId: number; token: string },
  ) {
    return {
      reservationId: 1,
      status: 'COMPLETED',
    };
  }
}
