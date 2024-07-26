import { QueueStatus, Token } from '@domain/entities/queue.entity';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { UserRepositoryInterface } from '@domain/interfaces/user-repository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('QueueRepository')
    private readonly queueRepository: QueueRepositoryInterface,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
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
    const queue = { id: null, user, position, status: QueueStatus.WAITING };
    await this.queueRepository.save(queue);

    return this.generateToken(user.id, position);
  }
}
