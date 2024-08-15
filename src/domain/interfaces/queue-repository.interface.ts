import { CreateQueue, Queue, QueueStatus } from '@domain/entities/queue.entity';

export interface QueueRepositoryInterface {
  findById(id: number): Promise<Queue | null>;
  save(queue: CreateQueue): Promise<Queue>;
  findByUserId(userId: string): Promise<Queue | null>;
  findMany(parameters?: any): Promise<Queue[]>;
  findByUserIdAndPosition(
    userId: string,
    position: number,
    status: QueueStatus,
  ): Promise<Queue | null>;
}
