import { AppDataSource } from '../../typeorm.config';

async function dropDatabase() {
  const connection = await AppDataSource.initialize();
  console.log('Dropping database...');
  await connection.dropDatabase();
  await connection.synchronize();
  await AppDataSource.destroy();
  console.log('Database dropped.');
}

dropDatabase().catch((error) => console.log(error));
