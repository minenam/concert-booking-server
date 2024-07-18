import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number;

  @Column()
  status: SeatStatus;

  @Column()
  price: number;
}

export enum SeatStatus {
  PENDING = 'pending',
  RESERVED = 'reserved',
  COMPLETE = 'complete',
  CANCELLED = 'cancelled',
}
