import { UserService } from '@application/services/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';
import { ChargeDto, PaymentDto } from '../dtos/payment.dto';

@ApiTags('payment')
@UseInterceptors(LoggingInterceptor)
@Controller('payment')
export class PaymentController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '잔액 충전' })
  @ApiBody({ type: ChargeDto })
  @Post('charge')
  async chargeBalance(@Body() charge: ChargeDto): Promise<number> {
    return await this.userService.chargeBalance(charge.userId, +charge.amount);
  }

  @ApiOperation({ summary: '잔액 조회' })
  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: string): Promise<number> {
    return await this.userService.getBalance(userId);
  }

  @ApiOperation({ summary: '결제' })
  @ApiBody({ type: PaymentDto })
  @Post()
  async makePayment(@Body() payment: PaymentDto): Promise<number> {
    return await this.userService.makePayment(
      payment.amount,
      payment.reservationId,
      payment.token,
    );
  }
}
