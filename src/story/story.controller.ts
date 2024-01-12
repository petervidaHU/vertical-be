import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StoriesResponse, StoryService } from './story.service';
import { iStory, iTimeline, typeOfStory } from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

export interface metaForList {
  total: number;
}

@Controller('story')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('type') type: typeOfStory,
  ): Promise<{ meta: metaForList; list: Array<iStory> }> {
    try {
      return this.storyService.findStories(page, limit, sort, order, type);
    } catch (error) {
      throw new NotFoundException('Error in get all story');
    }
  }

  @Get('/timeline')
  async findLast(): Promise<iTimeline> {
    try {
      return this.storyService.findLastStory();
    } catch (error) {
      throw new NotFoundException('Error in get last story');
    }
  }

  @Get('/:id')
  async getStoryById(@Param('id') id: string): Promise<iStory> {
    try {
      return await this.storyService.findById(id);
    } catch (error) {
      throw new NotFoundException(`Error with found story with id: ${id}`);
    }
  }

  @Get('/pre/:position')
  async prefetch(
    @Param('position') position: number,
  ): Promise<StoriesResponse> {
    try {
      return await this.storyService.getUpcomingStories(position);
    } catch (error) {
      throw new NotFoundException(
        `Error in found stories with pos: ${position}`,
      );
    }
  }

  @Post()
  async createStory(@Body() newStory: CreateStoryDto): Promise<iStory> {
    console.log('new story:', newStory);
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
