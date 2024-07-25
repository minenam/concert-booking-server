import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QueueEntity } from './queue.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @OneToMany(() => QueueEntity, (queue) => queue.user)
  queue: QueueEntity[];
}
