import { Queue } from '@domain/entities/queue.entity';

export interface QueueRepositoryInterface {
  findById(id: number): Promise<Queue | null>;
  save(queue: Queue): Promise<Queue>;
  findByUserId(userId: string): Promise<Queue | null>;
  findMany(parameters?: any): Promise<Queue[]>;
}
