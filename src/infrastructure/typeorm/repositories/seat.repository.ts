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

  async findById(id: number): Promise<SeatEntity | null> {
    const findParameters = { where: { id } };
    const seat = await this.seatRepository.findOne(findParameters);
    return seat ?? null;
  }

  async findByIdAndDate(id: number, date: string): Promise<SeatEntity | null> {
    const findParameters = { where: { id, date } };
    const seat = await this.seatRepository.findOne(findParameters);
    return seat ?? null;
  }
  async save(seat: SeatEntity): Promise<void> {
    const userEntity = this.seatRepository.create({
      id: seat.id,
      seatNumber: seat.seatNumber,
      status: seat.status,
      date: seat.date,
      price: seat.price,
    });
    await this.seatRepository.save(userEntity);
  }

  async update(seat: SeatEntity): Promise<void> {
    await this.seatRepository.update(seat.id, { status: seat.status });
  }
}
