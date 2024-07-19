import { ApiProperty } from '@nestjs/swagger';

export class ReservationsDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  seatId: number;
}
