import { PaymentRepositoryInterface } from '@domain/interfaces/payment-repository.interface';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { ReservationRepositoryInterface } from '@domain/interfaces/researvation-repository.interface';
import { UserRepositoryInterface } from '@domain/interfaces/user-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepositoryInterface;
  let queueRepository: QueueRepositoryInterface;
  let paymentRepository: PaymentRepositoryInterface;
  let reservationRepository: ReservationRepositoryInterface;

  beforeEach(async () => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepositoryInterface;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: userRepository,
        },
        {
          provide: 'QueueRepository',
          useValue: queueRepository,
        },
        {
          provide: 'PaymentRepository',
          useValue: paymentRepository,
        },
        {
          provide: 'ReservationRepository',
          useValue: reservationRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
