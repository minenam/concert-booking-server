import { Seat } from '@domain/entities/seat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatEntity } from '../entities/seat.entity';

@Injectable()
export class SeatRepository {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
  ) {}

  async findById(id: number): Promise<Seat | null> {
    const findParameters = { where: { id } };
    const seat = await this.seatRepository.findOne(findParameters);
    if (!seat) return null;
    return new Seat(
      seat.id,
      seat.seatNumber,
      seat.status,
      seat.date,
      seat.price,
    );
  }

  async findByIdAndDate(id: number, date: string): Promise<Seat | null> {
    const findParameters = { where: { id, date } };
    const seat = await this.seatRepository.findOne(findParameters);
    if (!seat) return null;
    return new Seat(
      seat.id,
      seat.seatNumber,
      seat.status,
      seat.date,
      seat.price,
    );
  }
  async save(seat: Seat): Promise<void> {
    const userEntity = this.seatRepository.create({
      id: seat.id,
      seatNumber: seat.seatNumber,
      status: seat.status,
      date: seat.date,
      price: seat.price,
    });
    await this.seatRepository.save(userEntity);
  }

  async update(seat: Seat): Promise<void> {
    await this.seatRepository.update(seat.id, { status: seat.status });
  }
}
