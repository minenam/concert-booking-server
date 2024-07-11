import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsModule } from './concerts/concerts.module';
import { ConcertsService } from './concerts/concerts.service';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConcertsModule, PaymentModule, AuthModule],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class AppModule {}
