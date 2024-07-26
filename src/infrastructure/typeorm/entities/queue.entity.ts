import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum QueueStatus {
  WAITING = 'WAITING', // 대기 중
  IN_PROGRESS = 'IN_PROGRESS', // 예약 및 결제 진행 중
  DONE = 'DONE', // 만료
}
@Entity('queue')
export class QueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column()
  position: number;

  @Column({ enum: QueueStatus, default: QueueStatus.WAITING })
  status: QueueStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
