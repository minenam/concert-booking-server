import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;
}
