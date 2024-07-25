import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
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

  makePayment(paymentData: {
    amount: number;
    reservationId: number;
    token: string;
  }) {
    return {
      reservationId: paymentData.reservationId,
      status: 'COMPLETED',
    };
  }
}
