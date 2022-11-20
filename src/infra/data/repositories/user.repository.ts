import { Injectable, Scope } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user';
import { IUserRepository } from 'src/domain/interfaces/repository/user';
import { UserModel } from '../models/user.model';
import { getDataSource } from '../configuration/source';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository implements IUserRepository {
  private _repository: Repository<UserModel>;
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this._repository = getDataSource().getRepository(UserModel);
  }

  addAsync = async (user: User): Promise<void> => {
    const model = this.mapper.map(user, User, UserModel);
    await this._repository.save(model);
  };
  updateAsync = async (user: User): Promise<void> => {
    const model = this.mapper.map(user, User, UserModel);
    await this._repository.update(model.id, model);
  };

  removeAsync = async (id: string): Promise<void> => {
    await this._repository.delete(id);
  };

  getByIdAsync = async (id: string): Promise<User> => {
    const model = await this._repository.findOneBy({ id });
    return this.mapper.map(model, UserModel, User);
  };

  getByEmailAsync = async (email: string): Promise<User> => {
    const model = await this._repository.findOneBy({ email });
    return this.mapper.map(model, UserModel, User);
  };

  getAllAsync = async (): Promise<User[]> => {
    const models = await this._repository.find();
    return this.mapper.mapArray(models, UserModel, User);
  };
}
