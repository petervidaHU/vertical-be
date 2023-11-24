import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryController } from './story/story.controller';
import { StoryService } from './story/story.service';

@Module({
  imports: [],
  controllers: [AppController, StoryController],
  providers: [AppService, StoryService],
})
export class AppModule {}
