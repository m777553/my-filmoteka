import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // ← все эндпоинты начинаются с /api
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля которых нет в DTO
      forbidNonWhitelisted: true, // Ругается на лишние поля
      transform: true, // Автоматически преобразует типы
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
