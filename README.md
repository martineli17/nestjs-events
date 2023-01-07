# Utilizando eventos no NestJS
Este repositório tem como objetivo exemplificar, de maneira simples, a utilização de eventos nativo do NestJS.

## Pacotes a serem instalados
O único pacote necessário a ser instalado é o [@nestjs/event-emitter](https://docs.nestjs.com/techniques/events)

## Cenário de uso
<p>Quando você quer desacoplar um pouco o seu código, deixando mais claro a responsabilidade de cada classe, você pode utilizar os eventos para sinalizar que algo foi processado e, assim, iniciar algum outro fluxo.</p>
<p>Com isso, caso exista mais fluxos a serem executados ao enviar aquele evento, você precisará adicionar somente mais um handler para executar tal processamento.</p>

## Exemplo no código
### [Emissor](https://github.com/martineli17/nestjs-events/blob/master/src/domain/services/user.service.ts)
Para emitir um evento, é necessário utilizar o 'EventEmitter2'. Esta classe contém, dentre outros, o método responsável por enviar um novo evento. Os parâmetros necessário é o nome do evento e o seu payload.

```js
import { EventEmitter2 } from '@nestjs/event-emitter';
await this._eventEmitter.emitAsync("UserAddedEvent", { user: entity } as UserAddedEvent);
```

### [Handler | Listener](https://github.com/martineli17/nestjs-events/blob/master/src/domain/events/user/handlers/user-added.handler.ts)
Para registrar um handler/listener para algum evento, é necessário utilizar o decorator '@OnEvent', informando obrigatoriamente o nome do evento desejado.
Além disso, é necessário registrar a classe do handler na [Dependency Injection](https://github.com/martineli17/nestjs-events/blob/master/src/infra/ioc/modules/user.module.ts), para que ele seja registrado e consiga ser processado quando a classe emissora enviar o evento.
Observação: caso você registre mais de um handler para o evento, todos serão processados.

```js
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
```

## Mais informações
Para mais informações, possibilidades de uso e especificações técnicas, acesse a página do [NestJS](https://docs.nestjs.com/techniques/events)
