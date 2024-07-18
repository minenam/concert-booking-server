import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.inteface';
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

  async findById(id: number): Promise<QueueEntity | null> {
    const findParameters = { where: { id } };
    const queue = await this.queueRepository.findOne(findParameters);
    if (!queue) return null;
    return queue;
  }

  async save(queue: QueueEntity): Promise<QueueEntity> {
    const queueEntity = this.queueRepository.create({
      user: { id: queue.user.id },
      position: queue.position,
    });
    return await this.queueRepository.save(queueEntity);
  }

  async findByUserId(userId: string): Promise<QueueEntity | null> {
    const findParameters: FindOneOptions<QueueEntity> = {
      where: { user: { id: userId } },
      select: { user: { id: true } },
      relations: ['user'],
    };
    const queue = await this.queueRepository.findOne(findParameters);
    if (!queue) return null;
    return queue;
  }

  async findMany(
    parameters?: FindManyOptions<QueueEntity>,
  ): Promise<QueueEntity[]> {
    return await this.queueRepository.find(parameters);
  }
}
