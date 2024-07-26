export enum PaymentStatus {
  WAITING = 'WAITING', // 대기 중
  IN_PROGRESS = 'IN_PROGRESS', // 예약 및 결제 진행 중
  DONE = 'DONE', // 만료
}

export class Reservation {
  id: number | null;
  userId: string;
  seatId: number;
  reservedUntil: Date | null;
  paymentId: number;
  paymentStatus: PaymentStatus;
  createdAt: Date | null;
}

export class UpdateReservation {
  userId: string | null;
  seatId: number | null;
  reservedUntil: Date | null;
  paymentId: number | null;
  paymentStatus: PaymentStatus | null;
}
