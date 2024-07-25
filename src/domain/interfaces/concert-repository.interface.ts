import { Concert } from '@domain/entities/concert.entity';

export interface ConcertRepositoryInterface {
  findMany(parameters?: any): Promise<Concert[]>;
  findById(id: number, date?: string): Promise<Concert | null>;
}
