import { AuthService } from '@application/services/auth.service';
import { ConcertsService } from '@application/services/concerts.service';
import { PaymentService } from '@application/services/payment.service';
import { ReservationService } from '@application/services/reservation.service';
import { UserEntity } from '@infrastructure/orm/entities/user.entity';
import { UserRepository } from '@infrastructure/orm/repositories/user.repository';
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
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'concerts',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [ConcertsController, AuthController, PaymentController],
  providers: [
    ConcertsService,
    AuthService,
    PaymentService,
    ReservationService,
    UserRepository,
  ],
})
export class AppModule {}
