import { Module } from "@nestjs/common";
import { UserController } from "src/application/controllers/user.controller";
import { UserAddedEventHandler, UserRemovedEventHandler, UserUpdatedEventHandler } from "src/domain/events/user/handlers";
import { UserService } from "src/domain/services/user.service";
import { UserRepository } from "src/infra/data/repositories/user.repository";
import { UserProfile } from "../mappers/user.mapper";

@Module({
    controllers: [UserController],
    imports: [],
    providers: [UserService, 
                UserRepository, 
                UserProfile, 
                UserAddedEventHandler, 
                UserRemovedEventHandler, 
                UserUpdatedEventHandler],
})
export class UserModule{}