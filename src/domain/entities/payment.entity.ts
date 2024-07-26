export class Payment {
  id?: number | null;
  userId: string;
  reservationId: number;
  amount: number;
  createdAt?: Date;
}
