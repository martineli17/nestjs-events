import { UserAddDto, UserDto, UserUpdateDto } from 'src/domain/dtos/user';

export interface IUserService {
  addAsync(user: UserAddDto): Promise<boolean>;
  updateAsync(user: UserUpdateDto): Promise<boolean>;
  removeAsync(id: string): Promise<boolean>;
  getByIdAsync(id: string): Promise<UserDto>;
  getAllAsync(): Promise<UserDto[]>;
}
