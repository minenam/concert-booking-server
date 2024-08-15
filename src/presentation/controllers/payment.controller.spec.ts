import { HttpStatus } from '@nestjs/common';
import { api, getApp } from '@test/setup';

const userId = '50cf627d-0f43-474c-a214-d20501e4d51f';
const validToken = `${userId}::{"position":1,"estimatedWaitTime":300000}`;
const paymentDto = {
  token: validToken,
  reservationId: 1,
  amount: 50,
};

describe('PaymentController (e2e)', () => {
  beforeAll(async () => {
    const app = getApp();
    app.getHttpServer().listen(0);
  });

  it.only('/payment/balance/:userId (GET)', async () => {
    return api()
      .get(`/payment/balance/${userId}`)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.balance).toBe(200);
      });
  });

  it('/payment/charge (POST)', async () => {
    return await api()
      .post(`/payment/charge`)
      .send({ userId, amount: 50 })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.balance).toBe(320);
      });
  });

  it('should handle concurrency for /payment (POST)', async () => {
    const requests = Array.from({ length: 10 }, (_, i) =>
      api().post(`/payment`).send(paymentDto),
    );

    const responses = await Promise.all(requests);

    const successResponses = responses.filter(
      (res) => res.status === HttpStatus.CREATED,
    );
    const failureResponses = responses.filter(
      (res) => res.status !== HttpStatus.CREATED,
    );

    expect(successResponses.length).toBe(1);
    expect(failureResponses.length).toBe(9);
  });
});
