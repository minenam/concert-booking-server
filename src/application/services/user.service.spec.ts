import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'QueueRepository',
          useValue: queueRepository,
        },
        {
          provide: getRepositoryToken(QueueEntity),
          useValue: queueEntityRepository,
        },
        {
          provide: UserRepository,
          useValue: userRepository,
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
