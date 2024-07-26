import { QueueStatus } from '@infrastructure/typeorm/entities/queue.entity';
import { User } from './user.entity';

export class Queue {
  id?: number | null;
  user: User;
  position: number;
  status?: string = QueueStatus.WAITING;
  createdAt?: Date = new Date();
}

export class Token {
  token: string;
}
