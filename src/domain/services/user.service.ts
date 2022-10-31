import { Inject, Injectable, Scope} from '@nestjs/common';
import { UserRepository } from 'src/infra/data/repositories/user.repository';
import { UserAddDto, UserDto, UserUpdateDto } from '../dtos/user';
import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/repository/user';
import { IUserService } from '../interfaces/service/user';

@Injectable({ scope: Scope.REQUEST })
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: IUserRepository,
  ) {}
  addAsync = async (user: UserAddDto): Promise<boolean> => {
    if (await this._userRepository.getByEmailAsync(user.email)) return false;

    const entity = new User(user.name, user.email);
    await this._userRepository.addAsync(entity);
    return true;
  };

  updateAsync = async (user: UserUpdateDto): Promise<boolean> => {
    if (await this._userRepository.getByIdAsync(user.id)) return false;

    const entity = new User(user.name, user.email, user.id);
    await this._userRepository.updateAsync(entity);
    return true;
  };

  removeAsync = async (id: string): Promise<boolean> => {
    if (await this._userRepository.getByIdAsync(id)) return false;

    await this._userRepository.removeAsync(id);
    return true;
  };

  getByIdAsync = async (id: string): Promise<UserDto> => {
    const user = await this._userRepository.getByIdAsync(id);
    if (!user) return user;

    const dto: UserDto = {
      email: user.email,
      id: user.id,
      name: user.name,
    };
    return dto;
  };

  getAllAsync = async (): Promise<UserDto[]> => {
    const users = await this._userRepository.getAllAsync();
    const result = users.map((user) => {
      const dto: UserDto = {
        email: user.email,
        id: user.id,
        name: user.name,
      };
      return dto;
    });

    return result;
  };
}
