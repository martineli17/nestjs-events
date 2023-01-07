import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initialize as DataBaseInitialize } from "./infra/data/configuration/app-data-source";

async function bootstrap() {
  DataBaseInitialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(1234);
}
bootstrap();
