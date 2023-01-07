import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserAddedEvent } from "../models";

@Injectable()
export class UserAddedEventHandler {
    @OnEvent("UserAddedEvent", { async: true })
    handleUserAddedEvent(payload: UserAddedEvent) {
        console.log("Usuário adicionado event. ID: " + payload.user.id);
    }   
}