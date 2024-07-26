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

  async findById(id: number): Promise<ReservationEntity | null> {
    const findParameters = { where: { id } };
    const reservation =
      await this.reservationRepository.findOne(findParameters);
    if (!reservation) return null;
    return reservation;
  }

  async create(
    userId: string,
    seatId: number,
    reservedUntil: Date,
  ): Promise<ReservationEntity> {
    const reservation = this.reservationRepository.create({
      userId,
      seatId,
      reservedUntil,
    });
    return reservation;
  }

  async save(reservation: ReservationEntity): Promise<void> {
    const userEntity = this.reservationRepository.create({
      id: reservation.id,
      userId: reservation.userId,
      seatId: reservation.seatId,
      reservedUntil: reservation.reservedUntil,
      paymentId: reservation.paymentId,
      paymentStatus: reservation.paymentStatus,
    });
    await this.reservationRepository.save(userEntity);
  }

  async update(reservation: ReservationEntity): Promise<void> {
    const userEntity = this.reservationRepository.create({
      userId: reservation.userId,
      seatId: reservation.seatId,
      reservedUntil: reservation.reservedUntil,
      paymentId: reservation.paymentId,
      paymentStatus: reservation.paymentStatus,
    });
    await this.reservationRepository.save(userEntity);
  }
}
