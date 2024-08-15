import { UpdateUser, User } from '@domain/entities/user.entity';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  save(): Promise<void>;
  update(user: UpdateUser): Promise<void>;
}
