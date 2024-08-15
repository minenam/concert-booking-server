export enum QueueStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Queue {
  id: number;
  userId: string;
  position: number;
  status: QueueStatus = QueueStatus.WAITING;
  createdAt: Date = new Date();
}

export class CreateQueue {
  userId: string;
  position: number;
  status: QueueStatus = QueueStatus.WAITING;
}

export class Token {
  token: string;
}
