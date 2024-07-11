import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';

describe('ConcertsController', () => {
  let controller: ConcertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,
          useValue: {
            findAvailableDates: jest
              .fn()
              .mockResolvedValue({ dates: ['2023-01-01', '2023-01-02'] }),
            findAvailableSeats: jest
              .fn()
              .mockResolvedValue({ seats: [1, 2, 3] }),
            reserveSeat: jest.fn().mockResolvedValue({
              reservationId: 1,
              status: 'RESERVED',
              reservedUntil: '2023-01-01T20:00:00',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
