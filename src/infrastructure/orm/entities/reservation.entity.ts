import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  seatId: number;

  @Column()
  scheduleId: number;

  @Column()
  reservedUntil: Date;

  @Column()
  createdAt: Date;
}
