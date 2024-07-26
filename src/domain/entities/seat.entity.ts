import { SeatStatus } from '@infrastructure/typeorm/entities/seat.entity';

export class Seat {
  id: number;
  seatNumber: number;
  status: SeatStatus;
  date: string;
  price: number;
  concertId: number;
}
