import { QueueEntity } from '@infrastructure/typeorm/entities/queue.entity';
import { QueueRepository } from '@infrastructure/typeorm/repositories/queue.repository';
import { UserRepository } from '@infrastructure/typeorm/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockQueue, mockUser } from '@test/mocks/mock';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let queueRepository: QueueRepository;
  let queueEntityRepository: Repository<QueueEntity>;

  beforeEach(async () => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepository;

    queueRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findByUserId: jest.fn(),
      findMany: jest.fn(),
    } as unknown as QueueRepository;

    queueEntityRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      create: jest.fn().mockImplementation((entity) => entity),
    } as unknown as Repository<QueueEntity>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should throw NotFoundException if user is not valid', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(service.getToken('invalid-user-id')).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });

    it('should generate a token if user is valid', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(queueRepository, 'findMany').mockResolvedValue([]);
      jest.spyOn(queueRepository, 'save').mockResolvedValue(mockQueue);

      const result = await service.getToken(mockUser.id);

      expect(result.token).toContain(mockUser.id);
    });

    describe('isValidUser (private)', () => {
      it('should return true if user exists', async () => {
        jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);

        const result = await service['isValidUser'](mockUser.id);
        expect(result).toBe(true);
      });

      it('should return false if user does not exist', async () => {
        jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

        const result = await service['isValidUser'](mockUser.id);
        expect(result).toBe(false);
      });
    });

    describe('setQueue (private)', () => {
      it('should save queue and generate token', async () => {
        jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
        jest.spyOn(queueRepository, 'findMany').mockResolvedValue([]);
        jest.spyOn(queueRepository, 'save').mockResolvedValue(mockQueue);

        const result = await service['setQueue'](mockUser.id);

        expect(result).toContain(mockUser.id);
      });
    });
  });
});
