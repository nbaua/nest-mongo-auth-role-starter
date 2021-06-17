import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: true,
    }),
  );
  const port = 3333;
  await app.listen(port);
  Logger.log(`App started at port ${port}`, 'APP', true);
  Logger.log(`http://127.0.0.1:${port}`, 'APP', true);
}
bootstrap();
