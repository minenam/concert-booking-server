import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertsController } from './concerts/concerts.controller';
import { ConcertsService } from './concerts/concerts.service';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [ConcertsModule],
  controllers: [AppController, ConcertsController],
  providers: [AppService, ConcertsService],
})
export class AppModule {}
