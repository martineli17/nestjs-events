import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './application/middlewares/log.middleware';
import { MapperModule } from './infra/ioc/modules/mapper.module';
import { UserModule } from './infra/ioc/modules/user.module';

@Module({
  imports: [UserModule, MapperModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
