import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwaggerConf } from './swagger/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await setupSwaggerConf(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
