import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    // origin: ['http://localhost:3001', 'https://vertical-fe-beryl.vercel.app/'],
    origin: function (origin, callback) {
      /*   const allowedOrigins = [
        'http://localhost:3001',
        'https://vertical-fe-beryl.vercel.app/',
      ]; */
      console.log('origin:::::::::::::::::::::::::', origin);
      if (/* allowedOrigins.includes(origin)*/ true) {
        callback(null, true);
      } else {
        console.log('allowedorigin not matchs', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}
bootstrap();
