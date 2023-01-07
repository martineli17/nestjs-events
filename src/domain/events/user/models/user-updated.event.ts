import { User } from "src/domain/entities/user";

export type UserUpdatedEvent = {
    user: User;
}