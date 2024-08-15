import { ConcertRepositoryInterface } from '@domain/interfaces/concert-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepository: ConcertRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: 'ConcertRepository',
          useValue: concertRepository,
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
