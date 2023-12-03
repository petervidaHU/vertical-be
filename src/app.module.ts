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

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'petervida',
      password: 'iddqd378',
      database: 'vertical1',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, StoryController, AuthController, UserController],
  providers: [AppService, StoryService, AuthService, UserService, JwtStrategy],
})
export class AppModule {}
