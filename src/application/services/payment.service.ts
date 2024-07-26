import { PaymentRepositoryInterface } from '@domain/interfaces/payment-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepositoryInterface,
  ) {}
  chargeBalance(chargeData: { userId: string; amount: number }) {
    return {
      balance: 200.0,
    };
  }

  getBalance(userId: string) {
    return {
      balance: 200.0,
    };
  }

  async makePayment(paymentData: {
    userId: string;
    amount: number;
    reservationId: number;
    token: string;
  }) {
    return await this.paymentRepository.save(paymentData);
  }
}
