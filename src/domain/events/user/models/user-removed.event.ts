import { User } from "src/domain/entities/user";

export type UserRemovedEvent = {
    user: User;
}