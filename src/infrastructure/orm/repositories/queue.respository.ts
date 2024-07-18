import { Queue } from '@domain/entities/queue.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntity } from '../entities/queue.entity';

@Injectable()
export class QueueRepository {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepository: Repository<QueueEntity>,
  ) {}

  async findById(id: number): Promise<Queue | null> {
    const findParameters = { where: { id } };
    const queue = await this.queueRepository.findOne(findParameters);
    if (!queue) return null;
    return new Queue(queue.id, queue.userId, queue.position, queue.createdAt);
  }

  async save(queue: Queue): Promise<void> {
    const userEntity = this.queueRepository.create({
      id: queue.id,
      userId: queue.userId,
      position: queue.position,
    });
    await this.queueRepository.save(userEntity);
  }
}
