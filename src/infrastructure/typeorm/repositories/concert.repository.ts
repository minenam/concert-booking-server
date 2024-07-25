import { Concert } from '@domain/entities/concert.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConcertEntity } from '../entities/concert.entity';

@Injectable()
export class ConcertRepository {
  constructor(
    @InjectRepository(ConcertEntity)
    private readonly concertRepository: Repository<ConcertEntity>,
  ) {}

  async findById(id: number, date?: string): Promise<Concert | null> {
    const findParameters = { where: { id, date }, relations: ['seats'] };
    const concert = await this.concertRepository.findOne(findParameters);
    if (!concert) return null;
    return concert;
  }

  async findMany(): Promise<Concert[]> {
    const findParameters = {
      relations: ['seats'],
      // include: ['id', 'name', 'concertNumber', 'status', 'date', 'price'],
    };
    const concerts = await this.concertRepository.find(findParameters);
    return concerts;
  }
}
