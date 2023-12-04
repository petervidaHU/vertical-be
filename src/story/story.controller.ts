import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoryService } from './story.service';
import iStory from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller('story')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @Get('/:id')
  async getStoryById(@Param('id') id: string): Promise<iStory> {
    try {
      return await this.storyService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Story not found with id ${id}`);
    }
  }

  @Get('/pre/:position')
  async prefetch(@Param('position') position: number): Promise<Array<iStory>> {
    try {
      return await this.storyService.getUpcomingStories(position);
    } catch (error) {
      throw new NotFoundException(`Story not found with pos ${position}`);
    }
  }

  @Post()
  async createStory(@Body() newStory: CreateStoryDto): Promise<iStory> {
    console.log('news:', newStory);
    return await this.storyService.createStory(newStory);
  }

  @Put('/:id')
  async updateStory(
    @Param('id') id: string,
    @Body() updatedStory: UpdateStoryDto,
  ): Promise<iStory> {
    try {
      return await this.storyService.updateStory(id, updatedStory);
    } catch (error) {
      throw new NotFoundException(`Story not found with id ${id}`);
    }
  }

  @Delete('/:id')
  async deleteStory(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.storyService.deleteStory(id);
      return { message: `Story with id ${id} deleted.` };
    } catch (error) {
      throw new NotFoundException(`Story not found with id ${id}`);
    }
  }
}
