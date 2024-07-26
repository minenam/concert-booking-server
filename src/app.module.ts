import { AuthService } from '@application/services/auth.service';
import { ConcertService } from '@application/services/concert.service';
import { PaymentService } from '@application/services/payment.service';
import { ReservationService } from '@application/services/reservation.service';
import { ConcertEntity } from '@infrastructure/typeorm/entities/concert.entity';
import { PaymentEntity } from '@infrastructure/typeorm/entities/payment.entity';
import { QueueEntity } from '@infrastructure/typeorm/entities/queue.entity';
import { ReservationEntity } from '@infrastructure/typeorm/entities/reservation.entity';
import { SeatEntity } from '@infrastructure/typeorm/entities/seat.entity';
import { UserEntity } from '@infrastructure/typeorm/entities/user.entity';
import { ConcertRepository } from '@infrastructure/typeorm/repositories/concert.repository';
import { PaymentRepository } from '@infrastructure/typeorm/repositories/payment.repository';
import { QueueRepository } from '@infrastructure/typeorm/repositories/queue.repository';
import { ReservationRepository } from '@infrastructure/typeorm/repositories/reservation.repository';
import { SeatRepository } from '@infrastructure/typeorm/repositories/seat.repository';
import { UserRepository } from '@infrastructure/typeorm/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@presentation/controllers/auth.controller';
import { concertController } from '@presentation/controllers/concert.controller';
import { PaymentController } from '@presentation/controllers/payment.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    TypeOrmModule.forFeature([
      ConcertEntity,
      PaymentEntity,
      QueueEntity,
      ReservationEntity,
      SeatEntity,
      UserEntity,
    ]),
  ],
  controllers: [concertController, AuthController, PaymentController],
  providers: [
    ConcertService,
    AuthService,
    PaymentService,
    ReservationService,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'QueueRepository',
      useClass: QueueRepository,
    },
    {
      provide: 'ConcertRepository',
      useClass: ConcertRepository,
    },
    {
      provide: 'ReservationRepository',
      useClass: ReservationRepository,
    },
    {
      provide: 'SeatRepository',
      useClass: SeatRepository,
    },
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepository,
    },
  ],
})
export class AppModule {}
