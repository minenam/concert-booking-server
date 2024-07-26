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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
