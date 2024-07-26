import { Payment } from '@domain/entities/payment.entity';

export interface PaymentRepositoryInterface {
  findById(id: number): Promise<Payment | null>;
  save(payment: Payment): Promise<Payment>;
  update(payment: Payment): Promise<void>;
}
