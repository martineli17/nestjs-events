import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerMiddleware } from './application/middlewares/log.middleware';
import { MapperModule } from './infra/ioc/modules/mapper.module';
import { UserModule } from './infra/ioc/modules/user.module';

@Module({
  imports: [UserModule, MapperModule, EventEmitterModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
