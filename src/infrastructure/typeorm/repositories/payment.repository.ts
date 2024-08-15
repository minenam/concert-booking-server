import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../entities/payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async findById(id: number): Promise<PaymentEntity | null> {
    const findParameters = { where: { id } };
    const payment = await this.paymentRepository.findOne(findParameters);
    if (!payment) return null;
    return payment;
  }

  async save(payment: PaymentEntity): Promise<PaymentEntity> {
    const paymentEntity = this.paymentRepository.create(payment);
    return await this.paymentRepository.save(paymentEntity);
  }

  async update(payment: PaymentEntity): Promise<void> {
    await this.paymentRepository.update(payment.id, payment);
  }
}
