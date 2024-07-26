import { SeatStatus } from '@infrastructure/typeorm/entities/seat.entity';
import { Concert } from './concert.entity';

export class Seat {
  id: number;
  seatNumber: number;
  status: SeatStatus;
  date: string;
  price: number;
  concert: Concert;
}
