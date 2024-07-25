// src/database/seeds/concert.seed.ts
import { DataSource } from 'typeorm';
import { ConcertEntity } from '../entities/concert.entity';

export class ConcertSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const concertRepository = dataSource.getRepository(ConcertEntity);

    const concerts = [
      { name: 'Concert A' },
      { name: 'Concert B' },
      { name: 'Concert C' },
    ];

    await concertRepository.save(concerts);
  }
}
