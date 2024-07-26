import { Queue } from '@domain/entities/queue.entity';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueueEntity } from '../entities/queue.entity';

@Injectable()
export class QueueRepository implements QueueRepositoryInterface {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepository: Repository<QueueEntity>,
  ) {}

  async findById(id: number): Promise<Queue | null> {
    const findParameters = { where: { id } };
    const queue = await this.queueRepository.findOne(findParameters);
    return queue || null;
  }

  async save(queue: Queue): Promise<Queue> {
    const queueEntity = this.queueRepository.create({
      userId: queue.userId,
      position: queue.position,
    });
    return await this.queueRepository.save(queueEntity);
  }

  async findByUserId(userId: string): Promise<Queue | null> {
    const findParameters: FindOneOptions<Queue> = {
      where: { userId },
      select: { userId: true },
      relations: ['user'],
    };
    const queue = await this.queueRepository.findOne(findParameters);
    if (!queue) return null;
    return queue;
  }

  async findMany(parameters?: FindManyOptions<Queue>): Promise<Queue[]> {
    return await this.queueRepository.find(parameters);
  }
}
