import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserUpdatedEvent } from "../models";

@Injectable()
export class UserUpdatedEventHandler {
    @OnEvent("UserUpdatedEvent", { async: true })
    handleUserUpdatedEvent(payload: UserUpdatedEvent) {
        console.log("Usuário atualizado event. ID: " + payload.user.id);
    }  
}