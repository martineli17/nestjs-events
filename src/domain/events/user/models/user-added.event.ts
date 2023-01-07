import { User } from "src/domain/entities/user";

export type UserAddedEvent = {
    user: User;
}