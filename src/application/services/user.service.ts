import { QueueStatus } from '@domain/entities/queue.entity';
import { PaymentStatus } from '@domain/entities/reservation.entity';
import { PaymentRepositoryInterface } from '@domain/interfaces/payment-repository.interface';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { ReservationRepositoryInterface } from '@domain/interfaces/researvation-repository.interface';
import { UserRepositoryInterface } from '@domain/interfaces/user-repository.interface';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('QueueRepository')
    private readonly queueRepository: QueueRepositoryInterface,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepositoryInterface,
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryInterface,
  ) {}

  async chargeBalance(userId: string, amount: number): Promise<number> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.balance += amount;
    await this.userRepository.update(user);
    return user.balance;
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.balance;
  }

  async makePayment(
    amount: number,
    reservationId: number,
    token: string,
  ): Promise<number> {
    const userId = await this.validateToken(token);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance < amount) {
      throw new UnauthorizedException('Insufficient balance');
    }

    user.balance -= amount;
    await this.userRepository.update(user);

    const payment = await this.paymentRepository.save({
      userId,
      reservationId,
      amount,
    });
    const reservation =
      await this.reservationRepository.findById(reservationId);
    await this.reservationRepository.update({
      userId,
      seatId: reservation.seatId,
      paymentId: payment.id,
      paymentStatus: PaymentStatus.DONE,
      reservedUntil: reservation.reservedUntil,
    });

    return payment.id;
  }

  private async validateToken(token: string): Promise<string> {
    const [userId, queueInfo] = token.split('::');
    const queue = JSON.parse(queueInfo);

    const userQueue = await this.queueRepository.findByUserIdAndPosition(
      userId,
      queue.position,
      QueueStatus.WAITING,
    );
    console.log(userQueue);

    if (!userQueue) {
      throw new UnauthorizedException('Invalid token or queue position');
    }

    return userId;
  }
}
