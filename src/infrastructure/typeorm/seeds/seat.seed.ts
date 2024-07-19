// src/database/seeds/seat.seed.ts
import { DataSource } from 'typeorm';
import { SeatEntity, SeatStatus } from '../entities/seat.entity';

export class SeatSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const seatRepository = dataSource.getRepository(SeatEntity);

    const seats = [
      {
        seatNumber: 1,
        status: SeatStatus.PENDING,
        price: 50,
        date: '2024-01-01',
        concertId: 1,
      },
      {
        seatNumber: 2,
        status: SeatStatus.PENDING,
        price: 60,
        date: '2024-03-01',
        concertId: 2,
      },
      {
        seatNumber: 3,
        status: SeatStatus.PENDING,
        price: 70,
        date: '2024-06-01',
        concertId: 3,
      },
    ];

    await seatRepository.save(seats);
  }
}
