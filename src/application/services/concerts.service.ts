import { Concert } from '@domain/entities/concert.entity';
import { ConcertRepositoryInterface } from '@domain/interfaces/concert-repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConcertsService {
  constructor(
    @Inject('ConcertRepository')
    private readonly concertRepository: ConcertRepositoryInterface,
  ) {}

  async findConcerts(): Promise<Concert[]> {
    return await this.concertRepository.findMany();
  }

  async findAvailableDates(id: number): Promise<string[]> {
    const concert = await this.concertRepository.findById(id);
    return concert.seats.map((seat) => seat.date); // dates: ['2024-07-01', '2024-07-02'],
  }

  async findAvailableSeats(id: number, date: string): Promise<number[]> {
    const concert = await this.concertRepository.findById(id, date);
    return concert.seats.map((seat) => seat.id); // seats: [1, 2, 3, 4, 5],
  }

  async reserveSeat(reservationData: {
    date: string;
    seat: number;
    token: string;
  }) {
    return {
      reservationId: 1,
      status: 'RESERVED',
      reservedUtil: '2024-07-01T12:00:00',
    };
  }
}
