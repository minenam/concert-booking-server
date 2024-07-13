import { ReservationsDto } from '@application/dtos/reservations.dto';
import { ReservationService } from '@application/services/reservation.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('concerts')
@Controller('concerts')
export class ConcertsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('dates')
  getAvailableDates() {
    return { dates: ['2023-01-01', '2023-01-02'] };
  }

  @Get('seats')
  getAvailableSeats(@Query('date') date: string) {
    return { seats: [1, 2, 3] };
  }

  @ApiBody({ type: ReservationsDto })
  @Post('reservations')
  async reserveSeat(@Body() reservation: ReservationsDto) {
    const reservationResult = await this.reservationService.reserveSeat(
      reservation.userId,
      reservation.date,
      reservation.seatId,
    );
    return {
      reservationId: reservationResult.id,
      status: 'RESERVED',
      reservedUntil: reservationResult.reservedUntil,
    };
  }
}
