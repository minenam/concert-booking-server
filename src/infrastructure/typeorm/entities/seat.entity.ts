import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SeatStatus {
  PENDING = 'pending',
  RESERVED = 'reserved',
  COMPLETE = 'complete',
  CANCELLED = 'cancelled',
}

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seat_number' })
  seatNumber: number;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.PENDING })
  status: SeatStatus;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'decimal' })
  price: number;
}
