import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            chargeBalance: jest.fn().mockResolvedValue({ balance: 200.0 }),
            getBalance: jest.fn().mockResolvedValue({ balance: 200.0 }),
            makePayment: jest.fn().mockResolvedValue({
              reservationId: 1,
              status: 'COMPLETED',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should return updated balance after charge', async () => {
    expect(controller.chargeBalance({ userId: 'uuid', amount: 100.0 })).toEqual(
      { balance: 200.0 },
    );
  });

  it('should return balance', async () => {
    expect(controller.getBalance('uuid')).toEqual({ balance: 200.0 });
  });

  it('should return payment status', async () => {
    expect(
      controller.makePayment({
        amount: 100.0,
        reservationId: 1,
        token: 'test-token',
      }),
    ).toEqual({
      reservationId: 1,
      status: 'COMPLETED',
    });
  });
});
