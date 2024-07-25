import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { UserEntity } from './user.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => ReservationEntity)
  @JoinColumn({ name: 'reservation_id' })
  reservationId: number;

  @Column({ type: 'decimal' })
  amount: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
