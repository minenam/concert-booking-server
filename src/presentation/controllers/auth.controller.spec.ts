import { AuthService } from '@application/services/auth.service';
import { QueueEntity } from '@infrastructure/typeorm/entities/queue.entity';
import { QueueRepository } from '@infrastructure/typeorm/repositories/queue.respository';
import { UserRepository } from '@infrastructure/typeorm/repositories/user.repository';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetTokenBodyDto } from '@presentation/dtos/get-token.dto';
import { mockQueue, mockUser } from '@test/mocks/mock';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
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
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getToken', () => {
    it('should generate a token and return a response', async () => {
      const mockResponse = {
        header: jest.fn(),
        send: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const dto: GetTokenBodyDto = { userId: mockUser.id };

      jest.spyOn(userRepository, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(queueRepository, 'findMany').mockResolvedValue([]);
      jest.spyOn(queueRepository, 'save').mockResolvedValue(mockQueue);

      await controller.getToken(dto, mockResponse);
      console.log(dto.userId);

      expect(service.getToken).toHaveBeenCalledWith(dto.userId);
      expect(mockResponse.header).toHaveBeenCalledWith(
        'user-token',
        expect.any(String),
      );
      expect(mockResponse.send).toHaveBeenCalledWith({
        statusCode: HttpStatus.OK,
        message: 'Token generated successfully',
      });
    });
  });
});
