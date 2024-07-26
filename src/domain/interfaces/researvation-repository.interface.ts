import { Reservation } from '@domain/entities/reservation.entity';

export interface ReservationRepositoryInterface {
  create(
    userId: string,
    seatId: number,
    reservedUntil: Date,
  ): Promise<Reservation>;
  save(reservation: Reservation): Promise<void>;
}
