import { UserService } from '@application/services/user.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';
import {
  ChargeDto,
  ChargeResponseDto,
  GetBalanceResponseDto,
  PaymentDto,
} from '../dtos/payment.dto';

@ApiTags('payment')
@UseInterceptors(LoggingInterceptor)
@Controller('payment')
export class PaymentController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '잔액 충전' })
  @ApiBody({ type: ChargeDto })
  @Post('charge')
  async chargeBalance(@Body() charge: ChargeDto): Promise<ChargeResponseDto> {
    const balance = await this.userService.chargeBalance(
      charge.userId,
      +charge.amount,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      balance,
    };
  }

  @ApiOperation({ summary: '잔액 조회' })
  @Get('balance/:userId')
  async getBalance(
    @Param('userId') userId: string,
  ): Promise<GetBalanceResponseDto> {
    const result = await this.userService.getBalance(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      balance: result,
    };
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
