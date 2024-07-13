import { SeatStatus } from '@infrastructure/orm/entities/seat.entity';

export class Seat {
  constructor(
    public id: number,
    public seatNumber: number,
    public status: SeatStatus,
    public price: number,
  ) {}
}
