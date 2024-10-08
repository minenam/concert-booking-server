import {
  PaymentStatus,
  Reservation,
} from '@domain/entities/reservation.entity';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { ReservationRepositoryInterface } from '@domain/interfaces/researvation-repository.interface';
import { SeatRepositoryInterface } from '@domain/interfaces/seat-repository.interface';
import { UserRepositoryInterface } from '@domain/interfaces/user-repository.interface';
import { SeatStatus } from '@infrastructure/typeorm/entities/seat.entity';

import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('QueueRepository')
    private readonly queueRepository: QueueRepositoryInterface,
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryInterface,
    @Inject('SeatRepository')
    private readonly seatRepository: SeatRepositoryInterface,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async reserveSeat(
    userId: string,
    date: string,
    seatId: number,
  ): Promise<Reservation> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const queue = await this.queueRepository.findByUserId(userId);
    if (!queue) {
      throw new NotFoundException('User is not in the queue');
    }

    const seat = await this.seatRepository.findByIdAndDate(seatId, date);
    if (!seat || seat.status !== SeatStatus.PENDING) {
      throw new NotAcceptableException('Seat is not available');
    }

    const reservedUntil = new Date(Date.now() + 5 * 60 * 1000);
    seat.status = SeatStatus.RESERVED;

    const reservation = await this.reservationRepository.create(
      userId,
      seatId,
      reservedUntil,
    );
    await this.reservationRepository.save(reservation);
    await this.seatRepository.save(seat);

    return reservation;
  }
  async processPayment(
    userId: string,
    reservationId: number,
    amount: number,
  ): Promise<string> {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation || reservation.userId !== userId) {
      throw new Error('Reservation not found or user mismatch');
    }
    // Process the payment here (simplified for example)
    reservation.paymentStatus = PaymentStatus.DONE;
    await this.reservationRepository.update(reservation);
    return 'Payment successful';
  }
}
