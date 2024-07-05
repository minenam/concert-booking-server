import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateToken: jest.fn().mockResolvedValue({
              token: 'test-token',
              queueInfo: { position: 1, estimatedWaitTime: 120 },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should return a token and queue info', async () => {
    expect(controller.getToken('userId')).toEqual({
      token: 'test-token',
      queueInfo: { position: 1, estimatedWaitTime: 120 },
    });
  });
});
