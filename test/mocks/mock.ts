import { QueueStatus } from '@infrastructure/typeorm/entities/queue.entity';

export const mockUser = {
  id: 'some-user-id',
  balance: 1000,
  queue: [],
};

export const mockQueue = {
  id: 1,
  userId: mockUser.id,
  position: 1,
  status: QueueStatus.WAITING,
  createdAt: new Date(),
};
