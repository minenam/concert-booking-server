import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  reservationId: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;
}
