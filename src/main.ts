import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {UsePipes} from "@nestjs/common";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  // builder - паттерн, который позвоялт постепенно задавать поля объекта
  const config = new DocumentBuilder()
      .setTitle('BLOG')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('Yunus Gadamurov')
      .build()
  // объект документации
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  // использовать guard глобально, чтобы ограничить доступ ВСЕМ неавторизованным
  // app.useGlobalGuards(JwtAuthGuard)

  // pipe можно указывать глобально
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}
start();
