import { DataSource } from 'typeorm';
import { ConcertEntity } from './typeorm/entities/concert.entity';
import { PaymentEntity } from './typeorm/entities/payment.entity';
import { QueueEntity } from './typeorm/entities/queue.entity';
import { ReservationEntity } from './typeorm/entities/reservation.entity';
import { SeatEntity } from './typeorm/entities/seat.entity';
import { UserEntity } from './typeorm/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'concerts',
  entities: [
    ConcertEntity,
    PaymentEntity,
    QueueEntity,
    ReservationEntity,
    SeatEntity,
    UserEntity,
  ],
  synchronize: true,
});

export default AppDataSource;
