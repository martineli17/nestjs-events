import { Module } from "@nestjs/common";
import { UserController } from "src/application/controllers/user.controller";
import { UserService } from "src/domain/services/user.service";
import { UserRepository } from "src/infra/data/repositories/user.repository";

@Module({
    controllers: [UserController],
    imports: [],
    providers: [UserService, UserRepository],
})
export class UserModule{}