import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonResponseDto } from './common.dto';

export class ChargeDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class ChargeResponseDto extends CommonResponseDto {
  @ApiProperty()
  @IsNumber()
  balance: number;
}

export class GetBalanceResponseDto extends CommonResponseDto {
  @ApiProperty()
  @IsNumber()
  balance: number;
}

export class PaymentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @IsString()
  token: string;
}
