import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SeatEntity } from './seat.entity';
import { UserEntity } from './user.entity';

export enum PaymentStatus {
  WAITING = 'WAITING', // 대기 중
  IN_PROGRESS = 'IN_PROGRESS', // 예약 및 결제 진행 중
  DONE = 'DONE', // 만료
}

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => SeatEntity)
  @JoinColumn({ name: 'seat_id' })
  seatId: number;

  @Column({ name: 'reserved_until', type: 'timestamp', nullable: true })
  reservedUntil: Date;

  @Column({ name: 'payment_id', nullable: true })
  paymentId: number;

  @Column({
    name: 'payment_status',
    enum: PaymentStatus,
    default: PaymentStatus.WAITING,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
