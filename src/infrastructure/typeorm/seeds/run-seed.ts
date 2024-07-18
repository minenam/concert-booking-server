import { AppDataSource } from '../../typeorm.config';
import { ConcertSeed } from './concert.seed';
import { SeatSeed } from './seat.seed';
import { UserSeed } from './user.seed';

async function runSeeds() {
  const connection = await AppDataSource.initialize();
  try {
    await new UserSeed().run(connection);
    await new ConcertSeed().run(connection);
    await new SeatSeed().run(connection);
  } finally {
    await connection.destroy();
  }
}

runSeeds().catch((error) => console.log(error));
