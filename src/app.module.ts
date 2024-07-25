import { AuthService } from '@application/services/auth.service';
import { ConcertsService } from '@application/services/concerts.service';
import { PaymentService } from '@application/services/payment.service';
import { ReservationService } from '@application/services/reservation.service';
import { ConcertEntity } from '@infrastructure/typeorm/entities/concert.entity';
import { PaymentEntity } from '@infrastructure/typeorm/entities/payment.entity';
import { QueueEntity } from '@infrastructure/typeorm/entities/queue.entity';
import { ReservationEntity } from '@infrastructure/typeorm/entities/reservation.entity';
import { SeatEntity } from '@infrastructure/typeorm/entities/seat.entity';
import { UserEntity } from '@infrastructure/typeorm/entities/user.entity';
import { ConcertRepository } from '@infrastructure/typeorm/repositories/concert.repository';
import { QueueRepository } from '@infrastructure/typeorm/repositories/queue.respository';
import { ReservationRepository } from '@infrastructure/typeorm/repositories/reservation.repository';
import { SeatRepository } from '@infrastructure/typeorm/repositories/seat.repository';
import { UserRepository } from '@infrastructure/typeorm/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@presentation/controllers/auth.controller';
import { ConcertsController } from '@presentation/controllers/concerts.controller';
import { PaymentController } from '@presentation/controllers/payment.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
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
  controllers: [ConcertsController, AuthController, PaymentController],
  providers: [
    ConcertsService,
    AuthService,
    PaymentService,
    ReservationService,
    UserRepository,
    {
      provide: 'QueueRepository',
      useClass: QueueRepository,
    },
    {
      provide: 'ConcertRepository',
      useClass: ConcertRepository,
    },
    ReservationRepository,
    SeatRepository,
  ],
})
export class AppModule {}
