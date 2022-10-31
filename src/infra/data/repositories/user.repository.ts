import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user';
import { IUserRepository } from 'src/domain/interfaces/repository/user';
import { UserModel } from '../models/user.model';
import { getDataSource } from '../configuration/source';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository implements IUserRepository {
  private _repository: Repository<UserModel>;
  constructor() {
    this._repository = getDataSource().getRepository(UserModel);
  }

  addAsync = async (user: User): Promise<void> => {
    const model = new UserModel(user);
    await this._repository.save(model);
  };
  updateAsync = async (user: User): Promise<void> => {
    const model = new UserModel(user);
    await this._repository.update(model.id, model);
  };

  removeAsync = async (id: string): Promise<void> => {
    await this._repository.delete(id);
  };

  getByIdAsync = async (id: string): Promise<User> => {
    const model = await this._repository.findOneBy({ id });
    return model.toEntity();
  };

  getByEmailAsync = async (email: string): Promise<User> => {
    const model = await this._repository.findOneBy({ email });
    return model?.toEntity();
  };

  getAllAsync = async (): Promise<User[]> => {
    const models = await this._repository.find();
    return models.map(model => model.toEntity());
  };
}
