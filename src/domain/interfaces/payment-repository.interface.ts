import { Payment } from '@domain/entities/payment.entity';

export interface PaymentRepositoryInterface {
  findById(id: number): Promise<Payment | null>;
  save(payment: Payment): Promise<void>;
  update(payment: Payment): Promise<void>;
}
