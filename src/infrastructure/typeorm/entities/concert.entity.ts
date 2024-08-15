import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SeatEntity } from './seat.entity';

@Entity('concert')
export class ConcertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SeatEntity, (seat) => seat.concertId)
  seats: SeatEntity[];
}
