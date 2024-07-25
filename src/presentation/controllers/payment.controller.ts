import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';
import { ChargeDto, PaymentDto } from '../dtos/payment.dto';

@ApiTags('payment')
@UseInterceptors(LoggingInterceptor)
@Controller('payment')
export class PaymentController {
  constructor() {}

  @ApiBody({ type: ChargeDto })
  @Post('charge')
  chargeBalance(@Body() charge: ChargeDto) {
    return { balance: 200.0 };
  }

  @Get('balance:userId')
  getBalance(@Param('userId') userId: string) {
    return { balance: 200.0 };
  }

  @ApiBody({ type: PaymentDto })
  @Post()
  makePayment(@Body() payment: PaymentDto) {
    return {
      reservationId: 1,
      status: 'COMPLETED',
    };
  }
}
