import {
  Reservation,
  UpdateReservation,
} from '@domain/entities/reservation.entity';

export interface ReservationRepositoryInterface {
  create(
    userId: string,
    seatId: number,
    reservedUntil: Date,
  ): Promise<Reservation>;
  save(reservation: Reservation): Promise<void>;
  findById(id: number): Promise<Reservation | undefined>;
  update(reservation: UpdateReservation): Promise<void>;
}
