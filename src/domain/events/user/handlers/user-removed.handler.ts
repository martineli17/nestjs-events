import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import {  UserRemovedEvent } from "../models";

@Injectable()
export class UserRemovedEventHandler {
    @OnEvent("UserRemovedEvent", { async: true })
    handleUserRemovedEvent(payload: UserRemovedEvent) {
        console.log("Usuário removido event. ID: " + payload.user.id);
    }   
}