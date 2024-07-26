import { ConcertService } from '@application/services/concert.service';
import { ReservationService } from '@application/services/reservation.service';
import { SeatStatus } from '@infrastructure/typeorm/entities/seat.entity';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetConcertsResponseDto } from '@presentation/dtos/get-concert.dto';
import { GetAvailableDatesResponseDto } from '@presentation/dtos/get-dates.dto';
import { GetAvailableSeatsResponseDto } from '@presentation/dtos/get-seats.dto';
import { ReservationsDto } from '@presentation/dtos/reservations.dto';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';

@ApiTags('concerts')
@UseInterceptors(LoggingInterceptor)
@Controller('concerts')
export class concertController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly concertService: ConcertService,
  ) {}

  @ApiOperation({ summary: '콘서트 목록 조회' })
  @Get()
  async getConcerts(): Promise<GetConcertsResponseDto> {
    const concerts = await this.concertService.findConcerts();
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      concerts,
    };
  }

  @ApiOperation({ summary: '예약 가능 날짜 조회' })
  @Get(':id/dates')
  async getAvailableDates(
    @Param('id') id: number,
  ): Promise<GetAvailableDatesResponseDto> {
    const dates = await this.concertService.findAvailableDates(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      dates,
    };
  }

  @ApiOperation({ summary: '예약 가능 좌석 조회' })
  @Get(':id/seats')
  async getAvailableSeats(
    @Param('id') id: number,
    @Query('date') date: string,
  ): Promise<GetAvailableSeatsResponseDto> {
    const seats = await this.concertService.findAvailableSeats(+id, date);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      seats,
    };
  }

  @ApiOperation({ summary: '좌석 예약 요청' })
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
      status: SeatStatus.RESERVED,
      reservedUntil: reservationResult.reservedUntil,
    };
  }
}
