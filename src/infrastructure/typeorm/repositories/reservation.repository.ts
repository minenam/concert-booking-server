import { Reservation } from '@domain/entities/reservation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';
@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}

  async findById(id: number): Promise<Reservation | null> {
    const findParameters = { where: { id } };
    const reservation =
      await this.reservationRepository.findOne(findParameters);
    if (!reservation) return null;
    return new Reservation(
      reservation.id,
      reservation.userId,
      reservation.seatId,
      reservation.reservedUntil,
    );
  }

  async create(
    userId: string,
    seatId: number,
    reservedUntil: Date,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      userId,
      seatId,
      reservedUntil,
    });
    return new Reservation(
      reservation.id,
      reservation.userId,
      reservation.seatId,
      reservation.reservedUntil,
    );
  }

  async save(reservation: Reservation): Promise<void> {
    const userEntity = this.reservationRepository.create({
      id: reservation.id,
      userId: reservation.userId,
      seatId: reservation.seatId,
      reservedUntil: reservation.reservedUntil,
    });
    await this.reservationRepository.save(userEntity);
  }
}
