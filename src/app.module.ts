import morgan from 'morgan';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryController } from './story/story.controller';
import { StoryService } from './story/story.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryEntity } from './story/story.entity';
import { UserEntity } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [StoryEntity, UserEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([StoryEntity, UserEntity]),
  ],
  controllers: [AppController, StoryController, AuthController, UserController],
  providers: [AppService, StoryService, AuthService, UserService, JwtStrategy],
})
export class AppModule {}
