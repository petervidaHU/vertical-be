import { Controller, Get, Param } from '@nestjs/common';
import { StoryService } from './story.service';
import iStory from './story.interface';
import ErrorI from 'src/error.interface';

@Controller('story')
export class StoryController {
  constructor(private epicService: StoryService) {}

  @Get('/:id')
  async getOneStory(@Param('id') id: string): Promise<iStory | ErrorI> {
    try {
      const storyData = await this.epicService.getEpicById(id);
      return storyData;
    } catch (error) {
      return {
        message: `a rohadt életbe már megint mi van ${id}`,
      };
    }
  }
}
