import { Queue } from './queue.entity';

export class User {
  id?: string | null;
  balance: number;
  queue?: Queue[] | null = null;
}
