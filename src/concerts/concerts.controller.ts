import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('concerts')
export class ConcertsController {
  constructor() {}

  @Get('dates')
  getAvailableDates() {
    return { dates: ['2023-01-01', '2023-01-02'] };
  }

  @Get('seats')
  getAvailableSeats(@Query('date') date: string) {
    return { seats: [1, 2, 3] };
  }

  @Post('reservations')
  reserveSeat(
    @Body() reservation: { date: string; seat: number; token: string },
  ) {
    return {
      reservationId: 1,
      status: 'RESERVED',
      reservedUntil: '2023-01-01T20:00:00',
    };
  }
}
