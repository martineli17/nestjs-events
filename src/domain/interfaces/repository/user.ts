import { User } from 'src/domain/entities/user';

export interface IUserRepository {
  addAsync(user: User): Promise<void>;
  updateAsync(user: User): Promise<void>;
  removeAsync(id: string): Promise<void>;
  getByIdAsync(id: string): Promise<User>;
  getByEmailAsync(email: string): Promise<User>;
  getAllAsync(): Promise<User[]>;
}
