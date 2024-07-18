import { Token } from '@domain/entities/queue.entity';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { QueueStatus } from '@infrastructure/typeorm/entities/queue.entity';
import { UserRepository } from '@infrastructure/typeorm/repositories/user.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('QueueRepository')
    private readonly queueRepository: QueueRepositoryInterface,
    private readonly userRepository: UserRepository,
  ) {}

  async getToken(userId: string): Promise<Token> {
    if (!(await this.isValidUser(userId))) {
      throw new NotFoundException('User not found');
    }
    const token = await this.setQueue(userId);
    return { token };
  }

  private async isValidUser(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    return !!user;
  }

  private generateToken(userId: string, position: number): string {
    const WAITING_TIME = 5 * 60 * 1000;
    const estimatedWaitTime = WAITING_TIME * position; // 5분 * 대기 순서
    const queueInfo = { position, estimatedWaitTime };
    return `${userId}::${JSON.stringify(queueInfo)}`;
  }

  private async setQueue(userId: string): Promise<string> {
    const user = await this.userRepository.findById(userId);
    const queues = await this.queueRepository.findMany({
      where: { status: QueueStatus.WAITING },
    });
    const position = queues.length + 1;
    const queue = { id: null, user, position };
    await this.queueRepository.save(queue);

    return this.generateToken(user.id, position);
  }
}
