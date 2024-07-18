export class Reservation {
  constructor(
    public id: number,
    public userId: string,
    public seatId: number,
    public scheduleId: number,
    public reservedUntil: Date | null,
  ) {}
}
