import { ApiProperty } from '@nestjs/swagger';

export class ChargeDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  amount: number;
}

export class PaymentDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  reservationId: number;

  @ApiProperty()
  token: string;
}
