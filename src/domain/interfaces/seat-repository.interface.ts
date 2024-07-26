import { Seat } from '@domain/entities/seat.entity';

export interface SeatRepositoryInterface {
  findById(id: string): Promise<Seat | null>;
  findByIdAndDate(id: number, date: string): Promise<Seat | null>;
  save(seat: Seat): Promise<void>;
  update(seat: Seat): Promise<void>;
}
