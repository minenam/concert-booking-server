import { DataSource } from 'typeorm';
import { UserEntity } from './orm/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [UserEntity],
  synchronize: true,
});

export default AppDataSource;
