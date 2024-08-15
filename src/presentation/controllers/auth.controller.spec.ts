import { AuthService } from '@application/services/auth.service';
import { QueueRepositoryInterface } from '@domain/interfaces/queue-repository.interface';
import { UserRepositoryInterface } from '@domain/interfaces/user-repository.interface';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetTokenBodyDto } from '@presentation/dtos/get-token.dto';
import { mockUser } from '@test/mocks/mock';
import { Response } from 'express';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userRepository: UserRepositoryInterface;
  let queueRepository: QueueRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: 'QueueRepository',
          useValue: queueRepository,
        },
        {
          provide: 'UserRepository',
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

      jest.spyOn(service, 'getToken').mockImplementation(async () => ({
        token: 'mock-token',
      }));

      await controller.getToken(dto, mockResponse);

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
