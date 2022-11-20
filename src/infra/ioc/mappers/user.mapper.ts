import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { constructUsing, createMap, forMember, ignore, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { UserModel } from 'src/infra/data/models/user.model';
import { UserAddDto, UserDto, UserUpdateDto } from 'src/domain/dtos/user';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, UserModel, User, 
                forMember((dest) => dest.id, mapFrom((source) => source.id)),
                forMember((dest) => dest.createdAt, mapFrom((source) => source.createdAt)),
                forMember((dest) => dest.updatedAt, mapFrom((source) => source.updatedAt)),
                forMember((dest) => dest.email, mapFrom((source) => source.email)),
                forMember((dest) => dest.name, mapFrom((source) => source.name)),
                );
            createMap(mapper, User, UserModel, 
                forMember((dest) => dest.id, mapFrom((source) => source.id)),
                forMember((dest) => dest.createdAt, mapFrom((source) => source.createdAt)),
                forMember((dest) => dest.updatedAt, mapFrom((source) => source.updatedAt)),
                forMember((dest) => dest.email, mapFrom((source) => source.email)),
                forMember((dest) => dest.name, mapFrom((source) => source.name)),
                );
            createMap(mapper, User, UserDto, 
                forMember((dest) => dest.id, mapFrom((source) => source.id)),
                forMember((dest) => dest.createdAt, mapFrom((source) => source.createdAt)),
                forMember((dest) => dest.updatedAt, mapFrom((source) => source.updatedAt)),
                forMember((dest) => dest.email, mapFrom((source) => source.email)),
                forMember((dest) => dest.name, mapFrom((source) => source.name)),
                );
            createMap(mapper, UserAddDto, User, 
                constructUsing((source) => new User(source.name, source.email))
                );
            createMap(mapper, UserUpdateDto, User, 
                constructUsing((source) => new User(source.name, source.email, source.id))
                );
        };
    }
}