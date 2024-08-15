import { ConcertService } from '@application/services/concert.service';
import { ReservationService } from '@application/services/reservation.service';
import { SeatStatus } from '@infrastructure/typeorm/entities/seat.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { concertController } from './concert.controller';

describe('concertController', () => {
  let controller: concertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [concertController],
      providers: [
        {
          provide: ConcertService,
          useValue: {
            findAvailableDates: jest
              .fn()
              .mockResolvedValue({ dates: ['2024-07-01', '2024-07-02'] }),
            findAvailableSeats: jest
              .fn()
              .mockResolvedValue({ seats: [1, 2, 3, 4, 5] }),
            reserveSeat: jest.fn().mockResolvedValue({
              reservationId: 1,
              status: SeatStatus.RESERVED,
              reservedUntil: '2024-07-01T20:00:00',
            }),
          },
        },
        {
          provide: ReservationService,
          useValue: {
            reserveSeat: jest.fn().mockResolvedValue({
              id: 1,
              userId: 'userId',
              seatId: 1,
              reservedUntil: '2023-01-01T20:00:00',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<concertController>(concertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
