import { ApiProperty } from '@nestjs/swagger';

export class ReservationsDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  seat: number;

  @ApiProperty()
  token: string;
}
