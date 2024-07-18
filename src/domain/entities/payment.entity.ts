export class Payment {
  constructor(
    public id: number,
    public userId: string,
    public reservationId: number,
    public amount: number,
    public timestamp: Date,
  ) {}
}
