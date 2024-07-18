import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);

    const users = [{ balance: 100 }, { balance: 200 }, { balance: 300 }];

    await userRepository.save(users);
  }
}
