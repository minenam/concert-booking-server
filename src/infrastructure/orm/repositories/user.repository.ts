import { User } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const findParameters = { where: { id } };
    const user = await this.userRepository.findOne(findParameters);
    if (!user) return null;
    return new User(user.id, user.balance);
  }

  async save(): Promise<void> {
    const userEntity = this.userRepository.create();
    await this.userRepository.save(userEntity);
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.id, { balance: user.balance });
  }
}
