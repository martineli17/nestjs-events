import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable, Scope} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRepository } from 'src/infra/data/repositories/user.repository';
import { UserAddDto, UserDto, UserUpdateDto } from '../dtos/user';
import { User } from '../entities/user';
import { UserAddedEvent, UserUpdatedEvent, UserRemovedEvent } from '../events/user/models';
import { IUserRepository } from '../interfaces/repository/user-repository.interface';
import { IUserService } from '../interfaces/service/user-service.interface';

@Injectable({ scope: Scope.REQUEST })
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: IUserRepository,
    @InjectMapper() private readonly _mapper: Mapper,
    private _eventEmitter: EventEmitter2
  ) {}
  addAsync = async (user: UserAddDto): Promise<boolean> => {
    if (await this._userRepository.getByEmailAsync(user.email)) return false;

    const entity = this._mapper.map(user, UserAddDto, User);
    await this._userRepository.addAsync(entity);
    await this._eventEmitter.emitAsync("UserAddedEvent", { user: entity } as UserAddedEvent);
    return true;
  };

  updateAsync = async (user: UserUpdateDto): Promise<boolean> => {
    const userExisting = await this._userRepository.getByIdAsync(user.id);
    if (!userExisting) return false;

    const entity = this._mapper.map(user, UserUpdateDto, User);
    entity.createdAt = userExisting.createdAt;
    
    await this._userRepository.updateAsync(entity);
    await this._eventEmitter.emitAsync("UserUpdatedEvent", { user: entity } as UserUpdatedEvent);
    return true;
  };

  removeAsync = async (id: string): Promise<boolean> => {
    const entity = await this._userRepository.getByIdAsync(id);
    if (!entity) return false;

    await this._userRepository.removeAsync(id);
    await this._eventEmitter.emitAsync("UserRemovedEvent", { user: entity } as UserRemovedEvent);

    return true;
  };

  getByIdAsync = async (id: string): Promise<UserDto> => {
    const user = await this._userRepository.getByIdAsync(id);
    if (!user) return user;

    return this._mapper.map(user, User, UserDto);
  };

  getAllAsync = async (): Promise<UserDto[]> => {
    const users = await this._userRepository.getAllAsync();
    return this._mapper.mapArray(users, User, UserDto);
  };
}
