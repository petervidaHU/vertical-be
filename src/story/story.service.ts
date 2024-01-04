import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import iStory from './story.interface';
import { CreateStoryDto } from './dto/create-story.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryEntity } from './story.entity';
import { metaForList } from './story.controller';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyRepository: Repository<StoryEntity>,
  ) {}

  async findStories(
    page: number,
    limit: number,
    sort: string,
    order: 'ASC' | 'DESC',
  ): Promise<{ meta: metaForList; list: Array<iStory> }> {
    const total = await this.storyRepository.count();
    const list = await this.storyRepository
      .createQueryBuilder('story')
      .orderBy(`story.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return { meta: { total }, list };
  }

  async findById(id: string): Promise<iStory> {
    return await this.storyRepository.findOne({ where: { id: id } });
  }

  async createStory(storyData: CreateStoryDto): Promise<StoryEntity> {
    const id = uuid();
    const newStory: StoryEntity = new StoryEntity();
    newStory.id = id;
    newStory.title = storyData.title;
    newStory.startPoint = storyData.startPoint;
    newStory.endPoint = storyData.endPoint;
    newStory.description = storyData.description;

    await this.storyRepository.save(newStory);
    return newStory;
  }

  async updateStory(
    id: string,
    updatedStory: Partial<Omit<StoryEntity, 'id'>>,
  ): Promise<StoryEntity> {
    const story = await this.storyRepository.findOne({ where: { id: id } });
    const updated = { ...story, ...updatedStory };

    await this.storyRepository.save(updated);
    return updated;
  }

  async deleteStory(id: string): Promise<void> {
    await this.storyRepository.delete(id);
  }

  async getUpcomingStories(position: number): Promise<StoryEntity[]> {
    return await this.storyRepository
      .createQueryBuilder('story')
      .where(`story.startPoint >= ${position - 1000} `)
      .orderBy('story.startPoint', 'ASC')
      .take(6)
      .getMany();
  }
}
